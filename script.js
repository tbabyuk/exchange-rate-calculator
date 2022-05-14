console.log("Hello world");


//get required elements from the DOM

const currency1 = document.getElementById("currency1");
const amount1 = document.getElementById("amount1");
const currency2 = document.getElementById("currency2");
const amount2 = document.getElementById("amount2");

const swapBtn = document.getElementById("swap-btn")
const rateOutput = document.getElementById("rate")


//Fetch exchange rates and update the DOM


function getRate() {
    const curr1 = currency1.value;
    const curr2 = currency2.value;

    fetch(`https://v6.exchangerate-api.com/v6/8fd65efd10afa06fc0f8e909/latest/${curr1}`)
        .then(res => res.json())
        .then(data => {
            const rate = data.conversion_rates[curr2];
            rateOutput.innerText = `1 ${curr1} = ${rate} ${curr2}`;
            amount2.value = (amount1.value * rate).toFixed(2);
        })

}


//EVENT LISTENERS: call the getRate function every time any of these events are triggered
currency1.addEventListener("change", getRate);
amount1.addEventListener("input", getRate);
currency2.addEventListener("change", getRate);
amount2.addEventListener("input", getRate);


swapBtn.addEventListener("click", () => {
    const temp = currency1.value;
    currency1.value = currency2.value;
    currency2.value = temp;
    getRate();
})