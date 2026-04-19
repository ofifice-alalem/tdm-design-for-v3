import { Routes, Route, Navigate } from 'react-router-dom';
import CreateInvoicePage from './pages/CreateInvoicePage';
import NewOrderPage from './pages/NewOrderPage';
import ReturnStockPage from './pages/ReturnStockPage';
import InvoiceReturnPage from './pages/InvoiceReturnPage';
import CreateReceiptPage from './pages/CreateReceiptPage';
import WithdrawPage from './pages/WithdrawPage';
import InvoicesListPage from './pages/InvoicesListPage';
import StockOrdersPage from './pages/StockOrdersPage';
import StoreSalesPage from './pages/StoreSalesPage';
import InvoiceDetailPage from './pages/InvoiceDetailPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/store-sales" replace />} />
      <Route path="/store-sales" element={<StoreSalesPage />} />
      <Route path="/invoices" element={<InvoicesListPage />} />
      <Route path="/invoices/:id" element={<InvoiceDetailPage />} />
      <Route path="/invoice/create" element={<CreateInvoicePage />} />
      <Route path="/invoice/return" element={<InvoiceReturnPage />} />
      <Route path="/order/new" element={<NewOrderPage />} />
      <Route path="/stock/return" element={<ReturnStockPage />} />
      <Route path="/stock/orders" element={<StockOrdersPage />} />
      <Route path="/receipt/create" element={<CreateReceiptPage />} />
      <Route path="/withdraw/new" element={<WithdrawPage />} />
    </Routes>
  );
}
