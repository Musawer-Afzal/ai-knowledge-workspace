import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
    email: z
        .email("Enter a valid email address"),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters"),
});

export default function RegisterForm({ onRegister }) {

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    async function submit(values) {
        await onRegister(values);
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
                    id="email"
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
                    id="password"
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
                {isSubmitting ? "Creating..." : "Create Account"}
            </button>
        </form>
    );
}