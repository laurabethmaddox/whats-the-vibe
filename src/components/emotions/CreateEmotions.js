import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Emotion = () => {
    const [emotion, assignEmotion] = useState({})  // State variable for current ticket object
    const { emotionId } = useParams()  // Variable storing the route parameter

    useEffect(
        () => {
            return fetch(`http://localhost:8088/emotions/${emotionId}`)
                .then(response => response.json())
                .then((data) => {
                    assignEmotion(data)
                })
        },
        [ emotionId ]
    )

    return (
        <>
            <section className="emotion">
                <h3 className="emotion__type">{emotion.type}</h3>
            </section>
        </>
    )
}