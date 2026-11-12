import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Catalog from './pages/Catalog';
import OrgDetail from './pages/ClubDetail';
import Dashboard from './pages/Dashboard';

function Layout({ children }: { children: React.ReactNode }) {
    const linkBase =
        'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150';

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-white to-slate-50">
            {/* Тонкая декоративная сетка на фоне */}
            <div
                aria-hidden
                className="pointer-events-none fixed inset-0 -z-10 opacity-[0.35]
                           [background-image:linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)]
                           [background-size:32px_32px]
                           [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
            />

            <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
                    <NavLink to="/" className="group flex items-center gap-2">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-600/30 transition-transform group-hover:scale-105">
                            {/* простая иконка «кампус» */}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 21h18" />
                                <path d="M5 21V7l7-4 7 4v14" />
                                <path d="M9 21v-6h6v6" />
                            </svg>
                        </span>
                        <span className="text-lg font-bold tracking-tight text-slate-900">
                            Campus<span className="text-blue-600">Clubs</span>
                        </span>
                    </NavLink>

                    <div className="flex items-center gap-1 sm:gap-2">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                `${linkBase} ${isActive
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                }`
                            }
                        >
                            Каталог
                        </NavLink>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `${linkBase} ${isActive
                                    ? 'bg-blue-50 text-blue-700'
                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                }`
                            }
                        >
                            Мои заявки
                        </NavLink>
                    </div>
                </div>
            </nav>

            <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
                {children}
            </main>

            <footer className="border-t border-slate-200/70 bg-white/60">
                <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-slate-500 sm:px-6">
                    © {new Date().getFullYear()} CampusClubs — студенческие клубы кампуса
                </div>
            </footer>
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