const topCurrency = document.getElementById('top-select') as HTMLSelectElement;
const topAmount = document.getElementById('top-input') as HTMLInputElement;
const bottomCurrency = document.getElementById(
  'bottom-select'
) as HTMLSelectElement;
const bottomAmount = document.getElementById(
  'bottom-input'
) as HTMLInputElement;

const currencyRate = document.getElementById(
  'currency-desc'
) as HTMLParagraphElement;

const swapBtn = document.getElementById('swap') as HTMLButtonElement;

interface objectKeyValue {
  [index: string]: number;
}

let currencyData: {
  base: string;
  date: string;
  rates: objectKeyValue;
};
let topCurrencyVal: string;
let bottomCurrencyVal: string;

// Set current selected currency
function setCurrentCurrency() {
  topCurrencyVal = topCurrency.value;
  bottomCurrencyVal = bottomCurrency.value;
}

// Update entire currency UI
function updateCurrencyUI() {
  const rate: string = currencyData.rates[bottomCurrencyVal].toFixed(4);
  currencyRate.innerText = `1 ${topCurrencyVal} = ${rate} ${bottomCurrencyVal}`;
  bottomAmount.value = (+topAmount.value * +rate).toFixed(2);
}

// Fetch currency rate data
async function getCurrencyRate() {
  setCurrentCurrency();

  const endpoint: string = `https://api.exchangeratesapi.io/latest?base=${topCurrencyVal}`;
  currencyData = await (await fetch(endpoint)).json();
  console.log(currencyData);

  updateCurrencyUI();
}

// Calculate currency rate
function calculateCurrencyRate() {
  setCurrentCurrency();
  updateCurrencyUI();
}

getCurrencyRate();

// Event listeners
topCurrency.addEventListener('change', getCurrencyRate);
topAmount.addEventListener('input', calculateCurrencyRate);
bottomCurrency.addEventListener('change', calculateCurrencyRate);
bottomAmount.addEventListener('input', calculateCurrencyRate);
swapBtn.addEventListener('click', () => {
  const temp: string = topCurrency.value;
  topCurrency.value = bottomCurrency.value;
  bottomCurrency.value = temp;
  getCurrencyRate();
});

/* Currency API */
// https://exchangeratesapi.io/
