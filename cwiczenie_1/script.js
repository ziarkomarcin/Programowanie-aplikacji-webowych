var InputsApp = /** @class */ (function () {
    function InputsApp() {
        var _this = this;
        this.entered = [];
        this.count = 1;
        var inputValue = document.getElementById('input-value');
        inputValue.addEventListener('input', function (event) {
            var target = event.target;
            _this.count = Number(target.value);
            new UI(_this.count, _this.entered);
        });
        new UI(this.count, this.entered);
    }
    return InputsApp;
}());
var ShowStats = /** @class */ (function () {
    function ShowStats() {
    }
    ShowStats.prototype.sum = function (values) {
        var sum = values.reduce(function (a, b) { return a + b; }, 0);
        return sum;
    };
    ShowStats.prototype.average = function (values) {
        var sum = values.reduce(function (a, b) { return a + b; }, 0);
        return Number((sum / values.length).toFixed(4));
    };
    ShowStats.prototype.minimum = function (values) {
        return Math.min.apply(Math, values);
    };
    ShowStats.prototype.maximum = function (values) {
        return Math.max.apply(Math, values);
    };
    return ShowStats;
}());
var GeneratedInputs = /** @class */ (function () {
    function GeneratedInputs(id, count, values) {
        // creating input
        this.input = document.createElement('input');
        this.input.type = "number";
        this.input.value = values[id] ? String(values[id]) : '0';
        this.input.id = "input-" + id;
        values[id] = Number(this.input.value);
        this.input.addEventListener('input', function (event) {
            var target = event.target;
            values[id] = Number(target.value);
            new UI(count, values);
        });
        // creating delete button
        this.button = document.createElement('button');
        this.button.innerText = "×";
        this.button.addEventListener('click', function (event) {
            var inputValue = document.getElementById('input-value');
            console.log(values);
            values[id] = 0;
            values.splice(id, 1);
            count -= 1;
            inputValue.value = count;
            console.log({ count: count });
            new UI(count, values);
        });
    }
    GeneratedInputs.prototype.showDiv = function () {
        var box = document.createElement('div');
        box.className = "input-box";
        box.appendChild(this.input);
        box.appendChild(this.button);
        return box;
    };
    return GeneratedInputs;
}());
var UI = /** @class */ (function () {
    function UI(inputCnt, values) {
        this.stat = document.getElementById('stat');
        this.stat.innerHTML = null;
        if (this.wrongValue(inputCnt, values)) {
            this.genUI(inputCnt, values);
        }
        else {
            var block = document.getElementById('inputs');
            block.innerHTML = null;
            this.genErrorUI();
        }
    }
    UI.prototype.wrongValue = function (inputCnt, values) {
        var wrong = false;
        console.log(inputCnt);
        if (values && inputCnt > 0) {
            wrong = values.every(function (val) { return typeof val === 'number'; });
        }
        return wrong;
    };
    UI.prototype.genStat = function (name, calculate, values) {
        var call = document.createElement('p');
        var value = document.createElement('b');
        call.innerText = name;
        value.innerText = calculate(values);
        var box = document.createElement('div');
        box.appendChild(call);
        box.appendChild(value);
        return box;
    };
    UI.prototype.genInputs = function (count, values) {
        var block = document.getElementById('inputs');
        block.innerHTML = null;
        for (var i = 0; i < count; i++) {
            var input = new GeneratedInputs(i, count, values).showDiv();
            block.appendChild(input);
        }
    };
    UI.prototype.genUI = function (inputCnt, values) {
        var _this = this;
        var x = new ShowStats;
        var fields = [];
        this.genInputs(inputCnt, values);
        var vals = values.slice(0, inputCnt);
        fields.push(this.genStat('Suma', x.sum, vals));
        fields.push(this.genStat('Średnia', x.average, vals));
        fields.push(this.genStat('War. minimalna', x.minimum, vals));
        fields.push(this.genStat('War. maksymalna', x.maximum, vals));
        fields.forEach(function (el) {
            _this.stat.appendChild(el);
        });
    };
    UI.prototype.genErrorUI = function () {
        var error = document.createElement('h3');
        error.innerText = "Bez inputów będzie lipa...";
        this.stat.appendChild(error);
    };
    return UI;
}());
var openApp = new InputsApp();
