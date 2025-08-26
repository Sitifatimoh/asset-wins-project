import { test, expect } from "@playwright/test";
import { AccistantPage } from "./utils/acc-page";
import { generateInvalidEmail } from "./utils/random";
import { Residents } from "./utils/mocks/resident";

test.describe("Resident Page", () => {
  let accPage;
  let additionalInfoCount = 0;
  let createdResident = null;
  let testPage = null;
  //const resident = new Residents();

  test.beforeEach(async ({ page }) => {
    accPage = new AccistantPage(page);
    await accPage.login();
    await accPage.navigateToAssets();
    await accPage.residentsMenu.click();
    await accPage.assertResidentsHeadingVisible();
  });

  test("Title is blank", async () => {
    const resident = new Residents();
    resident.title = "";
    await accPage.addButton.click();
    await fillData(resident, accPage, additionalInfoCount);
    await accPage.doneButton.click();
    await accPage.assertRequiredFieldError();
  });

  test("First name is blank", async () => {
    const resident = new Residents();
    resident.first_name = "";
    await accPage.addButton.click();
    await fillData(resident, accPage, additionalInfoCount);
    await accPage.doneButton.click();
    await accPage.assertRequiredFieldError();
  });

  test("Last name is blank", async () => {
    const resident = new Residents();
    resident.last_name = "";
    await accPage.addButton.click();
    await fillData(resident, accPage, additionalInfoCount);
    await accPage.doneButton.click();
    await accPage.assertRequiredFieldError();
  });

  test("Email is blank", async () => {
    const resident = new Residents();
    resident.email = "";
    await accPage.addButton.click();
    await fillData(resident, accPage, additionalInfoCount);
    await accPage.doneButton.click();
    await accPage.assertRequiredFieldError();
  });

  test("Email is invalid", async () => {
    const resident = new Residents();
    resident.email = generateInvalidEmail();
    await accPage.addButton.click();
    await fillData(resident, accPage, additionalInfoCount);
    await accPage.doneButton.click();
    await accPage.assertInvalidEmailError();
  });

  test("Create resident record", async ({ page }) => {
    const resident = new Residents();
    createdResident = resident;
    //testPage = page;
    await createNewResident(resident, accPage, additionalInfoCount);
    // await accPage.addButton.click();
    // await fillData(resident, accPage, additionalInfoCount);
    // await accPage.doneButton.click();
    // await accPage.assertFormSubmittedSuccessfully();
  });

  test("View created resident record", async ({ page }) => {
    const resident = new Residents();
    createdResident = resident;
    await createNewResident(resident, accPage, additionalInfoCount);

    await accPage.fillSearchInput(
      `${resident.first_name} ${resident.last_name}`
    );
    await accPage.selectRecordFromSearch(resident.first_name);
    await assertResidentDataVisible(accPage, resident);
    await accPage.navigateBackToResidentsList();
  });

  test("Update resident record", async ({ page }) => {
    const resident = new Residents();
    createdResident = resident;
    await createNewResident(resident, accPage, additionalInfoCount);
    additionalInfoCount = resident.additional_info.length;

    await accPage.fillSearchInput(
      `${resident.first_name} ${resident.last_name}`
    );
    await accPage.selectRecordFromSearch(resident.first_name);
    await page.getByRole("button", { name: "Edit" }).click();

    resident.update();
    await fillData(resident, accPage, additionalInfoCount);
    await accPage.saveChangesButton.click();
    await accPage.assertFormSubmittedSuccessfully();
    await accPage.navigateBackToResidentsList();
  });

  test("Delete resident record", async ({ page }) => {
    const resident = new Residents();
    // createdResident = resident;
    createdResident = null;
    console.log("additionalInfoCount=", additionalInfoCount);
    await createNewResident(resident, accPage, additionalInfoCount);

    await accPage.fillSearchInput(
      `${resident.first_name} ${resident.last_name}`
    );
    await accPage.selectRecordFromSearch(resident.first_name);
    await accPage.deleteButton.click();
    //await accPage.confirmButton.click();
    await accPage.assertDeleteSuccessfully();
  });

  test.afterEach(async () => {
    console.log("after", createdResident);
    if (createdResident && accPage) {
      await accPage.fillSearchInput(
        `${createdResident.first_name} ${createdResident.last_name}`
      );
      await accPage.assertResidentCoverPhotoLinkIsVisible(
        createdResident.first_name
      );
      await accPage.actionButton.click();
      await accPage.deleteActionButton.click();
      await accPage.confirmButton.click();
      // await accPage.assertDeleteSuccessfully();
      createdResident = null;
    }
  });
});

async function createNewResident(resident, accPage, count) {
  await accPage.addButton.click();
  await fillData(resident, accPage, count);
  await accPage.doneButton.click();
  await accPage.assertFormSubmittedSuccessfully();
}

async function fillData(resident, accPage, count) {
  await accPage;
  if (resident.title) {
    await accPage.selectTitle(resident.title);
  }
  await accPage.fillFirstName(resident.first_name);
  await accPage.fillLastName(resident.last_name);
  await accPage.selectDateOfBirth(resident.date_of_birth);
  await accPage.selectNationality(resident.nationality);
  await accPage.fillPreferences(resident.preferences);
  await accPage.fillContactNo(resident.contact_no);
  await accPage.fillEmail(resident.email);

  if (count === 0) {
    for (let i = 1; i < resident.additional_info.length; i++) {
      await accPage.addMoreButton.click();
    }
  } else {
    if (resident.additional_info.length > count) {
      for (let i = 0; i < resident.additional_info.length - count; i++) {
        await accPage.addMoreButton.click();
      }
    } else if (resident.additional_info.length < count) {
      for (let i = 0; i < count - resident.additional_info.length; i++) {
        await accPage.removeButton.nth(0).click();
      }
    }
  }

  for (let i = 0; i < resident.additional_info.length; i++) {
    await accPage.fillLabelInput(i, resident.additional_info[i].label);
    await accPage.fillInfoInput(i, resident.additional_info[i].info);
  }
}

async function assertResidentDataVisible(accPage, resident) {
  await expect(accPage.main).toContainText(
    `${resident.first_name} ${resident.last_name}`
  );
  await expect(accPage.main).toContainText(resident.preferences);
  await expect(accPage.main).toContainText(resident.nationality);
  const dob = resident.date_of_birth;
  await expect(accPage.main).toContainText(
    `${dob.month} ${dob.day.padStart(2, "0")}, ${dob.year}`
  );
  await expect(accPage.main).toContainText(resident.email);
  await expect(accPage.main).toContainText(resident.contact_no);
  for (const info of resident.additional_info) {
    await expect(accPage.main).toContainText(info.label);
    await expect(accPage.main).toContainText(info.info);
  }
}
