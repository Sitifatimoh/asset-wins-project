import { faker } from "@faker-js/faker";

export function generatePropertyName() {
  const types = [
    "Villa",
    "Heights",
    "Residences",
    "Apartments",
    "Towers",
    "Estate",
    "Lofts",
  ];
  const adjectives = [
    "Sunny",
    "Grand",
    "Royal",
    "Green",
    "Golden",
    "Silver",
    "Crystal",
    "Emerald",
    "Serene",
    "Majestic",
  ];
  const useAdjective = faker.datatype.boolean();
  const adjective = useAdjective ? faker.helpers.arrayElement(adjectives) : "";
  const owner = faker.person.lastName();
  const type = faker.helpers.arrayElement(types);
  const suffix = faker.location.buildingNumber();

  return `${adjective ? adjective + " " : ""}${owner} ${type} ${suffix}`;
}

export function generateTitle() {
  const titleOption = ["Mrs", "Mr", "Ms"];

  const title = faker.helpers.arrayElement(titleOption).toString();
  return title;
}

// Generates a random birthdate object with day, month, and year as strings
export function generateRandomBirthdate(minYear = 1900, maxYear = 2000) {
  const randomBirthdate = faker.date.birthdate({
    mode: "year",
    min: minYear,
    max: maxYear,
  });
  const day = randomBirthdate.getDate().toString();
  const month = randomBirthdate.toLocaleString("default", { month: "long" }); // e.g., "January"
  const year = randomBirthdate.getFullYear().toString(); // e.g., "1990"
  return { day, month, year };
}

export function randomNationality() {
  const nationalities = [
    "American",
    "British",
    "Canadian",
    "Australian",
    "Indian",
    "Chinese",
    "Japanese",
    "German",
    "French",
    "Spanish",
    "Italian",
    "Brazilian",
    "Mexican",
    "Russian",
    "South African",
    "Thai",
    "Turkish",
    "Egyptian",
  ];
  return faker.helpers.arrayElement(nationalities);
}

// Utility function to generate a random invalid email
export function generateInvalidEmail() {
  const invalidEmails = [
    "plainaddress",
    "@missingusername.com",
    "username@.com",
    "username@domain",
    "username@domain,com",
    "username@domain..com",
    "username@domain@domain.com",
    ".username@yahoo.com",
    "username@yahoo.com.",
    "username@yahoo..com",
    "username@-domain.com",
    "username@domain-.com",
    "username@domain_.com",
    "username@domain#domain.com",
    "username@domain..com",
  ];
  return invalidEmails[Math.floor(Math.random() * invalidEmails.length)];
}
