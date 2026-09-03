import { expect, test } from "@playwright/test";

test("overview shows KPIs and charts", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();
  await expect(page.getByText("Followers", { exact: true })).toBeVisible();
  await expect(page.getByText("Reach", { exact: true })).toBeVisible();
  await expect(page.getByText("Engagement rate")).toBeVisible();
  await expect(page.getByText("Follower growth")).toBeVisible();
  await expect(page.getByText("Reach mix")).toBeVisible();
});

test("navigates from overview to posts", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Posts" }).click();

  await expect(page).toHaveURL("/posts");
  await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();
  await expect(page.getByRole("table")).toBeVisible();
});

test("opens a platform overview", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Instagram" }).click();

  await expect(page).toHaveURL("/platforms/instagram");
  await expect(page.getByRole("heading", { name: "Instagram" })).toBeVisible();
  await expect(page.getByText("Followers", { exact: true })).toBeVisible();
});

test("writes a non-default range into the query string", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("radio", { name: "Last 7d" }).click();

  await expect(page).toHaveURL(/[?&]range=7d/);
});
