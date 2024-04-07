module YamlHelp exposing (..)

import Yaml.Decode as YDecode


andThen2 : (a -> b -> YDecode.Decoder value) -> YDecode.Decoder a -> YDecode.Decoder b -> YDecode.Decoder value
andThen2 next aDecoder bDecoder =
    YDecode.andThen (\b -> YDecode.andThen (\a -> next a b) aDecoder) bDecoder


tryCons : YDecode.Decoder value -> List value -> YDecode.Decoder (List value)
tryCons wv l =
    YDecode.map (\v -> v :: l) wv


tryFoldl : (a -> b -> YDecode.Decoder b) -> b -> List a -> YDecode.Decoder b
tryFoldl proc init lst =
    List.foldl
        (\e -> YDecode.andThen (proc e))
        (YDecode.succeed init)
        lst