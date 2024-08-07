import React from 'react';
import { ItemContainer } from './styles';

function ItemRepo({ repo, handleRemoveRepo }) {
  const onRemove = (e) => {
    e.stopPropagation(); // Evita que o evento de clique no container também seja disparado
    handleRemoveRepo(repo.id);
  };

  return (
    <ItemContainer>
      <h3>{repo.name}</h3>
      <p>{repo.full_name}</p>
      <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>Ver Repositorio</a>
      <br />
      <a href="#" className="remove" onClick={onRemove}>Remover</a>
      <hr />
    </ItemContainer>
  );
}

export default ItemRepo;
