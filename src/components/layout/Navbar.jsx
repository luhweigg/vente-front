import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/');
    }
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#060b19', borderBottom: '1px solid #c9a063', color: '#c9a063', padding: '15px 50px', boxShadow: '0 4px 10px rgba(0,0,0,0.5)', position: 'sticky', top: 0, zIndex: 100 }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
        <Link to="/" className="nav-link-luxury">
          <h2 style={{ margin: 0, letterSpacing: '2px', textTransform: 'uppercase' }}>Luxe et exclusivité</h2>
        </Link>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <Link to="/" className="nav-link-luxury">Objets en vente</Link>
          <Link to="/mes-ventes" className="nav-link-luxury">Mes ventes</Link>
          <Link to="/vendre" className="nav-link-luxury">Vendre un objet</Link>
          
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginLeft: '20px' }}>
            <input 
              type="text" 
              placeholder="Rechercher..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="luxury-input"
              style={{ padding: '8px 12px', width: '200px' }}
            />
            <button className="btn-luxury" type="submit" style={{ padding: '8px 15px' }}>
              Chercher
            </button>
          </form>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span style={{ fontSize: '14px', letterSpacing: '1px' }}>{user.username}</span>
        <h3 style={{ margin: 0 }}>Solde : <span>{user.money} €</span></h3>
        <button className="btn-luxury" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    </nav>
  );
}