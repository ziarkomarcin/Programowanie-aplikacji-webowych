class InputsApp {
    entered: Array<number> = [];
    count: number = 1;
    constructor() {
        const inputValue: HTMLElement = document.getElementById('input-value');
        inputValue.addEventListener('input', (event: Event) => {
            const target = event.target as HTMLInputElement;
            this.count = Number(target.value);
            new UI(this.count, this.entered);
        });
        new UI(this.count, this.entered);
    }
}

class ShowStats {
    sum(values: Array<number>): number {
        const sum: number = values.reduce((a, b) => a + b, 0);
        return sum;
    }
    average(values: Array<number>): number {
        const sum: number = values.reduce((a, b) => a + b, 0);
        return Number((sum / values.length).toFixed(4));
    }
    minimum(values: Array<number>): number {
        return Math.min(...values);
    }
    maximum(values: Array<number>): number {
        return Math.max(...values);
    }
}

class GeneratedInputs {
    input: HTMLInputElement;
    button: HTMLButtonElement;
    constructor(id, count, values: Array<number>) {
        // creating input
        this.input = document.createElement('input');
        this.input.type = "number";
        this.input.value = values[id] ? String(values[id]) : '0';
        this.input.id = `input-${id}`;
        values[id] = Number(this.input.value);
        this.input.addEventListener('input', (event: Event) => {
            const target = event.target as HTMLInputElement;
            values[id] = Number(target.value);
            new UI(count, values);
        });
        // creating delete button
        this.button = document.createElement('button');
        this.button.innerText = "×";
        this.button.addEventListener('click', (event: Event) => {
            const inputValue: HTMLInputElement = document.getElementById('input-value') as HTMLInputElement;
            console.log(values);
            values[id] = 0;
            values.splice(id,1);
            count -= 1;
            inputValue.value = count;
            console.log({count});

            new UI(count, values);
        });

    }

    showDiv() : HTMLDivElement {
        const box = document.createElement('div');
        box.className = "input-box";
        box.appendChild(this.input);
        box.appendChild(this.button);

        return box;
    }
}

class UI {
    stat = document.getElementById('stat');
    constructor(inputCnt: number, values: Array<number>) {
        this.stat.innerHTML = null;
        if (this.wrongValue(inputCnt, values)) {
            this.genUI(inputCnt, values);
        } else {
            const block = document.getElementById('inputs');
            block.innerHTML = null;
            this.genErrorUI();
        }
    }

    wrongValue(inputCnt: number, values: Array<number>): boolean {
        let wrong = false;
        console.log(inputCnt);
        if (values && inputCnt > 0) {
            wrong = values.every((val) => typeof val === 'number');
        }

        return wrong;
    }

    genStat(name: string, calculate: Function, values: Array<number>): HTMLDivElement {
        const call = document.createElement('p');
        const value = document.createElement('b');
        call.innerText = name;
        value.innerText = calculate(values);

        const box = document.createElement('div');
        box.appendChild(call);
        box.appendChild(value);

        return box;
    }
    genInputs(count: number, values: Array<number>): void{
        const block = document.getElementById('inputs');
        block.innerHTML = null;
        for (let i = 0; i < count; i++) {
            const input = new GeneratedInputs(i,count, values).showDiv();
            block.appendChild(input);
        }
    }
    genUI(inputCnt: number, values: Array<number>): void {
        const x = new ShowStats;
        const fields: Array<HTMLDivElement> = [];
        this.genInputs(inputCnt, values);
        const vals = values.slice(0, inputCnt);
        fields.push(this.genStat('Suma', x.sum, vals));
        fields.push(this.genStat('Średnia', x.average, vals));
        fields.push(this.genStat('War. minimalna', x.minimum, vals));
        fields.push(this.genStat('War. maksymalna', x.maximum, vals));

        fields.forEach((el: HTMLDivElement) => {
            this.stat.appendChild(el);
        })
    }

    genErrorUI(): void {
        const error = document.createElement('h3');
        error.innerText = "Bez inputów będzie lipa...";
        this.stat.appendChild(error);
    }
}


const openApp = new InputsApp();