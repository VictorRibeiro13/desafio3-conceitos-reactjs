import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [reps, setReps] = useState([]);
  // const [newRepTitle, setNewRepTitle] = useState('')

  useEffect(()=> {
    api.get('/repositories').then((response)=>{
      setReps(response.data);
    });
  } ,[]);


  async function handleAddRepository() {
    // if(newRepTitle === ""){
    //   setNewRepTitle("Desafio ReactJS");
    // }

    const { data } = await api.post('/repositories', {
      // title: newRepTitle,
      title: `new Repository Rocketseat ${Date.now()}`,
      url: "https://github.com/VictorRibeiro13",
      techs: ["Node", "React"]
    });

    setReps([...reps, data])
  }

  async function handleRemoveRepository(id) {
     
    try{
      api.delete(`/repositories/${id}`).then(()=>{
        // adicionar novamente todos os reps que nao tiverem o id passado
        setReps(reps.filter(rep => rep.id !== id));
      })
    }catch{
      alert("Erro ao deletar Repositorio")
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
           
          { reps.map( rep => (
            <li key={rep.id}>
              {rep.title} 

              <button onClick={() => handleRemoveRepository(rep.id)}>
                Remover
              </button>
            </li>
        )) } 
              
      </ul>

      <div>
        {/* <input type="text" 
        placeholder="Repository name"
        value={newRepTitle}
        onChange={e=> setNewRepTitle(e.target.value)}
        /> */}
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
    </div>
  );
}

export default App;
