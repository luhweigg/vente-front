import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ItemCard from '../components/items/ItemCard';
import { api } from '../services/api';

export default function Market() {
  const { user, setUser } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [lastBoughtItem, setLastBoughtItem] = useState(null);
  const [error, setError] = useState(null);

  const fetchMarket = async (searchQuery = '') => {
    try {
      const data = await api.getMarket(searchQuery);
      setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchMarket(); }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMarket(search);
  };

  const handleBuy = async (item) => {
    setError(null);
    try {
      const data = await api.buyItem(item._id);
      if (data.newBalance !== undefined) {
        setUser({ ...user, money: data.newBalance });
        setLastBoughtItem(item);
        fetchMarket(search);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Erreur lors de l'achat.");
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '30px auto', padding: '0 20px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" placeholder="Rechercher un produit..." value={search} onChange={(e) => setSearch(e.target.value)} 
            style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <button type="submit" style={{ background: '#2c3e50', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Chercher</button>
        </form>
      </div>

      {error && <div style={{ background: '#ffcccc', color: 'red', padding: '15px', marginBottom: '20px' }}>{error}</div>}
      
      {lastBoughtItem && (
        <div style={{ background: '#d4edda', color: '#155724', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
          Achat réussi : <strong>{lastBoughtItem.title}</strong> pour {lastBoughtItem.price} € !
        </div>
      )}

      {items.length === 0 ? <p>Aucun produit ne correspond à votre recherche.</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {items.map(item => (
            <ItemCard key={item._id} item={item} buttonText="Acheter" buttonColor="#27ae60" onAction={handleBuy} showSeller={true} />
          ))}
        </div>
      )}
    </div>
  );
}