const display = document.getElementById('display');
let currentInput = '0';
let currentOperation = '';
let lastOperation = '';
let isDecimalAdded = false;
let isOperatorAdded = false;
let isEqualsPressedLast = false;

function updateDisplay() {
    display.textContent = currentInput;
}

function clearCalculator() {
    currentInput = '0';
    currentOperation = '';
    lastOperation = '';
    isDecimalAdded = false;
    isOperatorAdded = false;
    isEqualsPressedLast = false;
    updateDisplay();
}

function evaluateExpression() {
    return new Function('return ' + currentOperation)();
}

document.getElementById('clear').addEventListener('click', clearCalculator);

document.querySelectorAll('.digit').forEach(button => {
    button.addEventListener('click', function(e) {
        if (currentInput === '0' || isOperatorAdded || isEqualsPressedLast) {
            currentInput = '';
            isOperatorAdded = false;
        }

        if (isEqualsPressedLast) {
            currentOperation = '';
            isEqualsPressedLast = false;
        }

        currentInput += e.target.textContent;
        currentOperation += e.target.textContent;
        updateDisplay();
    });
});

document.getElementById('decimal').addEventListener('click', function() {
    if (!isDecimalAdded) {
        if (isOperatorAdded || isEqualsPressedLast) {
            currentInput = '0';
            isOperatorAdded = false;
        }

        currentInput += '.';
        currentOperation += '.';
        isDecimalAdded = true;
        updateDisplay();
    }
});

['add', 'subtract', 'multiply', 'divide'].forEach(op => {
    document.getElementById(op).addEventListener('click', function() {
        if (isEqualsPressedLast) {
            currentOperation = currentInput;
            isEqualsPressedLast = false;
        }

        if (!isOperatorAdded) {
            currentOperation += this.textContent;
            isOperatorAdded = true;
            isDecimalAdded = false;
            lastOperation = this.textContent;
        } else {
            currentOperation = currentOperation.slice(0, -1) + this.textContent;
            lastOperation = this.textContent;
        }
    });
});

document.getElementById('equals').addEventListener('click', function() {
    if (currentOperation) {
        currentInput = parseFloat(evaluateExpression().toFixed(4)).toString();
        isEqualsPressedLast = true;
        isDecimalAdded = currentInput.includes('.');
        currentOperation = currentInput;
        updateDisplay();
    }
});
