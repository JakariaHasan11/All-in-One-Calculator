const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault(); 
        const sectionId = link.dataset.section;
        if (!sectionId) return;
        sections.forEach(sec => sec.classList.remove('active'));
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        } else {
            console.error(`Section with ID '${sectionId}' not found.`);
        }
    });
});

let display = document.getElementById('display');
let currentInput = '';
function showError(resultElementId, message) {
    const resultElement = document.getElementById(resultElementId);
    if (!resultElement) return console.error(`Result element with ID ${resultElementId} not found.`);
    const originalContent = resultElement.innerHTML;
    const originalColor = resultElement.style.color;
    resultElement.style.color = 'red';
    resultElement.innerHTML = `<span style="font-weight: bold;">Error: ${message}</span>`;
    console.error(message);
    setTimeout(() => {
        resultElement.innerHTML = originalContent;
        resultElement.style.color = originalColor;
    }, 3000);
}


function appendValue(value) {
    currentInput += value;
    display.value = currentInput;
}

function clearDisplay() {
    currentInput = '';
    display.value = '';
}

function calculateResult() {
    try {
        const expression = currentInput.replace(/x/g, '*').replace(/÷/g, '/');
        if (/[^0-9\+\-\*\/\.\(\)]/.test(expression)) {
            throw new Error("Invalid characters in expression.");
        }
        currentInput = eval(expression);
        display.value = currentInput;
    } catch (error) {
        display.value = 'Error';
    }
}

