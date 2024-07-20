module MyDagre exposing (..)

import Color exposing (Color)
import Dagre as D
import Dagre.Attributes as DA
import Dict
import Graph as G exposing (Edge, Graph, Node)
import Html exposing (Html)
import Render.StandardDrawers as RSD
import Render.StandardDrawers.Attributes exposing (Attribute)
import Render.StandardDrawers.Types exposing (Shape(..))
import Render.Types exposing (..)
import TypedSvg as TS exposing (g)
import TypedSvg.Attributes as TA
import TypedSvg.Core as TC exposing (Svg)
import TypedSvg.Events as TE
import TypedSvg.Types as TT


type alias DrawConfig n e msg =
    { edgeDrawer : EdgeDrawer e msg
    , nodeDrawer : NodeDrawer n msg
    , style : String
    , id : String
    }


defDrawConfig : DrawConfig n e msg
defDrawConfig =
    { edgeDrawer = RSD.svgDrawEdge []
    , nodeDrawer = RSD.svgDrawNode []
    , style = ""
    , id = "graph-0"
    }


nodeDrawing : Node n -> NodeDrawer n msg -> Dict.Dict G.NodeId ( Float, Float ) -> DA.Config -> TC.Svg msg
nodeDrawing node_ drawNode_ coordDict config =
    let
        pos =
            Maybe.withDefault ( -10, -10 ) (Dict.get node_.id coordDict)

        w =
            Maybe.withDefault config.width (Dict.get node_.id config.widthDict)

        h =
            Maybe.withDefault config.height (Dict.get node_.id config.heightDict)
    in
    drawNode_ (NodeAttributes node_ pos w h)


draw : List DA.Attribute -> List (Attribute (DrawConfig n e msg)) -> Graph n e -> List (Html.Attribute msg) -> Html msg
draw edits1 edits2 graph extraAttributes =
    let
        { width, height, coordDict, controlPtsDict } =
            D.runLayout edits1 graph

        dagreConfig =
            List.foldl (\f a -> f a) D.defaultConfig edits1

        drawConfig =
            List.foldl (\f a -> f a) defDrawConfig edits2

        edgesSvg =
            TS.g [ TA.class [ "links" ] ] <| List.map (\e -> edgeDrawing e drawConfig.edgeDrawer coordDict controlPtsDict dagreConfig) <| G.edges graph

        nodesSvg =
            TS.g [ TA.class [ "nodes" ] ] <| List.map (\n -> nodeDrawing n drawConfig.nodeDrawer coordDict dagreConfig) <| G.nodes graph
    in
    TS.svg
        (TA.viewBox 0 0 width height :: TA.style drawConfig.style :: extraAttributes)
        [ TS.g [ TA.id drawConfig.id ] [ edgesSvg, nodesSvg ]
        ]


edgeDrawing : Edge e -> EdgeDrawer e msg -> Dict.Dict G.NodeId ( Float, Float ) -> Dict.Dict ( G.NodeId, G.NodeId ) (List G.NodeId) -> DA.Config -> TC.Svg msg
edgeDrawing edge_ drawEdge_ coordDict controlPointsDict config =
    let
        getCoords =
            \p -> Maybe.withDefault ( -10, -10 ) (Dict.get p coordDict)

        sourcePos =
            getCoords edge_.from

        targetPos =
            getCoords edge_.to

        ctrlPts =
            Maybe.withDefault [] (Dict.get ( edge_.from, edge_.to ) controlPointsDict) |> List.map getCoords

        getWidth =
            \n ->
                Maybe.withDefault config.width (Dict.get n config.widthDict)

        getHeight =
            \n ->
                Maybe.withDefault config.height (Dict.get n config.heightDict)

        dimensions =
            \n -> ( getWidth n, getHeight n )
    in
    drawEdge_ (EdgeAttributes edge_ sourcePos targetPos ctrlPts (dimensions edge_.from) (dimensions edge_.to))


type alias NodeDrawerConfig n msg =
    { label : Node n -> String
    , shape : Node n -> Shape
    , fontSize : Float
    , onClick : Maybe (Node n -> msg)
    , strokeColor : Node n -> Color
    , strokeWidth : Node n -> Float
    , strokeDashArray : Node n -> String
    , style : Node n -> String
    , fill : Node n -> Color
    , title : Node n -> String
    , xLabels : List (NodeAttributes n -> Svg msg)
    , overlay : Node n -> Maybe (Svg msg)
    , wrapper : Maybe (Node n -> List (Svg msg) -> Svg msg)
    }


-- if I am not mistaken, this is a kind of default implementation
defNodeDrawerConfig : NodeDrawerConfig n msg
defNodeDrawerConfig =
    let
        f =
            \n -> String.fromInt n.id

        f_ =
            \_ -> ""
    in
    { label = f
    , shape = \_ -> Ellipse
    , onClick = Nothing
    , fontSize = 16
    , strokeColor = \_ -> Color.blue
    , strokeWidth = \_ -> 1
    , strokeDashArray = f_
    , style = f_
    , fill = \_ -> Color.rgb255 178 235 242
    , title = f
    , xLabels = []
    , overlay = \_ -> Nothing
    , wrapper = Nothing
    }

wrapper : (Node n -> List (Svg msg) -> Svg msg) -> Attribute { c | wrapper : Maybe (Node n -> List (Svg msg) -> Svg msg)}
wrapper f = \edc -> { edc | wrapper = Just f}


