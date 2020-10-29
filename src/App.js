import React, {useEffect, useState} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res =>{
      setRepos(res.data)
    })
  }, [])

  async function handleAddRepository() {
    // TODO

    const res = await api.post('repositories', {
      title: "Desafio Node.js", 
      url: "http://github.com/...", 
      techs: [
		  "Node.js", 
		  "..."
		]
    })

    setRepos([...repos, res.data])
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`)

    setRepos(repos.filter(repo => repo.id != id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map( repo  => 
        <li key={repo.id}>
          {repo.title} 
        <button onClick={() => handleRemoveRepository(repo.id)}> Remover </button>
         </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
