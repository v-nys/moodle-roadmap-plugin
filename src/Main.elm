module Main exposing (main)

import Browser
import Browser.Dom
import Browser.Events
import Color
import Dagre.Attributes as DA
import Dict
import Graph as G
import Html
import Html.Attributes
import Html.Events
import Json.Decode
import Json.Decode.Pipeline exposing (required)
import List.Extra
import List.Nonempty exposing (ListNonempty)
import MyDagre
import MyList
import Render as R
import Render.StandardDrawers as RSD
import Render.StandardDrawers.Attributes as RSDA
import Render.StandardDrawers.Types as RSDT
import String.Extra
import Task
import TypedSvg as TS
import TypedSvg.Attributes as TSA
import TypedSvg.Core as TSC
import TypedSvg.Types as TST
import Yaml.Decode as YDecode
import YamlHelp
import Zoom exposing (OnZoom(..), Zoom)


type Model
    = DecodingError
    | Valid ValidModel


type alias ValidModel =
    { clusters : ListNonempty { name : String, graph : Graph, roots : List GraphNode }
    , completed : List GraphNodeId
    , dependencies : List Dependency
    , zoom : Maybe Zoom
    }


rotateLeft : ListNonempty a -> Int -> ListNonempty a
rotateLeft z n =
    if n == 0 then
        z

    else
        case z of
            ( _, [] ) ->
                z

            ( h1, h2 :: t ) ->
                ( h2, t ++ [ h1 ] )


type alias Dependency =
    { slug : String, cluster : String, any : List GraphNodeId, all : List GraphNodeId }


type alias Graph =
    G.Graph GraphNode EdgeType


type alias GraphNode =
    { id : String, namespace : String, title : String, course_sections_id : Int }


type alias GraphNodeId =
    { id : String, namespace : String }


type EdgeType
    = All
    | AtLeastOne


type Edge
    = Edge { start : GraphNodeId, end : GraphNodeId } EdgeType


type
    Msg
    -- TODO: remove SelectEdge, SelectNode? not using them
    = SelectEdge ( Int, Int )
    | SelectNode Int
    | RotateLeft Int
    | ZoomMsg OnZoom
    | WindowResizeOccurred
    | GotSvgElement (Result Browser.Dom.Error Browser.Dom.Element)


isSameGraphNode : { a | id : String, namespace : String } -> { b | id : String, namespace : String } -> Bool
isSameGraphNode graphNodeId graphNode =
    graphNode.id == graphNodeId.id && graphNode.namespace == graphNodeId.namespace


