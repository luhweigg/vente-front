import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <nav style={{ 
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: '#2c3e50', color: 'white', padding: '15px 30px', 
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
        <h2 style={{ margin: 0 }}>Luxe et exclusivité</h2>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Objets en vente</Link>
          <Link to="/mes-ventes" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Mes Ventes</Link>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span style={{ fontSize: '14px' }}>{user.username}</span>
        <h3 style={{ margin: 0 }}>Solde : <span style={{ color: '#2ecc71' }}>{user.money} €</span></h3>
        <button onClick={handleLogout} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}>
          Déconnexion
        </button>
      </div>
    </nav>
  );
}