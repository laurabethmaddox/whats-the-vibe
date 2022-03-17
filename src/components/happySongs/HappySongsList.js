import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const HappySongsList = () => {
    const [songs, setSongs] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/songLists?_expand=emotion")
                .then(res => res.json())
                .then(
                    (songsArray) => {
                        setSongs(songsArray)
                    }
                )
        },
        []
    )

    const favoriteSongs = (evt) => {
        evt.preventDefault()

        const newFavorite = {
            songListId: parseInt(evt.target.value),
            usersId: parseInt(localStorage.getItem("vibes_user"))
        }

        const fetchFavorites = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFavorite)
        }

        return fetch("http://localhost:8088/favorites", fetchFavorites)
            .then(() => {
                history.push("/favorites")
            })
    }



    return (
        <>
            <h1 id="header">Happy</h1>
            {
                songs.map(
                    (happySong) => {
                        if (happySong.emotion.id === 2) {
                            return <div key={`happy--${happySong.id}`}>
                                {happySong.artist} <br />
                                {happySong.title} <br />
                                <button onClick={favoriteSongs} value={happySong.id}>Favorite</button>
                            </div>
                        }
                    }
                )
            }
        </>
    )
}