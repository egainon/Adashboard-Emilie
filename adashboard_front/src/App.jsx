import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

const [data, setData]= useState(null);


useEffect(() => {
    const loadData = async () => {
      try{
    const res = await fetch("http://localhost:3000/themes");
    setData(await res.json());
    }catch (error){
         console.error(error);
    }
  } 
 loadData();
}, []);

//phrase de chargement lors du loadData
 if(!data){
  return <h1>Chargement ...</h1>
 }
 console.log(data[0]);

  return (
    <>
    {data.map((theme) => {
          return (
      <div key={theme.id}>
        <h2>{theme.name}</h2>
          <ul>
          {theme.skills.map((skill) => (
              <li key={skill.label}>
               <p>{skill.label}</p>
              </li>
            ))}
          </ul>
        </div>
    )})
    }
<button></button>
    </>
  )
}

export default App


