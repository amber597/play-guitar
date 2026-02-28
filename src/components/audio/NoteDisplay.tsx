import { useEffect, useState } from "react";

type Props = {
    note: string|null;
}


export default function NoteDisplay({note}: Props) {

    useEffect(()=> {
        console.log("Note is: ", note)
    }, [note])


    return <>
    <p> note is {note} </p>
    </>
}