function calculateAge() {
    const birthdate = document.getElementById("birthdate").value;
    const resultId = "ageResult";
    if (!birthdate) return showError(resultId, "Enter birthdate");
    const b = new Date(birthdate);
    const now = new Date();
    let years = now.getFullYear() - b.getFullYear();
    let months = now.getMonth() - b.getMonth();
    let days = now.getDate() - b.getDate();
    if (days < 0) {
        months--;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    document.getElementById(resultId).innerText = `You are ${years} years, ${months} months, ${days} days old.`;
}

function calculateTime() {
    const dt1Value = document.getElementById("dateTime1").value;
    const dt2Value = document.getElementById("dateTime2").value;
    const resultId = "timeResult";
    if (!dt1Value || !dt2Value) return showError(resultId, "Enter both dates and times");
    const dt1 = new Date(dt1Value);
    const dt2 = new Date(dt2Value);
    let diff = Math.abs(dt1 - dt2);
    const days = Math.floor(diff / (1000*60*60*24));
    diff -= days * (1000*60*60*24);
    const hours = Math.floor(diff / (1000*60*60));
    diff -= hours * (1000*60*60);
    const minutes = Math.floor(diff / (1000*60));
    diff -= minutes * (1000*60);
    const seconds = Math.floor(diff / 1000);
    document.getElementById(resultId).innerText = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds.`;
}

let moneyBills = [];

function addBill() {
    const value = parseInt(document.getElementById("billValue").value);
    const count = parseInt(document.getElementById("billCount").value);
    const resultId = "moneyResult";
    if (isNaN(value) || isNaN(count) || value <= 0 || count <= 0) {
        return showError(resultId, "Enter valid, positive bill value and count");
    }
    moneyBills.push({value, count});
    let outputStr = "Bills:\n";
    let totalValue = 0;
    moneyBills.forEach(b => {
        const billTotal = b.count * b.value;
        outputStr += `${b.count} × ${b.value} = ${billTotal}\n`;
         totalValue += billTotal;
    });
    outputStr += "-------------------\n";
    outputStr += `Total Value: ${totalValue}\n`;
    document.getElementById(resultId).innerText = outputStr;
    document.getElementById("billValue").value = '';
    document.getElementById("billCount").value = '';
}

function calculateBMI() {
    const w = parseFloat(document.getElementById("weightInput").value);
    const h = parseFloat(document.getElementById("heightInput").value)/100;
    const resultId = "bmiResult";
    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) return showError(resultId, "Enter valid weight and height");
    const bmi = w/(h*h);
    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obesity';
    document.getElementById(resultId).innerText = `BMI: ${bmi.toFixed(2)} (${category})`;
}

function convertTemp() {
    const t = parseFloat(document.getElementById("tempInput").value);
    const unit = document.getElementById("tempUnit").value;
    const resultId = "tempResult";
    if (isNaN(t)) return showError(resultId, "Enter a valid temperature");
    let res = unit==='C' ? t*9/5+32 : (t-32)*5/9;
    document.getElementById(resultId).innerText = unit==='C' ? `${t}°C = ${res.toFixed(2)}°F` : `${t}°F = ${res.toFixed(2)}°C`;
}

function calculateLoan() {
    const P = parseFloat(document.getElementById("loanAmount").value);
    const R = parseFloat(document.getElementById("loanRate").value)/100;
    const T = parseFloat(document.getElementById("loanYears").value);
    const resultId = "loanResult";
    if (isNaN(P) || isNaN(R) || isNaN(T)) return showError(resultId, "Enter valid Loan Amount, Rate, and Years");
    const interest = P * R * T;
    const total = P + interest;
    document.getElementById(resultId).innerText = `Simple Interest: ${interest.toFixed(2)}, Total Payable: ${total.toFixed(2)}`;
}

function calculateDiscount() {
    const price = parseFloat(document.getElementById("priceInput").value);
    const disc = parseFloat(document.getElementById("discountInput").value)/100;
    const resultId = "discountResult";
    if (isNaN(price) || isNaN(disc) || price < 0 || disc < 0) return showError(resultId, "Enter valid price and discount values");
    const discountAmount = price * disc;
    const finalPrice = price - discountAmount;
    document.getElementById(resultId).innerText = `Discount: ${discountAmount.toFixed(2)}, Final Price: ${finalPrice.toFixed(2)}`;
}

function calculateGST() {
    const price = parseFloat(document.getElementById("gstPrice").value);
    const rate = parseFloat(document.getElementById("gstRate").value)/100;
    const resultId = "gstResult";
    if (isNaN(price) || isNaN(rate) || price < 0 || rate < 0) return showError(resultId, "Enter valid price and tax rate");
    const taxAmount = price * rate;
    const total = price + taxAmount;
    document.getElementById(resultId).innerText = `Tax Amount: ${taxAmount.toFixed(2)}, Total Price: ${total.toFixed(2)}`;
}

function calculateTip() {
    const total = parseFloat(document.getElementById("billTotal").value);
    const tip = parseFloat(document.getElementById("tipPercent").value)/100;
    const resultId = "tipResult";
    if (isNaN(total) || isNaN(tip) || total < 0 || tip < 0) return showError(resultId, "Enter valid bill total and tip percentage");
    const res = total*tip;
    const totalWithTip = total + res;
    document.getElementById(resultId).innerText = `Tip: ${res.toFixed(2)}, Total: ${totalWithTip.toFixed(2)}`;
}

function calculatePercent() {
    const num = parseFloat(document.getElementById("percentOf").value);
    const perc = parseFloat(document.getElementById("percentValue").value)/100;
    const resultId = "percentResult";
    if (isNaN(num) || isNaN(perc)) return showError(resultId, "Enter valid number and percentage value");
    const res = num*perc;
    document.getElementById(resultId).innerText = `${(perc*100).toFixed(2)}% of ${num} = ${res.toFixed(2)}`;
}

function calculateSI() {
    const P = parseFloat(document.getElementById("siPrincipal").value);
    const R = parseFloat(document.getElementById("siRate").value)/100;
    const T = parseFloat(document.getElementById("siTime").value);
    const resultId = "siResult";
    if (isNaN(P) || isNaN(R) || isNaN(T)) return showError(resultId, "Enter valid Principal, Rate, and Time");
    const si = P*R*T;
    document.getElementById(resultId).innerText = `Simple Interest: ${si.toFixed(2)}`;
}

function calculateCI() {
    const P = parseFloat(document.getElementById("ciPrincipal").value);
    const R = parseFloat(document.getElementById("ciRate").value)/100;
    const T = parseFloat(document.getElementById("ciTime").value);
    const N = parseInt(document.getElementById("ciFreq").value);
    const resultId = "ciResult";
    if (isNaN(P) || isNaN(R) || isNaN(T) || isNaN(N) || N <= 0) return showError(resultId, "Enter valid Principal, Rate, Time, and positive Frequency");
    const A = P * Math.pow(1+R/N,N*T);
    const CI = A - P;
    document.getElementById(resultId).innerText = `Total Amount: ${A.toFixed(2)}, Compound Interest: ${CI.toFixed(2)}`;
}

function calculateSpeed() {
    const d = parseFloat(document.getElementById("distance").value);
    const t = parseFloat(document.getElementById("timeVal").value);
    const resultId = "speedResult";
    if (isNaN(d) || isNaN(t) || t <= 0) return showError(resultId, "Enter valid Distance and positive Time");
    const speed = d/t;
    document.getElementById(resultId).innerText = `Speed: ${speed.toFixed(2)} km/h`;
}

function calculateArea() {
    const l = parseFloat(document.getElementById("lengt").value);
    const w = parseFloat(document.getElementById("width").value);
    const resultId = "areaResult";
    if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) return showError(resultId, "Enter valid positive Length and Width");
    document.getElementById(resultId).innerText = `Area: ${(l*w).toFixed(2)}, Perimeter: ${(2*(l+w)).toFixed(2)}`;
}
function calculateVolume() {
    const s = parseFloat(document.getElementById("side").value);
    const resultId = "volumeResult";
    if (isNaN(s) || s <= 0) return showError(resultId, "Enter valid positive side length");
    document.getElementById(resultId).innerText = `Volume: ${(s**3).toFixed(2)}`;
}

function convertWeight() {
    const weightInput = document.getElementById('weightValue');
    const weight = parseFloat(weightInput.value);
    const selectElement = document.getElementById('weightUnit');
    const conversionType = selectElement.value;
    const resultId = "weightResult";
    const conversionFactor = 2.20462;
    let result;
    if (isNaN(weight) || weightInput.value.trim() === '') {
        return showError(resultId, "Please enter a valid number.");
    }
    if (conversionType === 'kg') {
        result = weight * conversionFactor;
        document.getElementById(resultId).textContent = `${weight} kg is approximately ${result.toFixed(2)} lbs.`;
    } else if (conversionType === 'lbs') {
        result = weight / conversionFactor;
        document.getElementById(resultId).textContent = `${weight} lbs is approximately ${result.toFixed(2)} kg.`;
    }
}

function convertLength() {
    const value = parseFloat(document.getElementById("lengthInput").value);
    const fromUnit = document.getElementById("fromUnit").value;
    const toUnit = document.getElementById("toUnit").value;
    const resultId = "lengthResult";
    if (isNaN(value)) return showError(resultId, "Enter a valid length value");
    const toMeters = {
        'm': 1,
        'mm': 0.001,
        'cm': 0.01,
        'km': 1000,
        'inch': 0.0254,
        'foot': 0.3048,
        'mile': 1609.34
    };
    const fromMeters = {
        'm': 1,
        'mm': 1000,
        'cm': 100,
        'km': 0.001,
        'inch': 39.3701,
        'foot': 3.28084,
        'mile': 0.000621371
    };
    const valueInMeters = value * toMeters[fromUnit];
    const result = valueInMeters * fromMeters[toUnit];
    document.getElementById(resultId).innerText = `${value} ${fromUnit} = ${result.toFixed(4)} ${toUnit}`;
}

function calculatePower() {
    const work = parseFloat(document.getElementById("work").value);
    const time = parseFloat(document.getElementById("timePower").value);
    const resultId = "powerResult";
    if (isNaN(work) || isNaN(time) || time <= 0) return showError(resultId, "Enter valid Work and positive Time values");
    const power = work/time;
    document.getElementById(resultId).innerText = `Power: ${power.toFixed(2)} W`;
}

function calculateCalories() {
    const w = parseFloat(document.getElementById("calWeight").value);
    const h = parseFloat(document.getElementById("calHeight").value);
    const a = parseInt(document.getElementById("calAge").value);
    const resultId = "caloriesResult";
    if (isNaN(w) || isNaN(h) || isNaN(a) || w <= 0 || h <= 0 || a <= 0) return showError(resultId, "Enter valid positive Weight, Height, and Age");
    const bmr = 10*w + 6.25*h - 5*a + 5;
    document.getElementById(resultId).innerText = `Estimated BMR (Calories): ${bmr.toFixed(2)}`;
}