import ItemCard from './ItemCard';

export default function ItemList({ title, emptyMessage, items, buttonText, onAction }) {
  return (
    <div style={{ flex: 1, background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>
      <h3 style={{ borderBottom: '2px solid #ddd', paddingBottom: '10px', color: '#0a1128' }}>{title}</h3>
      {items.length === 0 ? <p style={{ color: '#7f8c8d' }}>{emptyMessage}</p> : null}
      
      {items.map(item => (
        <ItemCard 
          key={item._id} 
          item={item}
          buttonText={buttonText} 
          onAction={onAction} 
        />
      ))}
    </div>
  );
}