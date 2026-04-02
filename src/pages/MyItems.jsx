import { useState, useEffect } from 'react';
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
      setError(err.message);
    }
  };

  useEffect(() => { fetchMyItems(); }, []);

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
      <h2 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px', color: '#c9a063' }}>Mes articles en ligne</h2>
      
      {error && <div style={{ background: '#ffcccc', color: 'red', padding: '15px', marginBottom: '20px' }}>{error}</div>}

      {items.length === 0 ? <p>Vous n'avez aucun article en vente pour le moment.</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {items.map(item => (
            <ItemCard key={item._id} item={item} buttonText="Retirer" onAction={handleRemove} />
          ))}
        </div>
      )}
    </div>
  );
}