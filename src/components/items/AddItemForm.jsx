import { useState, useRef } from 'react';

export default function AddItemForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState(null);
  
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', Number(price));
    if (imageFile) {
      formData.append('image', imageFile);
    }

    onAdd(formData);
    
    setTitle(''); setDescription(''); setPrice(''); setImageFile(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="luxury-card" style={{ padding: '25px', borderRadius: '10px', marginBottom: '30px' }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#c9a063' }}>Ajouter un article à vendre</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div style={{ display: 'flex', gap: '15px' }}>
          <input className="luxury-input" type="text" placeholder="Titre (ex: Montre Rolex)" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ flex: 1 }} />
          <input className="luxury-input" type="number" placeholder="Prix (€)" min="0" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ width: '150px' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="imageUpload" style={{ fontSize: '14px', color: '#c9a063' }}>Image du produit :</label>
          <input 
            className="luxury-input"
            type="file" 
            id="imageUpload"
            accept="image/png, image/jpeg, image/jpg, image/webp" 
            onChange={(e) => setImageFile(e.target.files[0])}
            ref={fileInputRef}
            style={{ cursor: 'pointer', borderStyle: 'dashed' }} 
          />
        </div>

        <textarea className="luxury-input" placeholder="Description détaillée..." value={description} onChange={(e) => setDescription(e.target.value)} required style={{ minHeight: '80px', fontFamily: 'inherit' }} />

        <button className="btn-luxury" type="submit">
          Mettre en vente
        </button>
      </form>
    </div>
  );
}