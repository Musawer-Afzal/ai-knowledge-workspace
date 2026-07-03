import { Outlet, NavLink } from 'react-router-dom';

export default function Layout(){
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <nav className="lex gap-6 border-b bg-white px-6 py-4 shadow-sm">
                <NavLink
                to="/"
                className={({isActive}) =>
                    isActive ? "font-semibold text-blue-600" 
                            : "text-gray-600 hover:text-blue-600"
                    }
                >
                    Home
                </NavLink>

                <NavLink
                to="/workspaces"
                className={({ isActive }) => 
                    isActive ? "font-semibold text-blue-600"
                            : "text-gray-600 hover:text-blue-600"
                     }
                >
                    Workspaces
                </NavLink>
            </nav>

            <main className="mx-auto max-w-5xl p-6">
                <Outlet />
            </main>
        </div>
    );
}