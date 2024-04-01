module Main exposing (main)

import Browser
import Color
import Dagre.Attributes as DA
import Dict
import Graph as G
import Html
import Html.Events
import MyDagre
import MyList
import Render as R
import Render.StandardDrawers as RSD
import Render.StandardDrawers.Attributes as RSDA
import Render.StandardDrawers.Types as RSDT
import TypedSvg as TS
import TypedSvg.Attributes as TSA
import Yaml.Decode as YDecode
import List.Extra
import YamlHelp
import String.Extra
import List.Nonempty exposing (ListNonempty)

type Model
    = DecodingError
    | ValidModel ValidModel


rotateLeft : ListNonempty a -> Int -> ListNonempty a
rotateLeft z n =
    if n == 0
    then z
    else case z of
        (h, []) -> z
        (h1, (h2::t)) -> (h2, (t ++ [h1]))

type alias ValidModel = ListNonempty { name: String, graph : Graph, roots: List GraphNode }


type alias Graph =
    G.Graph GraphNode EdgeType


type alias GraphNode =
    { id : String, namespace : String, title : String }

type alias GraphNodeId =
    { id : String, namespace : String }


type EdgeType
    = All
    | AtLeastOne

type Edge
    = Edge { start : GraphNodeId, end : GraphNodeId } EdgeType



type Msg
    = SelectEdge ( Int, Int )
    | SelectNode Int
    | RotateLeft Int


isSameGraphNode : { a | id : String, namespace : String } -> { b | id : String, namespace : String } -> Bool
isSameGraphNode graphNodeId graphNode =
    graphNode.id == graphNodeId.id && graphNode.namespace == graphNodeId.namespace



-- TODO: change flags to Json.Decode.Value and decode manually for more control later


init : List { cluster : String, yaml : String } -> ( Model, Cmd msg )
init flags =
    let
        nodeListDecoder : String -> YDecode.Decoder (List GraphNode)
        nodeListDecoder clusterName =
            YDecode.field "nodes" <|
                YDecode.list <|
                    YDecode.map3 GraphNode
                        (YDecode.field "id" YDecode.string)
                        (YDecode.succeed clusterName)
                        (YDecode.field "title" YDecode.string)

        clusterGraphNodesResults : List (Result YDecode.Error (List GraphNode))
        clusterGraphNodesResults = List.map (\{cluster, yaml} -> YDecode.fromString (nodeListDecoder cluster) yaml) flags

        allGraphNodesResult : Result YDecode.Error (List GraphNode)
        allGraphNodesResult = List.foldr (\separateResult acc -> Result.map2 (++) separateResult acc) (Ok []) clusterGraphNodesResults

        separateClusterResults : List (Result YDecode.Error { name: String, graph : Graph, roots: List GraphNode })
        separateClusterResults =
          List.map
          (\{cluster, yaml} ->
            Result.andThen
            (\allGraphNodes -> YDecode.fromString (clusterDecoder cluster allGraphNodes) yaml)
            allGraphNodesResult)
          flags

        combinedResult : Result YDecode.Error (List { name: String, graph : Graph, roots: List GraphNode })
        combinedResult = List.foldr (\separateResult acc -> Result.map2 (::) separateResult acc) (Ok []) separateClusterResults

        modelDataResult = case combinedResult of
            Ok (head::tail) -> Ok <| List.Nonempty.fromPair head tail
            Ok [] -> Err <| YDecode.Parsing "List of clusters cannot be empty."
            Err e -> Err e
    in
        case modelDataResult of
            Ok lst -> (ValidModel lst, Cmd.none)
            Err e -> (Debug.log (Debug.toString e) (DecodingError, Cmd.none))

update : Msg -> Model -> ( Model, Cmd msg )
update msg model =
    case msg of
        SelectNode v ->
            ( model, Cmd.none )

        SelectEdge ( from, to ) ->
            ( model, Cmd.none )

        RotateLeft n ->
            case model of
                ValidModel modelData -> ( ValidModel (rotateLeft modelData n), Cmd.none )
                DecodingError -> ( model, Cmd.none )


viewGraph : Graph -> List GraphNode -> List (Html.Attribute Msg) -> Html.Html Msg
viewGraph g roots extraAttributes =
    let
        widthDict =
            Dict.fromList <| List.map (\node -> ( node.id, String.length node.label.title |> toFloat >> (*) 10 )) (G.nodes g)
    in
    MyDagre.draw
        [ DA.rankDir DA.LR
        , DA.widthDict widthDict
        ]
        [ R.nodeDrawer
            (MyDagre.svgDrawNode
                [ RSDA.label (\node -> node.label.title)
                , RSDA.title (\node -> node.label.id) -- may want to prefix with namespace
                , RSDA.shape (\_ -> RSDT.RoundedBox 5)
                , RSDA.fill
                    (\node ->
                        if List.any (isSameGraphNode node.label) roots then
                            Color.lightGreen

                        else
                            Color.lightBlue
                    )
                , MyDagre.wrapper (\node children -> TS.a [ TSA.href <| "/clusters/" ++ node.label.namespace ++ "/" ++ node.label.id ] children)
                ]
            )
        , R.edgeDrawer
            (RSD.svgDrawEdge
                [ RSDA.arrowHead RSDT.Vee
                , RSDA.strokeWidth (\_ -> 4)

                -- https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray
                , RSDA.strokeDashArray
                    (\info ->
                        case info.label of
                            AtLeastOne ->
                                "1"

                            All ->
                                "0"
                    )
                ]
            )
        , R.style "max-height: 100vh"
        ]
        g
        extraAttributes


