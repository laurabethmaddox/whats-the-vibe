import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Favorites.css"
import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";

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
                <button onClick={() => history.push("/favorites/create")} className="addButton">➕</button>
            </div>
            {
                favorites.map(
                    (favorite) => {
                        return <div key={`favorite--${favorite.id}`} className="favorites">
                            <p className="songList">
                                <img src={favorite.songList.img} /> <br />
                                {favorite.songList.artist} <br />
                                {favorite.songList.title} <br />
                                <a href={favorite.songList.songLink} target="_blank" className="spotify-link">
                                    <Icon icon="mdi:spotify" width="21" height="21"/>
                                </a> 
                                <IconButton onClick={() => {deleteFavorite(favorite.id) }} className="favoriteButton"> <DeleteOutlined /> </IconButton>
                            </p>
                        </div>
                    }
                )
            }
        </>
    )   
}
