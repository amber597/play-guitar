import { useState } from 'react'
import './App.css'
import NoteListener from './components/audio/NoteListner'
import NoteDisplay from './components/audio/NoteDisplay'
import SongComponent from './components/song/SongComponent'


function App() {
  const [note, setNote] = useState<string | null>(null);

  return (
    <>
      <SongComponent currNote={note}/>
      <NoteListener setNote={setNote}/>
      <NoteDisplay note = {note}/>
    </>
  )
}

export default App
