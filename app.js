async function getExchangeRate(fromCurrency, toCurrency) {
  const url = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;
  try {
    let res = await axios.get(url);
    const rate = res.data.rates[toCurrency];
    return rate;
  } catch (err) {
    console.error("Error fetching exchange rate");
    alert("Failed to fetch exchange rates. Please try again later.");
  }
}

const button = document.getElementById("convert");
const result = document.getElementById("result");

button.addEventListener("click", async () => {
  const amount = document.getElementById("amount").value;
  const fromCurrency = document.getElementById("fromCurrency").value;
  const toCurrency = document.getElementById("toCurrency").value;

  if (amount === "" || isNaN(amount)) {
    alert("Please enter a valid amount.");
    return;
  }

  const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
  if (exchangeRate) {
    const convertedAmount = (amount * exchangeRate).toFixed(2);
    result.innerText = `Converted Amount = ${convertedAmount} ${toCurrency}`;
  }
});
