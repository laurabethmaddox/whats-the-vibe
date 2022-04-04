import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./SadSongs.css"
import { Icon } from "@iconify/react";

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
            <h1 className="sadHeader">What kind of sad n' slow are we feeling today?</h1>
                {
                    songs.map(
                        (sadSong) => {
                            if (sadSong.emotion.id === 1) {
                                return (
                                        <div key={`sad--${sadSong.id}`} className="sadSongs">
                                            <p className="sadSongList">
                                                <img src={sadSong.img} /> <br />
                                                <a href={sadSong.songLink} target="_blank" className="link">
                                                    <Icon icon="mdi:spotify" width="21" height="21"/>
                                                </a> <br />
                                                {sadSong.artist} <br />
                                                {sadSong.title} <br />
                                                <button onClick={favoriteSongs} value={sadSong.id}  className="sadFavButton">
                                                    🖤
                                                </button> 
                                            </p>
                                        </div>
                                )
                            }
                        }
                    )
                }
        </>
    )
}