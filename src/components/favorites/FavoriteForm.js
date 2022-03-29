import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Form.css"
import { Icon } from "@iconify/react";

export const FavoriteForm = () => {
    const [song, updateSong] = useState([])
    const history = useHistory()

    const saveSong = (event) => {
        event.preventDefault()

        const newSong = {
            artist: song.artist,
            title: song.title,
            emotionId: song.emotionId,
            usersId: parseInt(localStorage.getItem("vibes_user")),
            songLink: song.songLink,
            img: song.img
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
                history.push("/songs")
            })
    }


    return (
        <form className="songForm">
            <h2 className="songForm__title">New Song</h2>
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
            <fieldset>
                <div className="form-group">
                    <label htmlFor="link">
                        Link {" "}
                        <a href="https://open.spotify.com/" target="_blank">
                            <Icon icon="mdi:spotify" width="25" height="25" />
                        </a>
                    </label>
                    <input
                        type="link" id="link"
                        className="form-control"
                        placeholder="song link"
                        onChange={
                            (evt) => {
                                const copy = {...song}
                                copy.songLink = evt.target.value
                                updateSong(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="img">
                        Photo {" "}
                        <a href="https://www.google.com/imghp?hl=en&tab=ri&authuser=0&ogbl" target="_blank">
                            <Icon icon="ic:baseline-add-photo-alternate" width="25" height="25"/>
                        </a>
                    </label>
                    <input
                        type="img" id="img"
                        className="form-control"
                        placeholder="img url"
                        onChange={
                            (evt) => {
                                const copy = {...song}
                                copy.img = evt.target.value
                                updateSong(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset className="form-5">
                <div className="form-group">
                    <p>What kind of vibe is it?</p>
                    <label htmlFor="sadSongs">Sad</label>
                    <input
                        type="checkbox"
                        onChange={
                            (evt) => {
                                const copy = {...song}
                                copy.emotionId = 1
                                updateSong(copy)
                            }
                        } />
                </div>
                <div className="form-group">
                    <label htmlFor="happySongs">Happy</label>
                    <input
                        type="checkbox"
                        onChange={
                            (evt) => {
                                const copy = {...song}
                                copy.emotionId = 2
                                updateSong(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button className="btn btn-primary" onClick={saveSong}>
                SUBMIT
            </button>
        </form>
    )
}