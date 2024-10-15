const sc = document.querySelector("#screen");
sc.innerText = "";

const numberButtons = document.querySelectorAll(".numbers");
const clear = document.getElementById("clear");
const operateButtons = document.querySelectorAll(".operations");
const back = document.getElementById("back");
const eq = document.getElementById("enter");

back.addEventListener("click", e => {
    sc.innerText = sc.innerText.slice(0, -1);
});

clear.addEventListener("click", e => {
    sc.innerText = "";
});

numberButtons.forEach(button => {
    button.addEventListener('click', e => {
        const number = e.target.innerText;
        sc.innerText += number;
    });
});

operateButtons.forEach(button => {
    button.addEventListener('click', e => {
        let op = e.target.innerText;
        sc.innerText += op;
    });
});

eq.addEventListener("click", e => {
    sc.innerText = (evaluate(sc.innerText));
});

function evaluate(expression) {
    let exp = expression.split('');

    let values = [];
    let ops = [];

    for (let i = 0; i < exp.length; i++) {

        if (exp[i] == ' ') {
            continue;
        }

        if (exp[i] >= '0' && exp[i] <= '9') {
            let sbuf = "";

            while (i < exp.length && exp[i] >= '0' && exp[i] <= '9') {
                sbuf = sbuf + exp[i++];
            }
            values.push(parseInt(sbuf, 10));
            i--;
        }

        else if (exp[i] == '(') {
            ops.push(exp[i]);
        }

        else if (exp[i] == ')') {
            while (ops[ops.length - 1] != '(') {
                values.push(applyOperation(ops.pop(), values.pop(), values.pop()));
            }
            ops.pop();
        }

        else if (exp[i] == '+' || exp[i] == '-' || exp[i] == '*' || exp[i] == '/') {

            while (ops.length > 0 && precedence(exp[i], ops[ops.length - 1])) {
                values.push(applyOperation(ops.pop(), values.pop(), values.pop()));
            }

            ops.push(exp[i]);
        }
    }

    while (ops.length > 0) {
        values.push(applyOperation(ops.pop(), values.pop(), values.pop()));
    }

    return values.pop();
}

function precedence(op1, op2) {
    if (op2 == '(' || op2 == ')') {
        return false;
    }
    if ((op1 == '*' || op1 == '/') && (op2 == '+' || op2 == '-')) {
        return false;
    } else {
        return true;
    }
}

function applyOperation(op, b, a) {
    switch (op) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b == 0) {
                alert("Cannot divide by zero");
                return 0;
            }
            return parseInt(a / b, 10);
    }
    return 0;
}
