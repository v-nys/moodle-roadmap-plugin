module Main exposing (main)

import Browser
import Dagre.Attributes as DA
import Graph as G
import Html
import Render as R
import Render.StandardDrawers as RSD
import Render.StandardDrawers.Attributes as RSDA
import Render.StandardDrawers.Types as RSDT


type alias Model =
    String



-- TODO: will need to deserialize supplied graphs instead
-- can use flags for those
-- and deserializing should return a Result ZipList Graph


simpleGraph : G.Graph Int ()
simpleGraph =
    G.fromNodeLabelsAndEdgePairs
        [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
        [ ( 0, 1 )
        , ( 0, 2 )
        , ( 1, 3 )
        , ( 1, 4 )
        , ( 2, 5 )
        , ( 2, 6 )
        , ( 3, 7 )
        , ( 3, 8 )
        , ( 0, 7 )
        , ( 0, 5 )
        , ( 4, 0 )
        , ( 6, 0 )
        , ( 4, 8 )
        , ( 6, 8 )
        , ( 7, 8 )
        ]


type Msg
    = SelectEdge ( Int, Int )
    | SelectNode Int


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


viewGraph : G.Graph n e -> Html.Html Msg
viewGraph g =
    R.draw
        [ DA.rankDir DA.LR
        ]
        -- []
        [ R.nodeDrawer
            (RSD.svgDrawNode
                [ RSDA.onClick (\n -> SelectNode n.id)
                ]
            )
        , R.edgeDrawer
            (RSD.svgDrawEdge
                [ RSDA.arrowHead RSDT.Vee
                , RSDA.onClick (\e -> SelectEdge ( e.from, e.to ))
                , RSDA.strokeWidth (\_ -> 4)
                ]
            )
        , R.style "height: 80vh;"
        ]
        g


view : Model -> Html.Html Msg
view model =
    Html.div
        []
        [ viewGraph simpleGraph
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
