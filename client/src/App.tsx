import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Items from './pages/Items';
import ItemDetail from './pages/ItemDetail';
import Locations from './pages/Locations';
import Login from './pages/Login';

export default function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-200 flex gap-4">
        <Link to="/">Dashboard</Link>
        <Link to="/items">Items</Link>
        <Link to="/locations">Locations</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/locations" element={<Locations />} />
      </Routes>
    </BrowserRouter>
  );
}
