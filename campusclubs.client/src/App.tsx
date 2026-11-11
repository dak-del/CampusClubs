import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Catalog from './pages/Catalog';
import OrgDetail from './pages/ClubDetail';
import Dashboard from './pages/Dashboard';

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-700">CampusClubs</span>
                    <div className="flex gap-6">
                        <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Каталог</Link>
                        <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">Мои заявки</Link>
                    </div>
                </div>
            </nav>
            <main>{children}</main>
        </div>
    );
}
export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Catalog />} />
                    <Route path="/org/:id" element={<OrgDetail />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}