svgDrawNode : List (Attribute (NodeDrawerConfig n msg)) -> NodeDrawer n msg
svgDrawNode edits nodeAtrib =
    let
        node =
            nodeAtrib.node

        ( posX, posY ) =
            nodeAtrib.coord

        config =
            List.foldl (\f a -> f a) defNodeDrawerConfig edits

        lbl =
            config.label node

        nodeId =
            "node-" ++ String.fromInt node.id

        gAtrib =
            case config.onClick of
                Nothing ->
                    [ TA.id nodeId
                    , TA.class [ "node" ]
                    , TA.style <| config.style node
                    ]

                Just f ->
                    [ TA.id nodeId
                    , TA.class [ "node" ]
                    , TA.style <| config.style node
                    , TE.onClick (f node)
                    , TA.cursor TT.CursorPointer
                    ]

        shapeAtrib =
            { shape = config.shape
            , strokeColor = config.strokeColor
            , strokeWidth = config.strokeWidth
            , strokeDashArray = config.strokeDashArray
            , fill = config.fill
            }

        mainElement =
            g
                gAtrib
                [ TS.title [] [ TC.text <| config.title node ]
                , nodeShapeDrawer shapeAtrib nodeAtrib
                , centeredText lbl config.fontSize ( posX, posY )
                , xLabelsDrawer config.xLabels nodeAtrib
                ]
    in
    case config.wrapper of
        Nothing ->
            mainElement

        Just innerWrapper ->
            innerWrapper node [ mainElement ]


centeredText : String -> Float -> ( Float, Float ) -> Svg msg
centeredText str fontSize ( posX, posY ) =
    TS.text_
        [ TA.textAnchor TT.AnchorMiddle
        , TA.dominantBaseline TT.DominantBaselineCentral
        , TA.transform [ TT.Translate posX posY ]
        , TA.fontSize <| TT.Px fontSize
        ]
        [ TC.text str
        ]


xLabelsDrawer : List (NodeAttributes n -> Svg msg) -> NodeAttributes n -> Svg msg
xLabelsDrawer xLabelDrawers nodeAtrib =
    TS.g
        [ TA.class [ "xlabels" ] ]
        (List.map (\f -> f nodeAtrib) xLabelDrawers)


type alias ShapeAttributes n =
    { shape : Node n -> Shape
    , strokeColor : Node n -> Color.Color
    , strokeWidth : Node n -> Float
    , strokeDashArray : Node n -> String
    , fill : Node n -> Color.Color
    }


nodeShapeDrawer : ShapeAttributes n -> NodeAttributes n -> Svg msg
nodeShapeDrawer config nodeAtrib =
    let
        ( posX, posY ) =
            nodeAtrib.coord

        width =
            nodeAtrib.width

        height =
            nodeAtrib.height

        d =
            max width height
    in
    case config.shape nodeAtrib.node of
        Circle ->
            TS.circle
                [ TA.r <| TT.Px (d / 2)
                , TA.stroke <| TT.Paint <| config.strokeColor nodeAtrib.node
                , TA.strokeWidth <| TT.Px <| config.strokeWidth nodeAtrib.node
                , TA.strokeDasharray <| config.strokeDashArray nodeAtrib.node
                , TA.fill <| TT.Paint <| config.fill nodeAtrib.node
                , TA.cx <| TT.Px posX
                , TA.cy <| TT.Px posY
                ]
                []

        Ellipse ->
            TS.ellipse
                [ TA.rx <| TT.Px (width / 2)
                , TA.ry <| TT.Px (height / 2)
                , TA.stroke <| TT.Paint <| config.strokeColor nodeAtrib.node
                , TA.strokeWidth <| TT.Px <| config.strokeWidth nodeAtrib.node
                , TA.strokeDasharray <| config.strokeDashArray nodeAtrib.node
                , TA.fill <| TT.Paint <| config.fill nodeAtrib.node
                , TA.cx <| TT.Px posX
                , TA.cy <| TT.Px posY
                ]
                []

        Box ->
            TS.rect
                [ TA.width <| TT.Px width
                , TA.height <| TT.Px height
                , TA.stroke <| TT.Paint <| config.strokeColor nodeAtrib.node
                , TA.strokeWidth <| TT.Px <| config.strokeWidth nodeAtrib.node
                , TA.strokeDasharray <| config.strokeDashArray nodeAtrib.node
                , TA.fill <| TT.Paint <| config.fill nodeAtrib.node
                , TA.x <| TT.Px (posX - width / 2)
                , TA.y <| TT.Px (posY - height / 2)
                ]
                []

        RoundedBox r ->
            TS.rect
                [ TA.width <| TT.Px width
                , TA.height <| TT.Px height
                , TA.rx <| TT.Px r
                , TA.stroke <| TT.Paint <| config.strokeColor nodeAtrib.node
                , TA.strokeWidth <| TT.Px <| config.strokeWidth nodeAtrib.node
                , TA.strokeDasharray <| config.strokeDashArray nodeAtrib.node
                , TA.fill <| TT.Paint <| config.fill nodeAtrib.node
                , TA.x <| TT.Px (posX - width / 2)
                , TA.y <| TT.Px (posY - height / 2)
                ]
                []

        NoShape ->
            TS.g
                []
                []
