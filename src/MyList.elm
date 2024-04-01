module MyList exposing (..)

-- TODO: requires tests
collect : List (Maybe a) -> Maybe (List a)
collect maybeElems =
    List.foldl
        (Maybe.map2 (::))
        (Just [])
        maybeElems
        |> Maybe.map List.reverse