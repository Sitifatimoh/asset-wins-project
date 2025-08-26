import { faker } from "@faker-js/faker";

export class Projects {
  assignee;
  budget;
  currency;
  start_date;
  due_date;
  project_name;
  project_desc;

  async init() {
    return this;
  }

  constructor() {
    this.assignee = faker.person.fullName();
    this.budget = faker.number.int({ min: 1000, max: 100000 });
    this.currency = faker.finance.currencyCode();
    this.start_date = faker.date.past(1);
    this.due_date = faker.date.future(1);
    this.project_name = faker.company.name();
    this.project_desc = faker.lorem.sentence();
  }

  update() {
    this.assignee = faker.person.fullName();
    this.budget = faker.number.int({ min: 1000, max: 100000 });
    this.currency = faker.finance.currencyCode();
    this.start_date = faker.date.past(1);
    this.due_date = faker.date.future(1);
    this.project_name = faker.company.name();
    this.project_desc = faker.lorem.sentence();
    return this;
  }
}
