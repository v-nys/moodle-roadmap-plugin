module Main exposing (main)

import Browser
import Color
import Dagre.Attributes as DA
import Dict
import Graph as G
import Html
import MyDagre
import Render as R
import Render.StandardDrawers as RSD
import Render.StandardDrawers.Attributes as RSDA
import Render.StandardDrawers.Types as RSDT
import TypedSvg as TS
import TypedSvg.Attributes as TSA


type alias Model =
    String


type alias Graph =
    G.Graph GraphNode EdgeType


type alias GraphNode =
    { id : String, namespace : String, title : String }


type EdgeType
    = All
    | AtLeastOne



-- TODO: replace with deserialized (from YAML) graph if this works
exampleGraph : Graph
exampleGraph =
    let
        nodes =
            [ G.Node 1 { id = "node1", namespace = "cluster1", title = "Node 1" }
            , G.Node 2 { id = "node2", namespace = "cluster2", title = "Node 2" }
            , G.Node 3 { id = "node3", namespace = "cluster3", title = "Node 3" }
            ]

        edges =
            [ G.Edge 1 2 All
            , G.Edge 2 3 All
            ]
    in
    G.fromNodesAndEdges nodes edges


exampleGraphRoots : List GraphNode
exampleGraphRoots =
    [ { id = "node1", namespace = "cluster1", title = "Node 1" } ]


type Msg
    = SelectEdge ( Int, Int )
    | SelectNode Int


isSameGraphNode : { a | id : String, namespace : String } -> { b | id : String, namespace : String } -> Bool
isSameGraphNode graphNodeId graphNode =
    graphNode.id == graphNodeId.id && graphNode.namespace == graphNodeId.namespace



-- TODO: change to Json.Decode.Value and decode manually for more control later


init : List { cluster : String, yaml : String } -> ( Model, Cmd msg )
init flags =
    Debug.log (Debug.toString flags)
        ( "No element selected!!, click on an edge/node to select it", Cmd.none )


update : Msg -> Model -> ( Model, Cmd msg )
update msg _ =
    case msg of
        SelectNode v ->
            ( "You selected node " ++ String.fromInt v, Cmd.none )

        SelectEdge ( from, to ) ->
            ( "You selected edge from " ++ String.fromInt from ++ " to " ++ String.fromInt to, Cmd.none )


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
    Html.div
        []
        [ viewGraph exampleGraph exampleGraphRoots []
        , Html.h1 [] [ Html.text model ]
        ]


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
