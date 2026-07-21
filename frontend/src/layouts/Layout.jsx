import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Layout() {
    const navigate = useNavigate();

    const {
        isAuthenticated,
        logout,
    } = useAuth();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <nav className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
                <div className="flex gap-6">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "font-semibold text-blue-600"
                                : "text-gray-600 hover:text-blue-600"
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/workspaces"
                        className={({ isActive }) =>
                            isActive
                                ? "font-semibold text-blue-600"
                                : "text-gray-600 hover:text-blue-600"
                        }
                    >
                        Workspaces
                    </NavLink>
                </div>
                <div className="flex gap-3">
                    {!isAuthenticated ? (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    isActive
                                        ? "font-semibold text-blue-600"
                                        : "text-gray-600 hover:text-blue-600"
                                }
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    isActive
                                        ? "font-semibold text-blue-600"
                                        : "text-gray-600 hover:text-blue-600"
                                }
                            >
                                Register
                            </NavLink>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </nav>
            <main className="mx-auto max-w-5xl p-6">
                <Outlet />
            </main>
        </div>
    );
}