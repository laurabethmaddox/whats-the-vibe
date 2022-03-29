import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import "./HappySongs.css"
import { Icon } from "@iconify/react";


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
            <h1 className="happyHeader">Happy</h1>
            {/* <p className="happyDropdown">Dropdown</p> */}
            {
                songs.map(
                    (happySong) => {
                        if (happySong.emotion.id === 2) {
                            return <div key={`happy--${happySong.id}`} className="happySongs">
                                <p className="happySongList">
                                    <img src={happySong.img} /> <br />
                                    <a href={happySong.songLink} target="_blank" className="happyLink">
                                        <Icon icon="mdi:spotify" width="25" height="25"/>
                                    </a> <br />
                                    {happySong.artist} <br />
                                    {happySong.title} <br />
                                    <button onClick={favoriteSongs} value={happySong.id} className="happyButton">
                                        🖤
                                    </button> 
                                </p>
                            </div>
                        }
                    }
                )
            }
        </>
    )
}