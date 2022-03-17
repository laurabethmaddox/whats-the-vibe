import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const SadSongForm = () => {
    const [song, updateSong] = useState({
        artist: "",
        title: "",
    })
    const history = useHistory()

    const saveSong = (event) => {
        event.preventDefault()

        const newSong = {
            artist: song.artist,
            title: song.title,
            emotionId: 1,
            usersId: parseInt(localStorage.getItem("vibes_user"))
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSong)
        }

        return fetch("http://localhost:8088/songLists", fetchOption)
            .then(res => res.json())
            .then(() => {
                history.push("/sadSongs")
            })
    }

    return (
        <form className="sadSongForm">
            <h2 className="sadSongForm__title">New Sad Song</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="artist">Artist</label>
                    <input
                        type="text" id="artist"
                        className="form-control"
                        placeholder="artist name"
                        onChange={
                            (evt) => {
                                const copy = {...song}
                                copy.artist = evt.target.value
                                updateSong(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text" id="title"
                        className="form-control"
                        placeholder="song title"
                        onChange={
                            (evt) => {
                                const copy = {...song}
                                copy.title = evt.target.value
                                updateSong(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={saveSong}>
                Submit
            </button>
        </form>
    )
}