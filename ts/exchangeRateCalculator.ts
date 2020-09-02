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

async function getCurrencyRate() {
  const topCurrencyVal: string = topCurrency.value;
  const bottomCurrencyVal: string = bottomCurrency.value;

  const endpoint: string = `https://api.exchangeratesapi.io/latest?base=${topCurrencyVal}`;
  const data = await (await fetch(endpoint)).json();
  // console.log(data);

  const rate: string = Number(data.rates[bottomCurrencyVal]).toFixed(4);

  currencyRate.innerText = `1 ${topCurrencyVal} = ${rate} ${bottomCurrencyVal}`;

  bottomAmount.value = (+topAmount.value * +rate).toFixed(2);
}

getCurrencyRate();

topCurrency.addEventListener('change', getCurrencyRate);
topAmount.addEventListener('input', getCurrencyRate);
bottomCurrency.addEventListener('change', getCurrencyRate);
bottomAmount.addEventListener('input', getCurrencyRate);

swapBtn.addEventListener('click', () => {
  const temp: string = topCurrency.value;
  topCurrency.value = bottomCurrency.value;
  bottomCurrency.value = temp;
  getCurrencyRate();
});

/* Currency API */
// https://exchangeratesapi.io/
