import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function HomeRedirect() {
    const { isAuthenticated } = useAuth();

    return (
        <Navigate
            to={isAuthenticated ? "/workspaces" : "/login"}
            replace
        />
    );
}