const mainRichList = document.getElementById('main') as HTMLElement;
const addRichBtn = document.getElementById('add') as HTMLButtonElement;
const sortRichBtn = document.getElementById('sort') as HTMLButtonElement;
const doubleRichBtn = document.getElementById('double') as HTMLButtonElement;
const millionaireRichBtn = document.getElementById(
  'millionaires'
) as HTMLButtonElement;
const calculateWealthBtn = document.getElementById(
  'calculate-wealth'
) as HTMLButtonElement;
const clearRichBtn = document.getElementById('clear') as HTMLButtonElement;

type richPeople = {
  thumbnail: string;
  name: string;
  money: number;
};

let richPeople: richPeople[] = [];
let isAscending: boolean = true;

// Fetch user
function getUserData() {
  const endpoint = 'https://randomuser.me/api';
  fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const results = data.results[0];

      const newRich: richPeople = {
        thumbnail: results.picture.thumbnail,
        name: `${results.name.first} ${results.name.last}`,
        money: Math.floor(Math.random() * 3000000000),
      };

      addRich(newRich);
    })
    .catch((error) => {
      throw new Error(error);
    });
}

// Add user to array
function addRich(newRich: richPeople) {
  richPeople.push(newRich);

  updateRichUI();
}

// Update user list to DOM
function updateRichUI() {
  mainRichList.innerHTML = '';
  mainRichList.innerHTML = `<h2><strong>이름</strong>₩`;

  richPeople.forEach((rich, index) => {
    const divEl = document.createElement('div') as HTMLDivElement;
    divEl.classList.add('person');
    divEl.innerHTML = `
      <img src=${rich.thumbnail} alt=rich${index}</img>
      <strong>${rich.name}</strong>${formatMoney(rich.money)}
    `;

    mainRichList.appendChild(divEl);
  });
}

// Sort rich people ascending or descending
function sortRichPeople() {
  // const icon = document.querySelector('.sort-icon') as HTMLElement;

  if (isAscending) {
    isAscending = false;
    sortRichBtn.innerHTML = `내림차순 정렬하기<i class="sort-icon">⬇</i>`;
    // icon.innerHTML = '<i class="sort-icon">⬆</i>';
    richPeople.sort((a, b) => a.money - b.money);
  } else {
    isAscending = true;
    sortRichBtn.innerHTML = `오름차순 정렬하기<i class="sort-icon">⬆</i>`;
    // icon.innerHTML = '<i class="sort-icon">⬇</i>';
    richPeople.sort((a, b) => b.money - a.money);
  }

  // updateSortIcon();
  updateRichUI();
}

// function updateSortIcon(){
//   const icon = document.querySelector('sort-icon') as HTMLElement;

//   if(isAscending){
//     icon.innerHTML = '<i class="sort-icon">⬇</i>';
//   }else{
//     icon.innerHTML = '<i class="sort-icon">⬆</i>';
//   }
// }

// Double rich people's money
function doubleMoney() {
  const doubledMoney = richPeople.map((rich) => ({
    ...rich,
    money: rich.money * 2,
  }));
  richPeople = doubledMoney;

  updateRichUI();
}

// Show only millionaires (1,200,000,000>=)
function showMillionaires() {
  richPeople = richPeople.filter((rich) => rich.money >= 1200000000);

  updateRichUI();
}

// Calculate wealth to DOM
function calculateWealth() {
  const totalWealth = richPeople.reduce((acc, rich) => (acc += rich.money), 0);
  const divEl = document.createElement('div') as HTMLDivElement;
  divEl.classList.add('total');
  divEl.innerHTML = `<strong>합계 💰:</strong>${formatMoney(totalWealth)}`;

  mainRichList.appendChild(divEl);
}

// Clear rich people list
function clearRichPeople() {
  richPeople = [];

  updateRichUI();
}

// Event listeners
addRichBtn.addEventListener('click', getUserData);
sortRichBtn.addEventListener('click', sortRichPeople);
doubleRichBtn.addEventListener('click', doubleMoney);
millionaireRichBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
clearRichBtn.addEventListener('click', clearRichPeople);

// Utils
// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number: number) {
  return '₩' + String(Math.floor(number)).replace(/(.)(?=(\d{3})+$)/g, '$1,');
}

getUserData();
getUserData();
getUserData();
