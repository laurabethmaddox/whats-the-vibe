import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

export const Form = () => {
    const [song, assignSong] = useState({})
    const [emotions, setEmotions] = useState([])
    const { songId } = useParams()
    const history = useHistory()

    useEffect(
        () => {
            return fetch(`http://localhost:8088/songLists/${songId}?_expand=users&_expand=emotion`)
                .then(res => res.json())
                .then((data) => {
                    assignSong(data)
                })
        },
        [ songId ]
    )

    useEffect(
        () => {
            return fetch("http://localhost:8088/emotions")
                .then(res => res.json())
                .then((data) => {
                    setEmotions(data)
                })
        },
        []
    )

    const assignEmotion = (changeEvent) => {
        const newSongObject = {
            "artist": song.artist,
            "title": song.title,
            "emotionId": parseInt(changeEvent.target.value),
            "usersId": parseInt(localStorage.getItem("vibes_user"))
        }

        return fetch(`http://localhost:8088/songLists/${songId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSongObject)
        })
        .then(() => {
            history.push("/songs")
        })
    }

    return (
        <>
            <h2>Song Details</h2>
            <section className="song">
                <h3 className="song__artist">{song.artist}</h3>
                <h3 className="song__title">{song.title}</h3>
                <div className="song__user">{song.users?.name}</div>
                <div className="song__emotion" onChange={ assignEmotion }>
                    {
                        emotions.map(
                            (emotion) => {
                                return <option value={emotion.id} key={`emotion--${emotion.id}`}>
                                    { emotion.type }
                                </option>
                            }
                        )
                    }
                </div>
            </section>
        </>
    )
}