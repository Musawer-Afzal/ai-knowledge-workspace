import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
    email: z
        .email("Enter a valid email address"),

    password: z
        .string()
        .min(1, "Password is required"),
});

export default function LoginForm({ onLogin }) {

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    async function submit(values) {
        await onLogin(values);
    }

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="space-y-4 max-w-md"
            noValidate
        >
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium"
                >
                    Email
                </label>

                <input
                    placeholder="Email"
                    type="email"
                    {...register("email")}
                    className="mt-1 w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
                />

                {errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="block text-sm font-medium"
                >
                    Password
                </label>

                <input
                    placeholder="Password"
                    type="password"
                    {...register("password")}
                    className="mt-1 w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
                />

                {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
            >
                {isSubmitting ? "Logging In..." : "Login"}
            </button>
        </form>
    );
}