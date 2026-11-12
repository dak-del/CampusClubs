import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home as HomeIcon, LayoutGrid, User } from 'lucide-react';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import OrgDetail from './pages/ClubDetail';
import Dashboard from './pages/Dashboard';

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/home" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold text-xl">U</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            UniOrgs
                        </span>
                    </Link>

                    <div className="flex gap-2">
                        <Link
                            to="/"
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all"
                        >
                            <HomeIcon className="w-5 h-5" />
                            <span className="hidden md:inline">Главная</span>
                        </Link>
                        <Link
                            to="/catalog"
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all"
                        >
                            <LayoutGrid className="w-5 h-5" />
                            <span className="hidden md:inline">Каталог</span>
                        </Link>
                        <Link
                            to="/dashboard"
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all"
                        >
                            <User className="w-5 h-5" />
                            <span className="hidden md:inline">Кабинет</span>
                        </Link>
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
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog />} />
                    <Route path="/org/:id" element={<OrgDetail />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}