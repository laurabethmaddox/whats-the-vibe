import React, { useEffect, useState } from "react";
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
            <h1 id="header">Sad n' Slow</h1>
            <div id="addSong">
                <button onClick={() => history.push("/sadSongs/create")}>Add a song</button>
            </div>
            {
                songs.map(
                    (sadSong) => {
                        if (sadSong.emotion.name === "sad n' slow") {
                            return <section key={`sad--${sadSong.id}`} id="section">
                                <div id="songs">
                                    <p id="song">
                                        {sadSong.artist} <br />                                        
                                    
                                        {sadSong.title} <br />
                                    
                                        <button onClick={favoriteSongs} value={sadSong.id}>Favorite</button>
                                    </p>
                                </div>
                            </section>
                        }
                    }
                )
            }
        </>
    )
}