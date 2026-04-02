import { useState, useEffect, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ItemCard from '../components/items/ItemCard';
import { api } from '../services/api';

export default function AllItems() {
  const { user, setUser } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const [lastBoughtItem, setLastBoughtItem] = useState(null);
  const [error, setError] = useState(null);

  const fetchAllItems = async (searchQuery = '') => {
    try {
      const data = await api.getAllItems(searchQuery);
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { 
    fetchAllItems(search); 
  }, [search]);

  const handleBuy = async (item) => {
    setError(null);
    try {
      const data = await api.buyItem(item._id);
      if (data.newBalance !== undefined) {
        setUser({ ...user, money: data.newBalance });
        setLastBoughtItem(item);
        fetchAllItems(search);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Erreur lors de l'achat.");
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px' }}>
      
      {error && <div style={{ background: '#ffcccc', color: 'red', padding: '15px', marginBottom: '20px', borderRadius: '5px' }}>{error}</div>}
      
      {lastBoughtItem && (
        <div style={{ background: 'rgba(46, 204, 113, 0.2)', color: '#2ecc71', border: '1px solid #2ecc71', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
          Achat réussi : <strong>{lastBoughtItem.title}</strong> pour {lastBoughtItem.price} € !
        </div>
      )}

      {items.length === 0 ? <p style={{ color: '#f4f7f6' }}>Aucun produit ne correspond à votre recherche.</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {items.map(item => (
            <ItemCard key={item._id} item={item} buttonText="Acheter" onAction={handleBuy} showSeller={true} />
          ))}
        </div>
      )}
    </div>
  );
}