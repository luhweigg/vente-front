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
    <div style={{ background: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
      <h3 style={{ margin: '0 0 20px 0', color: '#2c3e50' }}>Ajouter un article à vendre</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div style={{ display: 'flex', gap: '15px' }}>
          <input type="text" placeholder="Titre (ex: iPhone 12)" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ flex: 1, padding: '12px', border: '1px solid #ccc', borderRadius: '5px' }} />
          <input type="number" placeholder="Prix (€)" min="0" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ width: '150px', padding: '12px', border: '1px solid #ccc', borderRadius: '5px' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <label htmlFor="imageUpload" style={{ fontSize: '14px', color: '#7f8c8d' }}>Image du produit :</label>
          <input 
            type="file" 
            id="imageUpload"
            accept="image/png, image/jpeg, image/jpg, image/webp" 
            onChange={(e) => setImageFile(e.target.files[0])}
            ref={fileInputRef}
            style={{ padding: '10px', border: '1px dashed #ccc', borderRadius: '5px', cursor: 'pointer' }} 
          />
        </div>

        <textarea placeholder="Description détaillée..." value={description} onChange={(e) => setDescription(e.target.value)} required style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '5px', minHeight: '80px', fontFamily: 'inherit' }} />

        <button type="submit" style={{ background: '#3498db', color: 'white', border: 'none', padding: '12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
          Mettre en vente
        </button>
      </form>
    </div>
  );
}