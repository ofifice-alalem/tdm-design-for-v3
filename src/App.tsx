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

import WarehousePage from './pages/WarehousePage';
import WarehouseMovementsListPage from './pages/WarehouseMovementsListPage';
import WarehouseMovementDetailPage from './pages/WarehouseMovementDetailPage';
import CreateWarehouseMovementPage from './pages/CreateWarehouseMovementPage';
import EditWarehouseMovementPage from './pages/EditWarehouseMovementPage';
import PurchasesPage from './pages/PurchasesPage';
import FactoryInvoicesListPage from './pages/FactoryInvoicesListPage';
import FactoryInvoiceDetailPage from './pages/FactoryInvoiceDetailPage';
import CreateFactoryInvoicePage from './pages/CreateFactoryInvoicePage';
import EditFactoryInvoicePage from './pages/EditFactoryInvoicePage';

import StoresMenuPage from './pages/StoresMenuPage';
import StoresPage from './pages/StoresPage';
import CreateStorePage from './pages/CreateStorePage';
import CreateCompanyPage from './pages/CreateCompanyPage';
import CreateBranchPage from './pages/CreateBranchPage';
import CompanyActivityPage from './pages/CompanyActivityPage';
import EditCompanyPage from './pages/EditCompanyPage';
import StoreDetailPage from './pages/StoreDetailPage';
import EditStorePage from './pages/EditStorePage';
import MarketersPage from './pages/MarketersPage';

import OrderDetailPage from './pages/OrderDetailPage';

import ReturnInvoicesListPage from './pages/ReturnInvoicesListPage';
import ReturnInvoiceDetailPage from './pages/ReturnInvoiceDetailPage';
import ReceiptsListPage from './pages/ReceiptsListPage';
import ReceiptDetailPage from './pages/ReceiptDetailPage';
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
        <Route path="/purchases" element={<PurchasesPage />} />
        <Route path="/warehouse" element={<WarehousePage />} />
        <Route path="/warehouse/movements" element={<WarehouseMovementsListPage />} />
        <Route path="/warehouse/movements/demo" element={<WarehouseMovementDetailPage />} />
        <Route path="/warehouse/movements/:id" element={<WarehouseMovementDetailPage />} />
        <Route path="/warehouse/movement/create" element={<CreateWarehouseMovementPage />} />
        <Route path="/warehouse/movement/edit/demo" element={<EditWarehouseMovementPage />} />
        <Route path="/warehouse/movement/edit/:id" element={<EditWarehouseMovementPage />} />
        <Route path="/factory/invoices" element={<FactoryInvoicesListPage />} />
        <Route path="/factory/invoices/demo" element={<FactoryInvoiceDetailPage />} />
        <Route path="/factory/invoices/:id" element={<FactoryInvoiceDetailPage />} />
        <Route path="/factory/invoice/create" element={<CreateFactoryInvoicePage />} />
        <Route path="/factory/invoice/edit/demo" element={<EditFactoryInvoicePage />} />
        <Route path="/factory/invoice/edit/:id" element={<EditFactoryInvoicePage />} />
        <Route path="/stores" element={<StoresMenuPage />} />
        <Route path="/stores/list" element={<StoresPage />} />
        <Route path="/stores/create" element={<CreateStorePage />} />
        <Route path="/companies/create" element={<CreateCompanyPage />} />
        <Route path="/branches/create" element={<CreateBranchPage />} />
        <Route path="/companies/:id/activity" element={<CompanyActivityPage />} />
        <Route path="/companies/:id/edit" element={<EditCompanyPage />} />
        <Route path="/branches/:id" element={<StoreDetailPage />} />
        <Route path="/branches/:id/edit" element={<EditStorePage />} />
        <Route path="/stores/:id" element={<StoreDetailPage />} />
        <Route path="/stores/:id/edit" element={<EditStorePage />} />
        <Route path="/marketers" element={<MarketersPage />} />
        <Route path="/stock/return" element={<ReturnStockPage />} />
        <Route path="/stock/orders" element={<StockOrdersPage />} />
        <Route path="/stock/orders/:id" element={<OrderDetailPage />} />
        <Route path="/receipt/create" element={<CreateReceiptPage />} />
        <Route path="/withdraw/new" element={<WithdrawPage />} />
        <Route path="/invoices/returns" element={<ReturnInvoicesListPage />} />
        <Route path="/invoices/returns/demo" element={<ReturnInvoiceDetailPage />} />
        <Route path="/invoices/returns/:id" element={<ReturnInvoiceDetailPage />} />
        <Route path="/receipts" element={<ReceiptsListPage />} />
        <Route path="/receipts/demo" element={<ReceiptDetailPage />} />
        <Route path="/receipts/:id" element={<ReceiptDetailPage />} />
        <Route path="/withdraw/list" element={<WithdrawListPage />} />
        <Route path="/withdraw/list/:id" element={<WithdrawDetailPage />} />
      </Route>
    </Routes>
  );
}
