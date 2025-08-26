import { expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export class AccistantPage {
  page;
  main;
  residentsMenu;
  projectsMenu;
  addButton;
  doneButton;
  addMoreButton;
  deleteButton;
  confirmButton;
  removeButton;
  saveChangesButton;
  actionButton;
  deleteActionButton;
  searchInput;
  dateOfBirthInput;
  yearsDropdown;
  selectYear;
  selectMonth;
  selectDay;
  okButton;
  titleDropdown;
  nationalityDropdown;
  assigneeDropdown;
  firstNameInput;
  lastNameInput;
  emailInput;
  preferencesInput;
  contactNoInput;
  labelInput;
  infoInput;

  constructor(page) {
    this.page = page;
    this.main = page.locator("main");
    this.residentsMenu = page.getByRole("link", { name: "Residents" });
    this.projectsMenu = page.getByRole("link", { name: "Projects" });
    this.addButton = page.getByRole("button", { name: "Add" });
    this.doneButton = page.getByRole("button", { name: "Done" });
    this.okButton = page.getByRole("button", { name: "Ok" });
    this.addMoreButton = page.getByRole("button", { name: "Add more" });
    this.deleteButton = page.getByRole("button", { name: "Delete Profile" });
    this.confirmButton = page.getByRole("button", { name: "Confirm" });
    this.removeButton = page.getByRole("button", { name: "Remove" });
    this.saveChangesButton = page.getByRole("button", { name: "Save Changes" });
    this.actionButton = page
      .getByRole("button", { name: "actions-icon" })
      .first();
    this.deleteActionButton = page.getByRole("button", {
      name: "delete-icon Delete",
    });

    this.searchInput = page.getByRole("searchbox", { name: "Search" });
    this.titleDropdown = page
      .locator(".ring-none.flex.h-10.w-full.items-center")
      .nth(0);
    this.firstNameInput = page.getByRole("textbox", { name: "First Name" });
    this.lastNameInput = page.getByRole("textbox", { name: "Last Name" });
    this.dateOfBirthInput = page.locator(".relative.mt-2.w-full");
    this.selectYear = page.locator('select[name="years"]');
    this.selectMonth = page.getByLabel("Month:");
    this.selectDay = page.locator(
      'button[role="gridcell"]:not(.day-outside):not([disabled])'
    );
    this.nationalityDropdown = page
      .locator(".ring-none.flex.h-10.w-full.items-center")
      .nth(1);
    this.assigneeDropdown = page
      .locator(".ring-none.flex.h-10.w-full.items-center.justify-between")
      .nth(1);
    this.preferencesInput = page.getByRole("textbox", { name: "Preferences" });
    this.contactNoInput = page.getByRole("textbox", { name: "Contact No." });
    this.emailInput = page.getByRole("textbox", { name: "Email" });
    // this.labelInput = page.locator(`#label-${index}`);
    // If you need to access labelInput with a specific index, use a method:
    this.labelInput = page.locator(`#name-`);
    this.infoInput = page.locator("#value-");
  }

  async login() {
    await this.page.goto(process.env.BASE_URL + "/login");
    await this.page
      .getByRole("textbox", { name: "Email Address" })
      .fill(process.env.USERNAME);
    await this.page
      .getByRole("textbox", { name: "Password" })
      .fill(process.env.PASSWORD);
    await this.page.getByRole("button", { name: "Log in" }).click();
  }

  async navigateToAssets() {
    await this.page
      .getByRole("navigation")
      .getByRole("link", { name: process.env.ASSETSNAME })
      .click();
  }

  async navigateToMaintenanceHistory() {
    await this.page.getByRole("link", { name: "Maintenance History" }).click();
    await expect(
      this.page.getByRole("heading", { name: "Showing Maintenance Documents" })
    ).toBeVisible();
  }

  async navigateBackToResidentsList() {
    await this.page.getByRole("link", { name: "Go back to Residents" }).click();
    await this.assertResidentsHeadingVisible();
  }

  async selectRecordFromSearch(searchText) {
    await this.page
      .getByRole("link", { name: `${searchText}-cover-photo` })
      .click();
  }
  async selectTitle(titleToSelect) {
    await this.titleDropdown.click();
    await this.page
      .getByRole("option", { name: titleToSelect, exact: true })
      .click();
    //await expect(this.titleDropdown).toContainText(titleToSelect);
  }

  async selectDateOfBirth(dateOfBirthInput) {
    await this.dateOfBirthInput.click();
    const { day, month, year } = dateOfBirthInput;
    await this.dateOfBirthInput.click();

    //select year
    await this.selectYear.click();
    await this.selectYear.focus();
    await this.page.keyboard.type(year);
    await this.page.keyboard.press("Enter");
    // select month and day
    await this.selectMonth.selectOption(month);
    await this.selectDay.filter({ hasText: new RegExp(`^${day}$`) }).click();
    await this.okButton.click();

    //const dobValue = await this.dateOfBirthInput.textContent();
    //await expect(this.dateOfBirthInput).toHaveText(`${day} ${month} ${year}`);
  }

  async selectNationality(nationality) {
    await this.nationalityDropdown.click();
    await this.page.getByRole("option", { name: nationality }).click();
  }

  async selectAssignee(assignee) {
    await this.assigneeDropdown.click();
    await this.page.getByRole("option", { name: assignee }).click();
  }
  async fillSearchInput(searchText) {
    await this.searchInput.fill(searchText);
  }

  async fillFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }
  async fillPreferences(preferences) {
    await this.preferencesInput.fill(preferences);
    // await expect(
    //   this.page.getByRole("textbox", { name: "Preferences" })
    // ).toHaveValue(preferences);
  }

  async fillContactNo(contactNo) {
    // const contactNo = faker.string.numeric(10);
    await this.contactNoInput.fill(contactNo);
    // await expect(
    //   this.page.getByRole("textbox", { name: "Contact No." })
    // ).toHaveValue(contactNo);
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }
  async fillLabel(label) {
    await this.labelInput.fill(label);
  }
  async fillInfo(info) {
    await this.infoInput.fill(info);
  }
  async fillLabelInput(index, label) {
    const labelInput = this.page.locator(`#name-${index}`);
    await labelInput.fill(label);
  }
  async fillInfoInput(index, info) {
    const infoInput = this.page.locator(`#value-${index}`);
    await infoInput.fill(info);
  }

  async assertResidentsHeadingVisible() {
    await expect(
      this.page.getByRole("heading", { name: "Resident Owners" })
    ).toBeVisible();
  }

  async assertFormSubmittedSuccessfully() {
    await expect(
      this.page.getByText("Form submitted successfully!", { exact: true })
    ).toBeVisible();
  }

  async assertRequiredFieldError() {
    await expect(this.page.getByText("This field is required")).toBeVisible();
  }

  async assertInvalidEmailError() {
    await expect(this.page.getByText("Email is not valid")).toBeVisible();
  }

  async assertDeleteSuccessfully() {
    await expect(
      this.page.getByText("Successfully deleted!", { exact: true })
    ).toBeVisible();
  }

  async assertResidentCoverPhotoLinkIsVisible(fullName) {
    await expect(
      this.page.getByRole("link", {
        name: `${fullName}-cover-photo`,
      })
    ).toBeVisible();
  }
}
