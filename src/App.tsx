import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NoteListener from './components/audio/NoteListner'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NoteListener/>
    </>
  )
}

export default App
