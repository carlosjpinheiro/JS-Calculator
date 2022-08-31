const buttons = document.querySelectorAll('button');
const registeredDisplay = document.querySelector('#registered');
const liveDisplay = document.querySelector('#live');
const clearEntry = document.querySelector('#clearEntry');
const clearAll = document.querySelector('#clearAll');
let num1 = 0;
let num2 = 0;
let numRes = 0;
let numBuffer = '';
let operator = '';   
let lastClick;
let resultFlag = false;

function displayMng(button) {
    switch (lastClick) {
        case 'square':
            if (liveDisplay.textContent != '0' && !resultFlag) {
                num1 = parseFloat(((numBuffer) ** (1/2)).toFixed(2));
                operator = '√';
                registeredDisplay.textContent = `${operator} ${numBuffer} = ${(num1).toFixed(2)}`;
                liveDisplay.textContent = '0';
                numBuffer = '';
            } else if (resultFlag) {
                operator = '√';
                numRes = num1 ** (1/2);
                registeredDisplay.textContent = `${operator} ${num1} = ${numRes.toFixed(2)}`;
                liveDisplay.textContent = '0';
                num1 = parseFloat(numRes.toFixed(2));
                resultFlag = false;
            }
            break
        case 'result':
            if (liveDisplay.textContent != '0') {
                num2 = parseFloat(numBuffer);
                (String(operate(operator,num1,num2)).length > 16) ? numRes = Infinity : numRes = operate(operator,num1,num2);
                registeredDisplay.textContent = `${num1} ${operator.replace('bⁿ', '^')} ${num2} = ${numRes.toFixed(2)} `;
                liveDisplay.textContent = '';
                numBuffer = '';
                num1 = parseFloat(numRes.toFixed(2));
                resultFlag = true;
            }
            break
        case 'operator':
            if (liveDisplay.textContent == '0') {
                operator = button.textContent;
                if (num1) registeredDisplay.textContent = `${num1.toFixed(2)} ${operator.replace('bⁿ', '^')}`;
            } else {
                if (!operator) {
                    operator = button.textContent;
                    num1 = parseFloat(numBuffer);
                    registeredDisplay.textContent = `${num1.toFixed(2)} ${operator.replace('bⁿ', '^')} `;
                    liveDisplay.textContent = '0';
                    numBuffer = '';
                } else if (resultFlag) {
                    operator = button.textContent;
                    registeredDisplay.textContent = `${num1.toFixed(2)} ${operator.replace('bⁿ', '^')} `;
                    liveDisplay.textContent = '0';
                    resultFlag = false;
                } else {
                    num2 = parseFloat(numBuffer);
                    (String(operate(operator,num1,num2)).length > 16) ? numRes = Infinity : numRes = operate(operator,num1,num2);
                    operator = button.textContent;
                    registeredDisplay.textContent = `${numRes.toFixed(2)} ${operator.replace('bⁿ', '^')} `;
                    liveDisplay.textContent = '0';
                    numBuffer = '';
                    num1 = parseFloat(numRes.toFixed(2));
                }
            }
            break
        case 'numbers':
            if ((button.textContent == '.' && liveDisplay.textContent.indexOf('.') == -1) || (button.textContent != '.')) {
                numBuffer += button.textContent;
                liveDisplay.textContent = numBuffer;
            } 
            break;
    }
}

function operate(operator, n1, n2) {
    switch (operator) {
        case '+':
            return parseFloat((n1 + n2).toFixed(2));
        case '-':
            return parseFloat((n1 - n2).toFixed(2));
        case 'x':
            return parseFloat((n1 * n2).toFixed(2));
        case '÷':
            if (n2 == 0) {
                liveDisplay.textContent = "CAN'T DIVIDE BY ZERO";
                break
            } else {
                return parseFloat((n1 / n2).toFixed(2));
            }
        case 'bⁿ':
            return parseFloat((n1 ** n2).toFixed(2));
    }
}

function clearAllFct() {
    num1 = 0;
    num2 = 0;
    operator = '';
    lastClick = '';
    numRes = 0;
    numBuffer = '';
    resultFlag = false;
    registeredDisplay.textContent = '';
    liveDisplay.textContent = '0';
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        (button.id == 'result' || button.classList.value == '') ? lastClick = button.id : lastClick = button.classList.value;
        displayMng(button);
    })
})

clearAll.addEventListener('click', () => {
    clearAllFct();
})

clearEntry.addEventListener('click', () => {
    lastClick = clearEntry.textContent;
    liveDisplay.textContent = '0';
    numBuffer = '';
    (operator) ? num2 = 0 : num1 = 0;
    if (resultFlag) {
        clearAllFct();
        resultFlag = false;
    }
})