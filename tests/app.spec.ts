import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Todo/);
});

test("add button", async ({ page }) => {
  await page.goto("/");

  // Add new todo.
  await page.locator("#todo-input-text").fill("First task");
  await page.locator(".add-button").click();

  // check if todo exist in ul
  expect(await page.locator("li").textContent()).toBe("First task");
});

test("todo count", async ({ page }) => {
  await page.goto("/");

  // Add new todo.
  await page.locator("#todo-input-text").fill("First task");
  await page.locator(".add-button").click();
  await page.locator("#todo-input-text").fill("Second task");
  await page.locator(".add-button").click();

  // check if there are 2 todos
  expect((await page.locator("li").all()).length).toBe(2);
});

test("storage", async ({ page }) => {
  await page.goto("/");

  // Add new todo.
  await page.locator("#todo-input-text").fill("First task");
  await page.locator(".add-button").click();
  await page.locator("#todo-input-text").fill("Second task");
  await page.locator(".add-button").click();

  await page.reload();

  // check if there are 2 todos
  expect((await page.locator("li").all()).length).toBe(2);
});
