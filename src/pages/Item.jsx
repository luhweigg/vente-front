import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function Item() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await api.getOneItem(id);
        setItem(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchItem();
  }, [id]);

  const handleBuy = async () => {
    try {
      const data = await api.buyItem(id);
      setUser({ ...user, money: data.newBalance });
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemove = async () => {
    try {
      await api.deleteItem(id);
      navigate('/mes-ventes');
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <div style={{ color: '#e74c3c', textAlign: 'center', marginTop: '50px' }}>{error}</div>;
  if (!item) return <div style={{ textAlign: 'center', marginTop: '50px', color: '#c9a063' }}>Chargement...</div>;

  const sellerId = typeof item.sellerId === 'object' ? item.sellerId._id : item.sellerId;
  const userId = user._id || user.id;
  const isOwner = sellerId === userId;

  return (
    <div className='luxury-card' style={{ maxWidth: '800px', margin: '40px auto', padding: '30px', borderRadius: '10px' }}>
      <button className="btn-luxury" onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>
        Retour
      </button>
      
      <img 
        src={item.imageUrl || 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80'} 
        alt={item.title} 
        style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #c9a063' }} 
      />
      
      <h1 style={{ marginTop: '25px', color: '#c9a063', textTransform: 'uppercase', letterSpacing: '1px' }}>
        {item.title}
      </h1>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
        <p style={{ fontSize: '28px', color: '#c9a063', fontWeight: 'bold', margin: 0 }}>
          {item.price} €
        </p>
        
        {isOwner ? (
          <button className="btn-luxury" onClick={handleRemove} style={{ color: '#e74c3c', borderColor: '#e74c3c' }}>
            Retirer l'article
          </button>
        ) : (
          <button className="btn-luxury" onClick={handleBuy}>
            Acheter
          </button>
        )}
      </div>

      <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(201, 160, 99, 0.3)', borderRadius: '8px', lineHeight: '1.8', color: '#f4f7f6' }}>
        {item.description}
      </div>
    </div>
  );
}