function getPrevious() {
    return document.getElementById("previous").innerText;
}

function printPrevious(num) {
    document.getElementById("previous").innerText = num;
}

function getCurrent() {
    return document.getElementById("current").innerText;
}

function printCurrent(num) {
    document.getElementById("current").innerText = num;
}

function getFormattedNumber(num) {
    var n = Number(num);
    var value = n.toLocaleString("en", { maximumFractionDigits: 20 });
    return value;
}

function reverseNumber(num) {
    return (num.replace(/,/g, ''));
}
var operator = document.getElementsByClassName("operator");
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener('click', function() {
        if (this.id == "delete") {
            var output = reverseNumber(getCurrent());
            output = output.substr(0, output.length - 1);
            output = getFormattedNumber(output);
            printCurrent(output);
        } else if (this.id == "clear-entry") {
            printPrevious("");
            printCurrent("0");
        } else if (this.id == "clear") {
            printCurrent("0");
        } else if ((this.id == "1/") || (this.id == "sqr(") || (this.id == "sqrt(") || (this.id == "percent")) {
            var output = getCurrent();
            var history = getPrevious();
            if (output != "") {
                output = Number(reverseNumber(output));
                if (this.id == "1/")
                    output = 1 / output;
                if (this.id == "sqr(")
                    output = output ** 2;
                if (this.id == "sqrt(")
                    output = Math.sqrt(output);
                if (this.id == "percent")
                    output = output / 100;
                history = history + output;
                var result = history.replace(/÷|×/g, function(x) {
                    if (x == "÷")
                        return "/";
                    else return "*";
                });
                result = eval(result);
                result = getFormattedNumber(result);
                printCurrent(result);
                printPrevious("");
            }

        } else {
            var output = getCurrent();
            var history = getPrevious();
            if (output != "") {
                output = reverseNumber(output).toString();
                history = history + output;
                if (this.id == "=") {
                    var result = history.replace(/÷|×/g, function(x) {
                        if (x == "÷")
                            return "/";
                        else return "*";
                    });
                    result = eval(result);
                    result = getFormattedNumber(result);
                    printCurrent(result);
                    printPrevious("");
                } else {
                    var result = history.replace(/÷|×/g, function(x) {
                        if (x == "÷")
                            return "/";
                        if (x == ",")
                            return "";
                        else return "*";
                    });
                    result = eval(result);
                    history = result + this.id;
                    result = getFormattedNumber(result);
                    printPrevious(history);
                    printCurrent("0");
                }
            }
        }

    });
}

var number = document.getElementsByClassName("number");
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener('click', function() {
        var output = reverseNumber(getCurrent());
        var history = getPrevious();
        if (output != NaN) {
            if (this.id == ".") {
                if (output.includes('.')) return
                output = getFormattedNumber(output);
                output += this.id;
                printCurrent(output);
            } else {
                output += this.id;
                output = getFormattedNumber(output);
                printCurrent(output);
            }
        }
    });
}