view : Model -> Html.Html Msg
view model =
    case model of
        ValidModel (({ name, graph, roots },_) as modelData) ->
            let
                buttonList =
                  List.Nonempty.indexedMap
                    (\idx elem -> { cluster = elem.name, button = Html.button [Html.Events.onClick (RotateLeft idx)] [Html.text elem.name] })
                    modelData
            in
                Html.div
                    []
                    [ Html.div
                      []
                      (buttonList |> List.Nonempty.toList |> List.sortBy .cluster |> List.map .button)
                    , Html.div [] [viewGraph graph roots []]]
        DecodingError -> 
            Html.div
                []
                [ Html.text "Decoding error occurred!" ]


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none


main : Program (List { cluster : String, yaml : String }) Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }

clusterDecoder : String -> List GraphNode -> YDecode.Decoder { name: String, graph : Graph, roots : List GraphNode }
clusterDecoder clusterName allGraphNodes =
    let
        rootIdsDecoder =
            YDecode.maybe <| YDecode.field "roots" <| YDecode.list (YDecode.string |> YDecode.map (\id -> { id = id, namespace = clusterName }))

        rootsDecoder =
            YDecode.andThen
                (Maybe.withDefault []
                    >> List.map (\rootId -> List.Extra.find (isSameGraphNode rootId) allGraphNodes)
                    >> MyList.collect
                    >> YDecode.fromMaybe "Not all root nodes are correctly specified as graph nodes"
                )
                rootIdsDecoder

        allTypeEdgesDecoder =
            YDecode.field "all_type_edges" (YDecode.list (edgeDecoder clusterName All))

        anyTypeEdgesDecoder =
            YDecode.maybe <| YDecode.field "any_type_edges" (YDecode.list (edgeDecoder clusterName AtLeastOne))

        graphNodeIdsDecoder =
            YDecode.map3 (\n1s n2s n3s -> n1s ++ n2s ++ n3s |> List.Extra.unique)
                (YDecode.map (List.concatMap (\(Edge { start, end } _) -> [ start, end ])) allTypeEdgesDecoder)
                (YDecode.map (Maybe.withDefault [] >> List.concatMap (\(Edge { start, end } _) -> [ start, end ])) anyTypeEdgesDecoder)
                (YDecode.map (Maybe.withDefault []) rootIdsDecoder)

        errorMessage graphNodeId =
            "Could not find matching graph node for graph node ID " ++ Debug.toString graphNodeId ++ " in " ++ Debug.toString allGraphNodes ++ ". This is a programming error."

        allUtilizedGraphNodesDecoder =
            YDecode.andThen
                (\graphNodeIds ->
                    YamlHelp.tryFoldl
                        (\graphNodeId ->
                            YamlHelp.tryCons
                                (List.Extra.find
                                    (isSameGraphNode graphNodeId)
                                    allGraphNodes
                                    |> YDecode.fromMaybe (errorMessage graphNodeId)
                                )
                        )
                        []
                        graphNodeIds
                )
                graphNodeIdsDecoder

        edgesToIndexBasedRepresentation =
            \edges allUtilizedGraphNodes ->
                YamlHelp.tryFoldl
                    (\(Edge { start, end } edgeType) ->
                        let
                            wrappedIndex graphNodeId =
                                List.Extra.findIndex
                                    (\graphNode -> graphNode.id == graphNodeId.id)
                                    allUtilizedGraphNodes
                                    |> YDecode.fromMaybe ("Could not find index for " ++ Debug.toString graphNodeId)
                        in
                        YamlHelp.tryCons
                            (YDecode.map2
                                (\startIndex endIndex -> { from = startIndex, to = endIndex, label = edgeType })
                                (wrappedIndex start)
                                (wrappedIndex end)
                            )
                    )
                    []
                    edges

        allTypeIndexifiedEdgesDecoder =
            YamlHelp.andThen2
                edgesToIndexBasedRepresentation
                allTypeEdgesDecoder
                allUtilizedGraphNodesDecoder

        anyTypeIndexifiedEdgesDecoder =
            YamlHelp.andThen2
                edgesToIndexBasedRepresentation
                (YDecode.map (Maybe.withDefault []) anyTypeEdgesDecoder)
                allUtilizedGraphNodesDecoder
    in
    YDecode.map4
        (\graphNodes allTypeEdges anyTypeEdges roots ->
            {
              name = clusterName,
              graph =
                G.fromNodesAndEdges
                    (List.indexedMap (\index contents -> { id = index, label = contents }) graphNodes)
                    (allTypeEdges ++ anyTypeEdges)
            , roots = roots
            }
        )
        allUtilizedGraphNodesDecoder
        allTypeIndexifiedEdgesDecoder
        anyTypeIndexifiedEdgesDecoder
        rootsDecoder


edgeDecoder : String -> EdgeType -> YDecode.Decoder Edge
edgeDecoder clusterName edgeType =
    let
        idToGraphNodeId id =
            let
                postfix =
                    String.Extra.rightOf "__" id

                prefix =
                    String.Extra.leftOf "__" id
            in
            { id =
                if String.isEmpty postfix then
                    id

                else
                    postfix
            , namespace =
                if String.isEmpty prefix then
                    clusterName

                else
                    prefix
            }
    in
    YDecode.map2
        (\start end -> Edge { start = start, end = end } edgeType)
        (YDecode.field "start_id" YDecode.string |> YDecode.map idToGraphNodeId)
        (YDecode.field "end_id" YDecode.string |> YDecode.map idToGraphNodeId)


