let calcScreen = document.querySelector('.calc__screen');

let currentNum = '',
    bufferNum = '',
    sign = '';

let isInputNum = true;
let isPercent = false;

let numBtns = document.querySelectorAll('.btn-num');
let actionBtns = document.querySelectorAll('.btn-action');
let percentBtn = document.querySelector('.btn-percent');
let clearBtn = document.querySelector('.btn-clear');
let pointBtn = document.querySelector('.btn-point');
let equalBtn = document.querySelector('.btn-equal');
let negativeBtn = document.querySelector('.btn-negative');

const MAX_DIGITS_LENGTH = 20;
let currentLength = MAX_DIGITS_LENGTH;

numBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (!isInputNum || isPercent) {
            if (!isInputNum) {
                bufferNum = currentNum;
            }
            isInputNum = true;
            isPercent = false;
            currentNum = '';
            currentLength = MAX_DIGITS_LENGTH;
            calcScreen.textContent = currentNum;
            console.log('bufferNum: ', bufferNum);
            console.log('currentNum: ', currentNum);
        }

        if (isInputNum && currentNum.length < currentLength) {
            if (currentNum === '0' && e.target.innerText === '0') {
                currentNum = '0';
            }

            else if (currentNum === '0' && e.target.innerText !== '0') {
                currentNum = e.target.innerText;
            }

            else {
                currentNum += e.target.innerText;
            }
            calcScreen.textContent = currentNum;
        }
    })
})

clearBtn.addEventListener('click', () => {
    currentNum = '';
    bufferNum = '';
    sign = '';
    isInputNum = true;
    isPercent = false;
    currentLength = MAX_DIGITS_LENGTH;
    calcScreen.textContent = currentNum;
})

pointBtn.addEventListener('click', () => {
    if (currentNum === '') {
        currentNum = '0,'
    } else if (!currentNum.includes(',') && isInputNum) {
        currentNum += ',';
    }
    calcScreen.textContent = currentNum;
})

equalBtn.addEventListener('click', () => {
    if (bufferNum && currentNum) {
        currentNum = calculate(sign).toString().replace(/\./, ',');
        calcScreen.textContent = currentNum;
        currentNum = '';
        bufferNum = '';
        sign = '';
    }
})

negativeBtn.addEventListener('click', () => {
    if (currentNum && currentNum !== '0') {
        if (currentNum[0] !== '-') {
            currentNum = '-' + currentNum;
            currentLength++;
        } else {
            currentNum = currentNum.replace(/-/, '');
            currentLength--;
        }
    }
    calcScreen.textContent = currentNum;
})


actionBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {

        if (bufferNum) {
            if (bufferNum === 'Некоректне значення') {
                currentNum = 'Некоректне значення';
            } else {
                currentNum = calculate(sign).toString().replace(/\./, ',');
            }
            calcScreen.textContent = currentNum;
        }

        if (currentNum) {
            isInputNum = false;
            isPercent = false;
            sign = e.target.innerText;
        }

    })
})

percentBtn.addEventListener('click', () => {
    if (bufferNum && currentNum && sign !== '/') {
        let num = +bufferNum.replace(/,/, '.');
        let percent = +currentNum.replace(/,/, '.');
        let result = num * (percent / 100);
        switch (sign) {
            case '+':
                result = num + result;
                break;
            case '—':
                result = num - result;
                break;
        }
        currentNum = result.toString().replace(/\./, ',');
        calcScreen.textContent = currentNum;
        bufferNum = '';
        sign = '';
        isPercent = true;
    }
})

function calculate(sign) {
    let num1 = +bufferNum.replace(/,/, '.');
    let num2 = +currentNum.replace(/,/, '.');

    switch (sign) {
        case '+':
            // return num1 + num2;
            return (Math.round(num1*10) + Math.round(num2*10)) / 10;
        case '—':
            // return num1 - num2;
            return (Math.round(num1*10) - Math.round(num2*10)) / 10;
        case 'x':
            // return num1 * num2;
            return (Math.round(num1*10) * Math.round(num2*10)) / 100;
        case '/':
            if (!(!!num1) || !(!!num2)) {
                return 'Некоректне значення';
            } else {
                // return num1 / num2;
                return Math.round(num1*10) / Math.round(num2*10);
            }
    }
}