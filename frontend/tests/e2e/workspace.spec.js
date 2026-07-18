import { test, expect } from "@playwright/test";

test("User can login and create workspace", async ({ page, request }) => {
    const email = "demo@example.com";
    const password = "password123";

    await page.goto("/login");

    await page.getByPlaceholder("Email").fill(email);

    await page.getByPlaceholder("Password").fill(password);

    await page.getByRole("button", { name: /login/i}).click();

    await expect(page).toHaveURL(/workspaces/);

    await page.getByPlaceholder("Workspace Name").fill("Playwright Workspace");

    await page.getByPlaceholder("Description (optional)").fill("Created by Playwright");

    await page.getByRole("button", {name: /create/i}).click();

    await expect(
        page.getByText("Playwright Workspace")
    ).toBeVisible();
});