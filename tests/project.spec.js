import { test, expect } from "@playwright/test";
import { Projects } from "./utils/mocks/project";

test.describe("Resident Page", () => {
  let accPage;

  test.beforeEach(async ({ page }) => {
    // accPage = new AccistantPage(page);
    // await accPage.login();
    // await accPage.navigateToAssets();
    // await accPage.projectsMenu.click();
  });

  test.skip("Assignee is blank", async () => {
    const resident = new Projects();
    resident.assignee = "";
    await accPage.addButton.click();
    await fillData(resident, accPage, additionalInfoCount);

    await accPage.assertRequiredFieldError();
  });
});

async function fillData(resident, accPage, count) {}
