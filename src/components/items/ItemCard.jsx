import { Link } from 'react-router-dom';

export default function ItemCard({ item, buttonText, onAction, showSeller }) {
  return (
    <div className='luxury-card' style={{ 
      borderRadius: '10px', 
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
      transition: 'transform 0.2s'
    }}>
      <Link to={`/item/${item._id}`}>
        <img 
          src={item.imageUrl || 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=300&q=80'} 
          alt={item.title} 
          style={{ width: '100%', height: '200px', objectFit: 'cover', borderBottom: '1px solid #c9a063' }}
        />
      </Link>
      
      <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Link to={`/item/${item._id}`} style={{ textDecoration: 'none' }}>
          <h3 style={{ margin: '0 0 5px 0', color: '#c9a063', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.title}</h3>
        </Link>
        <p style={{ margin: '0 0 15px 0', color: '#f4f7f6', fontSize: '14px', flex: 1, opacity: 0.9 }}>
          {item.description.length > 60 ? item.description.substring(0, 60) + '...' : item.description}
        </p>

        {showSeller && item.sellerId && (
          <span style={{ fontSize: '13px', color: '#f4f7f6', marginBottom: '10px', display: 'block', opacity: 0.8 }}>
            Vendu par <strong style={{color: '#c9a063'}}>{item.sellerId.username}</strong>
          </span>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <span style={{ color: '#c9a063', fontWeight: 'bold', fontSize: '22px' }}>{item.price} €</span>
          <button className="btn-luxury" onClick={() => onAction(item)}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}