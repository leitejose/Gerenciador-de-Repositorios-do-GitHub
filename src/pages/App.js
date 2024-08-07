import gitlogo from '../assets/github.png';
import { Container } from './styles';
import Input from '../components/Input';
import ItemRepo from '../components/ItemRepo';
import { useState } from 'react';
import Button from '../components/Button';
import { api } from '../services/api';

function App() {
  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () => {
    try {
      const { data } = await api.get(`repos/${currentRepo}`);
      if (data.id) {
        const isExist = repos.find(repo => repo.id === data.id);
        if (isExist) {
          alert('Repositório já adicionado');
          return;
        }

        setRepos(prev => [...prev, data]);
        setCurrentRepo('');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('Repositório não encontrado!');
      } else {
        console.error('Erro ao buscar repositório:', error);
        alert('Erro ao buscar repositório');
      }
    }
  };

  const handleRemoveRepo = (id) => {
    setRepos(prevRepos => prevRepos.filter(repo => repo.id !== id));
    console.log(`Repositório com ID ${id} removido`);
  };

  return (
    <Container>
      <img src={gitlogo} width={72} height={72} alt='github logo' />
      <Input
        value={currentRepo}
        onChange={(e) => setCurrentRepo(e.target.value)}
      />
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => (
        <ItemRepo 
          handleRemoveRepo={() => handleRemoveRepo(repo.id)} 
          key={repo.id} 
          repo={repo} 
        />
      ))
      }
      <h3>Exemplo de Utilização</h3>
      <p>Para adicionar um repositório, digite o nome do autor e o nome do repositório, separados por uma barra.</p>
      <p>Exemplo: <strong>leitejose/Gerenciador-de-Repositorios-do-GitHub
      </strong></p>
    </Container>
  );
}

export default App;
