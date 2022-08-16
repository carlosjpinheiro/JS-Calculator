const display = document.querySelector('.display');
const registeredDisplay = document.querySelector('#registered');
const liveDisplay = document.querySelector('#live');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operator');
const resultBtn = document.querySelector('#result');
const squareRoot = document.querySelector('#square');
const clearEntry = document.querySelector('#clearEntry');
const clearAll = document.querySelector('#clearAll');
let num1;
let num2;
let operator;   
let resultFlag = false;

function displayMng (operatorTxt) {
    num1 = parseFloat(liveDisplay.textContent);
    if (num1) {
        registeredDisplay.textContent = liveDisplay.textContent + ' ' + operatorTxt.replace('bⁿ', '^');
        liveDisplay.textContent = '';
        operator = operatorTxt;
    }
    console.log(!num1)
    
}

function operate(operator, num1, n2) {
    let result;
    num2 = n2;
    switch (operator) {
        case '+':
            result = num1 + num2; 
            break;
        case '-':
            result = num1 - num2;
            break;
        case 'x':
            result = (num1 * num2).toFixed(2);
            break;
        case '÷':
            result = (num1 / num2).toFixed(2);
            break;
        case 'bⁿ':
            result = num1 ** num2;
            break;
    }
    registeredDisplay.textContent = num1 + ' ' + operator.replace('bⁿ', '^') + ' ' + num2 + ' =';
    liveDisplay.textContent = result;
    resultFlag = true;
}

function clearAllFct() {
    num1 = 0;
    num2 = 0;
    operator = '';
    resultFlag = false;
    registeredDisplay.textContent = '';
    liveDisplay.textContent = '';
}

squareRoot.addEventListener('click', () => {
    num1 = parseFloat(liveDisplay.textContent);
    registeredDisplay.textContent = '√ ' + liveDisplay.textContent;
    liveDisplay.textContent = num1 ** (1/2);
    resultFlag = true;
})

numbers.forEach((number) => {
    number.addEventListener('click', ()=> {   //forbid double dots
        if (resultFlag == true) {
            clearAllFct();
        }
        if (number.textContent == '.' && liveDisplay.textContent.indexOf('.') == -1) {
            liveDisplay.textContent += number.textContent;
        } else if (number.textContent != '.') {
            liveDisplay.textContent += number.textContent;
        }
    })
})

operators.forEach((operator) => {
    operator.addEventListener('click', () => {
        displayMng(operator.textContent);
    })
})

resultBtn.addEventListener('click', () => {
    if (!num2) num2 = liveDisplay.textContent;
    operate(operator,num1,num2);
})

clearAll.addEventListener('click', () => {
    clearAllFct();
})

clearEntry.addEventListener('click', () => {
    liveDisplay.textContent = '';
    if (resultFlag) {
        clearAllFct();
    } else {
        (operator) ? num2 = 0 : num1 = 0;
    }
    //if (!resultFlag) { (operator) ? num2 = 0 : num1 = 0;}
    //(operator) ? num2 = 0 : num1 = 0;
    resultFlag = false;
})