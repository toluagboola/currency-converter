const number = document.getElementById("number");
const currency = document.querySelectorAll(".currency");
const output = document.getElementById("output");

fetchCurrencies();

async function fetchCurrencies() {
	const res = await fetch(
		"https://free.currconv.com/api/v7/currencies?apiKey=c18676c72ff0fe4557d1"
	);

	if (!res.ok) {
		throw Error(response.statusText);
	}

	const result = await res.json();
	displayCurrencies(result);
}

function displayCurrencies(data) {
	const currencies = Object.entries(data);
	const values = Object.values(currencies[0][1]);
	console.log(values);

	for (let i = 0; i < values.length; i++) {
		currency[0].innerHTML += `<option value="${values[i].id}">${values[i].id} - ${values[i].currencyName}</option>`;
		currency[1].innerHTML += `<option value="${values[i].id}">${values[i].id} - ${values[i].currencyName}</option>`;
	}
}

function checkCurrencies() {
	let currency1 = currency[0].value;
	let currency2 = currency[1].value;

	let num = number.value;

	if (currency1 !== currency2) {
		convert(currency1, currency2, num);
	} else {
		alert("Please choose different currencies");
	}
}

async function convert(currency1, currency2, num) {
	const res = await fetch(
		`https://free.currconv.com/api/v7/convert?apiKey=c18676c72ff0fe4557d1&q=${currency1}_${currency2}&compact=ultra`
	);
	const result = await res.json();

	const rate = Object.values(result)[0];
	let fromRate = num;
	let finalAmount = num * rate;

	document.querySelector(
		".output"
	).innerHTML = `<strong>${currency1}</strong> ${num} = <strong>${currency2}</strong> ${finalAmount.toLocaleString()}`;
}
