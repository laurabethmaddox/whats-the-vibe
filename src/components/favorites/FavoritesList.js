import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Favorites.css"

export const FavoritesList = () => {
    const [favorites, setFavorites] = useState([])
    const history = useHistory()

    const getState = () => {
        fetch(`http://localhost:8088/favorites?_expand=songList&usersId=${localStorage.getItem("vibes_user")}`)
            .then(res => res.json())
            .then(
                (data) => {
                    setFavorites(data)
                }
            )
    }

    useEffect(
        () => {
            getState()
        },
        []
    )

    const deleteFavorite = (id) => {
        fetch(`http://localhost:8088/favorites/${id}`, {
            method: "DELETE"
        })
            .then((data) => {
                getState(data)
            })
    }

    return (
        <>
            <h1 className="favoriteHeader">Favorites</h1>
            <div className="addButton">
                <button onClick={() => history.push("/favorites/create")} className="addButton">Add a song</button>
            </div>
            {
                favorites.map(
                    (favorite) => {
                        return <div key={`favorite--${favorite.id}`} className="favorites">
                            <p>
                                {favorite.songList.artist} <br />
                                {favorite.songList.title} <br />
                                <button onClick={() => {
                                    deleteFavorite(favorite.id)
                                }} className="favoriteButton">Delete</button>
                            </p>
                        </div>
                    }
                )
            }
        </>
    )   
}
