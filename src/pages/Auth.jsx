import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';

export default function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const data = await api[isLogin ? 'login' : 'register']({ username, password });

      if (isLogin) {
        setUser(data.user);
        navigate('/');
      } else {
        alert("Inscription réussie ! Connectez-vous.");
        setIsLogin(true);
        setPassword('');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='luxury-card' style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center', padding: '30px', borderRadius: '10px' }}>
      <h2 style={{ color: '#c9a063' }}>{isLogin ? 'Connexion' : 'Inscription'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input className="luxury-input" type="text" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input className="luxury-input" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className='btn-luxury' type="submit">
          {isLogin ? 'Se connecter' : "S'inscrire"}
        </button>
      </form>
      <p style={{ marginTop: '20px' }}>
        {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
        <button onClick={() => setIsLogin(!isLogin)} style={{ marginLeft: '10px', background: 'none', border: 'none', color: '#c9a063', textDecoration: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          {isLogin ? "Créer un compte" : "Se connecter"}
        </button>
      </p>
    </div>
  );
}