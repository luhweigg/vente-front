import { useState, useEffect } from 'react';
import AddItemForm from '../components/items/AddItemForm';
import ItemCard from '../components/items/ItemCard';
import { api } from '../services/api';

export default function MyItems() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const fetchMyItems = async () => {
    try {
      const data = await api.getMyItems();
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchMyItems(); }, []);

const handleAdd = async (formData) => {
    setError(null);
    try {
      await api.createItem(formData);
      fetchMyItems();
    } catch (err) {
      setError("Erreur d'ajout");
    }
  };

  const handleRemove = async (item) => {
    try {
      await api.deleteItem(item._id);
      fetchMyItems();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px' }}>
      <h2>Gérer mes ventes</h2>
      
      {error && <div style={{ background: '#ffcccc', color: 'red', padding: '15px', marginBottom: '20px' }}>{error}</div>}

      <AddItemForm onAdd={handleAdd} />

      <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Mes articles actuellement en ligne</h3>
      
      {items.length === 0 ? <p>Vous n'avez aucun article en vente pour le moment.</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {items.map(item => (
            <ItemCard key={item._id} item={item} buttonText="Retirer" buttonColor="#e74c3c" onAction={handleRemove} />
          ))}
        </div>
      )}
    </div>
  );
}