import React from "react"
import { Route } from "react-router-dom"
import { FavoritesList } from "./favorites/FavoritesList"
import { HappySongsList } from "./happySongs/HappySongsList"
import { SadSongForm } from "./sadSongs/SadSongForm"
import { SadSongsList } from "./sadSongs/SadSongsList"

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/sadSongs">
                <SadSongsList />
            </Route>

            <Route exact path="/sadSongs/create">
                <SadSongForm />
            </Route>

            <Route exact path="/happySongs">
                <HappySongsList />
            </Route>

            <Route exact path="/favorites">
                <FavoritesList />
            </Route>            
        </>
    )
}