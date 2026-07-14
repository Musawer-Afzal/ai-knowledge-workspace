import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Define the data shape ONCE. The same rules become your FastAPI/Pydantic model later.
const workspaceSchema = z.object({
    name: z
        .string()
        .min(1, "Workspace name is required")
        .max(60, "Maximum 60 characters"),

    description: z
        .string()
        .max(280, "Maximum 280 characters")
        .optional(),
});
export default function NewWorkspaceForm({ onCreate }) {
const {
    register,
    handleSubmit,
    reset,
    formState: {
        errors,
        isSubmitting,
    },
} = useForm({
    resolver: zodResolver(workspaceSchema),
});

async function submit(values) {
    await onCreate(values); // parent does the optimistic add
    reset(); // clear the inputs after success
}
    return (
        <form onSubmit={handleSubmit(submit)} className="space-y-3" noValidate>
            <div>
                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                <input
                id="name"
                {...register("name")}
                aria-invalid={errors.name ? "true" : "false"}
                className="mt-1 w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"/>
                {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium">
                Description (optional)
                </label>
                    <textarea
                    id="description"
                    {...register("description")}
                    className="mt-1 w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
            </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
                >
                {isSubmitting ? "Creating…" : "Create workspace"}
            </button>
        </form>
    );
}