import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AppShell } from './compenntes/layout';
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
import EditInvoicePage from './pages/EditInvoicePage';

import MarketersPage from './pages/MarketersPage';

import OrderDetailPage from './pages/OrderDetailPage';

import WithdrawListPage from './pages/WithdrawListPage';
import WithdrawDetailPage from './pages/WithdrawDetailPage';

function Layout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/store-sales" replace />} />
        <Route path="/store-sales" element={<StoreSalesPage />} />
        <Route path="/invoices" element={<InvoicesListPage />} />
        <Route path="/invoices/:id" element={<InvoiceDetailPage />} />
        <Route path="/invoice/create" element={<CreateInvoicePage />} />
        <Route path="/invoice/edit/:id" element={<EditInvoicePage />} />
        <Route path="/invoice/return" element={<InvoiceReturnPage />} />
        <Route path="/order/new" element={<NewOrderPage />} />
        <Route path="/marketers" element={<MarketersPage />} />
        <Route path="/stock/return" element={<ReturnStockPage />} />
        <Route path="/stock/orders" element={<StockOrdersPage />} />
        <Route path="/stock/orders/:id" element={<OrderDetailPage />} />
        <Route path="/receipt/create" element={<CreateReceiptPage />} />
        <Route path="/withdraw/new" element={<WithdrawPage />} />
        <Route path="/withdraw/list" element={<WithdrawListPage />} />
        <Route path="/withdraw/list/:id" element={<WithdrawDetailPage />} />
      </Route>
    </Routes>
  );
}
