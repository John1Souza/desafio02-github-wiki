import React, { useState } from 'react'


import gitLogo from '../assets/logo__git.png'
import Button from '../components/Button';
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api';



import { Container } from './styles'



function App() {
  const [currentRepo, setCurrentRepo] = useState('')
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`)

    if (data.id){
      const isExists = repos.find(repo => repo.id == data.id)
      if(!isExists){
        setRepos(prev => [...prev, data]);
        setCurrentRepo('')
        return
      } 
    }
    alert('Repositório não encontrado')
  }
  const handleRemoveRepo = (id) => {
    console.log('Removendo registro', id);
    // utilizar filter.
    const repositorio__novo = repos.id.slice();
    repositorio__novo.splice(id, 1);
  }


  return (
    <Container className="App">
      <img src={gitLogo} width={72} height={72} />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo((e.target.value))}/>
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo} />)}      
    </Container>
  );
}

export default App;
