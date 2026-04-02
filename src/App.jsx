import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Auth from './pages/Auth';
import AllItems from './pages/AllItems';
import MyItems from './pages/MyItems';
import Item from './pages/Item';
import SellItem from './pages/SellItem';
import Navbar from './components/layout/Navbar';

function AppRoutes() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllItems />} />
        <Route path="/mes-ventes" element={<MyItems />} />
        <Route path="/vendre" element={<SellItem />} />
        <Route path="/item/:id" element={<Item />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}