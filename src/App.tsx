import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NoteListener from './components/audio/NoteListner'
import NoteDisplay from './components/audio/NoteDisplay'


function App() {
  const [note, setNote] = useState<string | null>(null);

  return (
    <>
      <NoteListener setNote={setNote}/>
      <NoteDisplay note = {note}/>
    </>
  )
}

export default App
