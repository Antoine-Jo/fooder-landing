import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("renders a safe preview without an active collection form", async ({ page }) => {
  await expect(page).toHaveTitle(/Fooder/);
  await expect(page.getByText("La liste d'attente ouvrira avec la preview publique de Fooder.")).toHaveCount(2);
  await expect(page.locator('[role="img"] button')).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("has no serious automated accessibility violations", async ({ page }) => {
  for (const theme of ["light", "dark"] as const) {
    await page.evaluate((selectedTheme) => {
      document.documentElement.dataset.theme = selectedTheme;
      document.documentElement.style.colorScheme = selectedTheme;
    }, theme);
    await page.waitForTimeout(300);
    const results = await new AxeBuilder({ page }).exclude(".feature-index").analyze();
    const seriousViolations = results.violations.filter((violation) =>
      violation.impact === "critical" || violation.impact === "serious"
    );
    expect(seriousViolations, `${theme} theme violations`).toEqual([]);
  }
});

test("persists dark theme and remains free of horizontal overflow", async ({ page }) => {
  await page.getByRole("button", { name: "Activer le thème sombre" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");

  const hasOverflow = await page.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth
  );
  expect(hasOverflow).toBe(false);
});

test("legal pages remain reachable", async ({ page }) => {
  await page.getByRole("link", { name: "Mentions légales" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Mentions légales");
  await expect(page.getByText(/Ce prototype public reste volontairement non indexé/)).toBeVisible();
});

test("matches the light and dark visual baselines", async ({ page }) => {
  for (const theme of ["light", "dark"] as const) {
    await page.evaluate((selectedTheme) => {
      document.documentElement.dataset.theme = selectedTheme;
      document.documentElement.style.colorScheme = selectedTheme;
    }, theme);
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot(`landing-${theme}.png`, {
      animations: "disabled",
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  }
});
