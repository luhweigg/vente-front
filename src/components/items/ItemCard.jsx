export default function ItemCard({ item, buttonText, buttonColor, onAction, showSeller }) {
  return (
    <div style={{ 
      background: 'white', border: '1px solid #e0e0e0', borderRadius: '10px', 
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
      boxShadow: '0 4px 8px rgba(0,0,0,0.05)', transition: 'transform 0.2s'
    }}>
      <img 
        src={item.imageUrl || 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=300&q=80'} 
        alt={item.title} 
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
      
      <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>{item.title}</h3>

        <p style={{ margin: '0 0 15px 0', color: '#7f8c8d', fontSize: '14px', flex: 1 }}>
          {item.description.length > 60 ? item.description.substring(0, 60) + '...' : item.description}
        </p>

        {showSeller && item.sellerId && (
          <span style={{ fontSize: '13px', color: '#7f8c8d', marginBottom: '10px', display: 'block' }}>
            Vendu par <strong style={{color: '#34495e'}}>{item.sellerId.username}</strong>
          </span>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <span style={{ color: '#27ae60', fontWeight: 'bold', fontSize: '22px' }}>{item.price} €</span>
          <button onClick={() => onAction(item)} style={{ background: buttonColor, color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}