init : Json.Decode.Value -> ( Model, Cmd Msg )
init json =
    let
        flags =
            Debug.log "the flags: " (Json.Decode.decodeValue flagsDecoder json)
    in
    case flags of
        Ok { nodes, clusters, completed, dependencies } ->
            let
                nodeListDecoder : String -> YDecode.Decoder (List GraphNode)
                nodeListDecoder clusterName =
                    YDecode.field "nodes" <|
                        YDecode.list <|
                            YDecode.map3
                                (\id namespace title ->
                                    GraphNode
                                        id
                                        namespace
                                        title
                                        (Maybe.withDefault
                                            0
                                            (Maybe.map
                                                .course_sections_id
                                                (List.Extra.find (\node -> node.slug == id && node.cluster_name == namespace) nodes)
                                            )
                                        )
                                )
                                (YDecode.field "id" YDecode.string)
                                (YDecode.succeed clusterName)
                                (YDecode.field "title" YDecode.string)

                clusterGraphNodesResults : List (Result YDecode.Error (List GraphNode))
                clusterGraphNodesResults =
                    List.map
                        (\{ cluster, yaml } -> YDecode.fromString (nodeListDecoder cluster) yaml)
                        clusters

                allGraphNodesResult : Result YDecode.Error (List GraphNode)
                allGraphNodesResult =
                    List.foldr
                        (\separateResult acc -> Result.map2 (++) separateResult acc)
                        (Ok [])
                        clusterGraphNodesResults

                separateClusterResults : List (Result YDecode.Error { name : String, graph : Graph, roots : List GraphNode })
                separateClusterResults =
                    List.map
                        (\{ cluster, yaml } ->
                            Result.andThen
                                (\allGraphNodes ->
                                    YDecode.fromString (clusterDecoder cluster allGraphNodes) yaml
                                )
                                allGraphNodesResult
                        )
                        clusters

                combinedResult : Result YDecode.Error (List { name : String, graph : Graph, roots : List GraphNode })
                combinedResult =
                    List.foldr (\separateResult acc -> Result.map2 (::) separateResult acc) (Ok []) separateClusterResults

                modelDataResult =
                    case combinedResult of
                        Ok (head :: tail) ->
                            Ok <| List.Nonempty.fromPair head tail

                        Ok [] ->
                            Err <| YDecode.Parsing "List of clusters cannot be empty."

                        Err e ->
                            Err e
            in
            case modelDataResult of
                Ok lst ->
                    ( Valid { clusters = lst, completed = completed, dependencies = dependencies, zoom = Nothing }, Task.attempt GotSvgElement (Browser.Dom.getElement "roadmapPluginDrawing") )

                Err _ ->
                    ( DecodingError
                    , Cmd.none
                    )

        Err _ ->
            ( DecodingError, Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case model of
        DecodingError ->
            ( model, Cmd.none )

        Valid ({ clusters, completed, dependencies, zoom } as oldModel) ->
            case msg of
                SelectNode _ ->
                    ( model, Cmd.none )

                SelectEdge ( _, _ ) ->
                    ( model, Cmd.none )

                RotateLeft n ->
                    ( Valid { clusters = rotateLeft clusters n, completed = completed, dependencies = dependencies, zoom = zoom }, Cmd.none )

                GotSvgElement (Ok elem) ->
                    ( Valid { oldModel | zoom = Just <| Zoom.init { width = elem.element.width, height = elem.element.height } }, Cmd.none )

                GotSvgElement (Err _) ->
                    ( model, Cmd.none )

                WindowResizeOccurred ->
                    ( model, Task.attempt GotSvgElement (Browser.Dom.getElement "roadmapPluginDrawing") )

                ZoomMsg zoomMsg ->
                    ( Valid { oldModel | zoom = Maybe.map (Zoom.update zoomMsg) oldModel.zoom }, Cmd.none )


overlay : (Float -> Float -> a -> Maybe (TSC.Svg Msg)) -> RSDA.Attribute { c | overlay : Float -> Float -> a -> Maybe (TSC.Svg Msg) }
overlay f =
    \ndc -> { ndc | overlay = f }


viewGraph : Graph -> List GraphNode -> List GraphNodeId -> List Dependency -> List (Html.Attribute Msg) -> Html.Html Msg
viewGraph g roots completed dependencies extraAttributes =
    let
        widthDict =
            Dict.fromList <| List.map (\node -> ( node.id, String.length node.label.title |> toFloat >> (*) 10 )) (G.nodes g)
    in
    MyDagre.draw
        [ DA.rankDir DA.LR
        , DA.widthDict widthDict
        ]
        [ R.id "roadmapPluginDrawing"
        , R.nodeDrawer
            (MyDagre.svgDrawNode
                [ RSDA.label (\node -> node.label.title)
                , RSDA.title (\node -> node.label.id) -- may want to prefix with namespace
                , RSDA.shape (\_ -> RSDT.RoundedBox 5)
                , RSDA.fill
                    (\node ->
                        let
                            dependency =
                                List.Extra.find (\d -> d.slug == node.label.id && d.cluster == node.label.namespace) dependencies

                            dependenciesMet =
                                case dependency of
                                    Just { all, any } ->
                                        List.all (\predecessor -> List.any (isSameGraphNode predecessor) completed) all
                                            && List.any (\predecessor -> List.any (isSameGraphNode predecessor) completed) any

                                    Nothing ->
                                        False

                            unlocked =
                                List.any (isSameGraphNode node.label) roots || dependenciesMet
                        in
                        if List.any (isSameGraphNode node.label) completed then
                            Color.lightGreen

                        else if unlocked then
                            Color.white

                        else
                            Color.darkGray
                    )
                , overlay
                    (\posX posY node ->
                        let
                            dependency =
                                List.Extra.find (\d -> d.slug == node.label.id && d.cluster == node.label.namespace) dependencies

                            dependenciesMet =
                                case dependency of
                                    Just { all, any } ->
                                        List.all (\predecessor -> List.any (isSameGraphNode predecessor) completed) all
                                            && List.any (\predecessor -> List.any (isSameGraphNode predecessor) completed) any

                                    Nothing ->
                                        False

                            unlocked =
                                List.any (isSameGraphNode node.label) roots || dependenciesMet
                        in
                        if List.any (isSameGraphNode node.label) completed then
                            Just
                                (TS.circle
                                    [ TSA.r (TST.px 5)
                                    , TSA.cx (TST.px posX)
                                    , TSA.cy (TST.px posY)
                                    , TSA.fill (TST.Paint Color.green)
                                    ]
                                    []
                                )

                        else if unlocked then
                            Just
                                (TS.circle
                                    [ TSA.r (TST.px 5)
                                    , TSA.cx (TST.px posX)
                                    , TSA.cy (TST.px posY)
                                    , TSA.fill (TST.Paint Color.orange)
                                    ]
                                    []
                                )

                        else
                            Just
                                (TS.circle
                                    [ TSA.r (TST.px 5)
                                    , TSA.cx (TST.px posX)
                                    , TSA.cy (TST.px posY)
                                    , TSA.fill (TST.Paint Color.red)
                                    ]
                                    []
                                )
                    )
                , MyDagre.wrapper
                    (\node children ->
                        TS.a
                            [ TSA.href <| "#section-" ++ (node.label.course_sections_id |> String.fromInt) ]
                            children
                    )
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
        Valid { clusters, completed, dependencies, zoom } ->
            let
                ( { graph, roots }, _ ) =
                    clusters

                svgElement =
                    viewGraph
                        graph
                        roots
                        completed
                        dependencies
                        (Maybe.withDefault
                            [ Html.Attributes.id "roadmapPluginDrawing" ]
                            (Maybe.map
                                (\existingZoom ->
                                    Html.Attributes.id "roadmapPluginDrawing" :: Zoom.transform existingZoom :: Zoom.events existingZoom ZoomMsg
                                )
                                zoom
                            )
                        )

                buttonList =
                    List.Nonempty.indexedMap
                        (\idx elem -> { cluster = elem.name, button = Html.button [ Html.Events.onClick (RotateLeft idx) ] [ Html.text elem.name ] })
                        clusters
            in
            Html.div
                []
                [ Html.div
                    []
                    (buttonList |> List.Nonempty.toList |> List.sortBy .cluster |> List.map .button)
                , Html.div [ Html.Attributes.style "overflow" "hidden" ] [ svgElement ]
                ]

        DecodingError ->
            Html.div
                []
                [ Html.text "Decoding error occurred!" ]


subscriptions : Model -> Sub Msg
subscriptions model =
    case model of
        DecodingError ->
            Sub.none

        Valid { zoom } ->
            case zoom of
                Nothing ->
                    Browser.Events.onResize (\_ _ -> WindowResizeOccurred)

                Just actualZoom ->
                    Sub.batch [ Browser.Events.onResize (\_ _ -> WindowResizeOccurred), Zoom.subscriptions actualZoom ZoomMsg ]


completedNodeDecoder : Json.Decode.Decoder GraphNodeId
completedNodeDecoder =
    Json.Decode.succeed GraphNodeId
        |> required "slug" Json.Decode.string
        |> required "cluster_name" Json.Decode.string


dependencyDecoder : Json.Decode.Decoder Dependency
dependencyDecoder =
    Json.Decode.succeed Dependency
        |> required "slug" Json.Decode.string
        |> required "cluster" Json.Decode.string
        |> required "any" (Json.Decode.list completedNodeDecoder)
        |> required "all" (Json.Decode.list completedNodeDecoder)


type alias NamedYaml =
    { id : String, cluster : String, yaml : String }


clusterWithYamlDecoder : Json.Decode.Decoder NamedYaml
clusterWithYamlDecoder =
    Json.Decode.succeed NamedYaml
        |> required "id" Json.Decode.string
        |> required "cluster" Json.Decode.string
        |> required "yaml" Json.Decode.string


type alias NodeRecord =
    { cluster_name : String, slug : String, course_sections_id : Int }


nodeRecordDecoder : Json.Decode.Decoder NodeRecord
nodeRecordDecoder =
    Json.Decode.succeed NodeRecord
        |> required "cluster_name" Json.Decode.string
        |> required "slug" Json.Decode.string
        |> required "course_sections_id" Json.Decode.int


type alias Flags =
    { nodes : List NodeRecord, clusters : List NamedYaml, completed : List GraphNodeId, dependencies : List Dependency }


flagsDecoder : Json.Decode.Decoder Flags
flagsDecoder =
    Json.Decode.succeed Flags
        |> required "nodes" (Json.Decode.list nodeRecordDecoder)
        |> required "clusters" (Json.Decode.list clusterWithYamlDecoder)
        |> required "completed" (Json.Decode.list completedNodeDecoder)
        |> required "dependencies" (Json.Decode.list dependencyDecoder)


main : Program Json.Decode.Value Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


clusterDecoder : String -> List GraphNode -> YDecode.Decoder { name : String, graph : Graph, roots : List GraphNode }
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
            { name = clusterName
            , graph =
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
