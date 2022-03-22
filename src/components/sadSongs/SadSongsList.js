import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./SadSongs.css"


export const SadSongsList = () => {
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
            <h1 className="sadHeader">Sad n' Slow</h1>
            {
                songs.map(
                    (sadSong) => {
                        if (sadSong.emotion.id === 1) {
                            return (
                                    <div key={`sad--${sadSong.id}`} className="sadSongs">
                                        {sadSong.artist} <br />
                                        {sadSong.title} <br />
                                        <button onClick={favoriteSongs} value={sadSong.id} className="sadButton">Favorite</button>
                                        <a href={sadSong.songLink} target="_blank">Listen Here</a>
                                    </div>
                            )
                        }
                    }
                )
            }
        </>
    )
}