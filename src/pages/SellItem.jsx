import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddItemForm from '../components/items/AddItemForm';
import { api } from '../services/api';

export default function Sell() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleAdd = async (formData) => {
    setError(null);
    try {
      await api.createItem(formData);
      navigate('/mes-ventes');
    } catch (err) {
      setError("Erreur d'ajout");
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px', color: '#c9a063' }}>
      <h2>Mettre en vente un article</h2>
      {error && <div style={{ background: '#ffcccc', color: 'red', padding: '15px', marginBottom: '20px' }}>{error}</div>}
      
      <AddItemForm onAdd={handleAdd} />
    </div>
  );
}