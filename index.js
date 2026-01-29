/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;


function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function getRandomRate(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeFreelancer() {
  let name = NAMES[getRandomIndex(NAMES)];
  let occupation = OCCUPATIONS[getRandomIndex(OCCUPATIONS)];
  let rate = getRandomRate(PRICE_RANGE.min, PRICE_RANGE.max);

  return {
    name: name,
    occupation: occupation,
    rate: rate,
  };
}

function getAverageRate(list) {
  if (list.length === 0) return 0;

  let total = 0;

  for (let i = 0; i < list.length; i++) {
    total += list[i].rate;
  }

  return total / list.length;
}


function FreelancerRow(freelancer) {
  const tr = document.createElement("tr");

  const nameTd = document.createElement("td");
  nameTd.textContent = freelancer.name;

  const occupationTd = document.createElement("td");
  occupationTd.textContent = freelancer.occupation;

  const rateTd = document.createElement("td");
  rateTd.textContent = "$" + freelancer.rate;

  tr.appendChild(nameTd);
  tr.appendChild(occupationTd);
  tr.appendChild(rateTd);

  return tr;
}

function FreelancerRows(list) {
  const tbody = document.createElement("tbody");

  for (let i = 0; i < list.length; i++) {
    tbody.appendChild(FreelancerRow(list[i]));
  }

  return tbody;
}

function AverageRateDisplay(avg) {
  const p = document.createElement("p");
  p.textContent = "The average hourly rate is $" + avg.toFixed(2);
  return p;
}


function render() {
  const app = document.querySelector("#app");
  app.innerHTML = "";


  const h1 = document.createElement("h1");
  h1.textContent = "Freelancer Forum";
  app.appendChild(h1);

  app.appendChild(AverageRateDisplay(averageRate));


  const table = document.createElement("table");

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const nameTh = document.createElement("th");
  nameTh.textContent = "Name";

  const occupationTh = document.createElement("th");
  occupationTh.textContent = "Occupation";

  const rateTh = document.createElement("th");
  rateTh.textContent = "Rate";

  headerRow.appendChild(nameTh);
  headerRow.appendChild(occupationTh);
  headerRow.appendChild(rateTh);
  thead.appendChild(headerRow);
  table.appendChild(thead);

  table.appendChild(FreelancerRows(freelancers));

  app.appendChild(table);
}

function init() {
  freelancers = [];

  for (let i = 0; i < NUM_FREELANCERS; i++) {
    freelancers.push(makeFreelancer());
  }
  averageRate = getAverageRate(freelancers);

  render();
}

init();
