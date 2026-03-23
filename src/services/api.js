const API_URL = import.meta.env.VITE_API_URL;

async function fetchAPI(endpoint, options = {}) {
  const defaultOptions = {
    credentials: 'include',
    ...options,
  };

  const response = await fetch(`${API_URL}${endpoint}`, defaultOptions);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Une erreur est survenue lors de la requête API');
  }

  return data;
}

export const api = {
  
  login: (credentials) => fetchAPI('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  }),
  
  register: (credentials) => fetchAPI('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  }),

  getMarket: (search = '') => fetchAPI(`/item?search=${search}`),
  
  getMyItems: () => fetchAPI('/item/me'),
  
  createItem: (formData) => fetchAPI('/item', {
    method: 'POST',
    body: formData
  }),
  
  deleteItem: (itemId) => fetchAPI(`/item/${itemId}`, { 
    method: 'DELETE' 
  }),

  buyItem: (itemId) => fetchAPI(`/buy/${itemId}`, { 
    method: 'PUT' 
  }),
};