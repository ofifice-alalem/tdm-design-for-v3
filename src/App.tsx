import { Routes, Route, Navigate } from 'react-router-dom';
import CreateInvoicePage from './pages/CreateInvoicePage';
import NewOrderPage from './pages/NewOrderPage';
import ReturnStockPage from './pages/ReturnStockPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/invoice/create" replace />} />
      <Route path="/invoice/create" element={<CreateInvoicePage />} />
      <Route path="/order/new" element={<NewOrderPage />} />
      <Route path="/stock/return" element={<ReturnStockPage />} />
    </Routes>
  );
}
