import { faker } from "@faker-js/faker";
import {
  generateRandomBirthdate,
  generateTitle,
  randomNationality,
} from "../random";

export class Residents {
  title;
  first_name;
  last_name;
  date_of_birth;
  nationality;
  preferences;
  contact_no;
  email;
  additional_info;

  async init() {
    return this;
  }

  constructor() {
    this.title = generateTitle();
    this.first_name = faker.person.firstName();
    this.last_name = faker.person.lastName();
    this.date_of_birth = generateRandomBirthdate(1900, 2000);
    this.nationality = randomNationality();
    this.preferences = faker.string.alpha({ length: { min: 5, max: 10 } });
    this.contact_no = faker.string.numeric(10);
    this.email = faker.internet.email({ provider: "example.dev" });
    const infoCount = faker.number.int({ min: 1, max: 5 });
    this.additional_info = Array.from({ length: infoCount }, () => ({
      label: faker.string.alpha({ length: { min: 5, max: 10 } }),
      info: faker.string.alpha({ length: { min: 5, max: 10 } }),
    }));
  }

  update() {
    this.title = generateTitle();
    this.first_name = faker.person.firstName();
    this.last_name = faker.person.lastName();
    this.date_of_birth = generateRandomBirthdate(1900, 2000);
    this.nationality = randomNationality();
    this.preferences = faker.string.alpha({ length: { min: 5, max: 10 } });
    this.contact_no = faker.string.numeric(10);
    this.email = faker.internet.email({ provider: "example.dev" });
    const infoCount = faker.number.int({ min: 1, max: 5 });
    this.additional_info = Array.from({ length: infoCount }, () => ({
      label: faker.string.alpha({ length: { min: 5, max: 10 } }),
      info: faker.string.alpha({ length: { min: 5, max: 10 } }),
    }));
    return this;
  }
}
