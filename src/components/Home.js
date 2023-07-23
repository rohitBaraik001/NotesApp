import React from 'react'
import Notes from './Notes.js'

function Home(props) {
  return (
    <div>
      <Notes showAlert={props.showAlert}/>
    </div>
  )
}

export default Home
