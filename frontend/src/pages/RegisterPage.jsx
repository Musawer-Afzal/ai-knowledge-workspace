import { useNavigate, Link } from "react-router-dom";

import RegisterForm from "../components/auth/RegisterForm";
import { registerUser } from "../api/authApi";

export default function RegisterPage() {

    const navigate = useNavigate();

    async function handleRegister(values) {

        try {
            await registerUser(values);

            console.log("Registration successful!");

            navigate("/login");

        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="mx-auto max-w-lg space-y-6">

            <h1 className="text-3xl font-bold">
                Create Account
            </h1>

            <RegisterForm
                onRegister={handleRegister}
            />

            <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-blue-600 hover:underline"
                >
                    Sign in
                </Link>
            </p>

        </div>
    );
}