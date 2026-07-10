import { Link, useNavigate } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import { loginUser } from "../services/authApi";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage() {

    const navigate = useNavigate();
    const { login } = useAuth();

    async function handleLogin(values) {

        try {

            const result = await loginUser(
                values.email,
                values.password
            );

            login(result.access_token);

            console.log("Login successful!");

            navigate("/workspaces");

        } catch (error) {

            console.log(error.message);

        }
    }

    return (
        <div className="mx-auto max-w-lg space-y-6">

            <h1 className="text-3xl font-bold">
                Sign In
            </h1>

            <LoginForm
                onLogin={handleLogin}
            />

            <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                    to="/register"
                    className="text-blue-600 hover:underline"
                >
                    Create Account
                </Link>
            </p>

        </div>
    );
}