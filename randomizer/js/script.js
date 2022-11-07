let alert = document.createElement("p");
alert.classList.add('alert');

flipCard();
randomizeUserInput();

function randomizeNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function flipCard() {
    let cardOnClick = document.querySelector('.lucky__card-click');
    let cardBack = document.querySelector('.lucky__reveal_back');

    cardOnClick.addEventListener("click", () => cardOnClick.classList.toggle('flipped'));

    cardBack.innerHTML = `
        <h2>Твоє щасливе число сьогодні:</h2>
        <div>
            <p>${randomizeNumber(1, 100)}</p>
        </div>
    `;
}

function floatToInteger(input) {
    (!Number.isInteger(+input)) ?
        input.value = Math.trunc(+input.value) : null;
}

function alertUser(message, block, blockChild) {
    do {
        alert.textContent = message;
        block.insertBefore(alert, blockChild);
    } while (!alert)

    if (alert) {
        setTimeout(() => {
            alert.remove();
        }, 4000)
    }
}

function randomizeUserInput() {

    let form = document.querySelector('.randomize__form');

    let inputMin = document.querySelector('#input-min');
    let inputMax = document.querySelector('#input-max');
    let inputCount = document.querySelector('#input-count');
    let inputUnique = document.querySelector('#input-unique');

    let quantityBtnsPlus = document.querySelectorAll('.quantity-plus');
    let quantityBtnsMinus = document.querySelectorAll('.quantity-minus');

    let formBtn = document.querySelector('.randomize__btn');
    let clearBtn = document.querySelector('.randomize__btn-clear');
    let result = document.querySelector('.randomize__result');
    let unique;

    inputUnique.addEventListener('click', () => {
        if (inputUnique.checked && inputCount.value > inputMax.value - inputMin.value + 1) inputCount.value = inputMax.value - inputMin.value + 1;
    })

    quantityBtnsPlus.forEach((btn) => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            if (btn.dataset.input === 'min') inputMin.value++;
            if (btn.dataset.input === 'max') inputMax.value++;
            if (btn.dataset.input === 'count') {
                if (inputUnique.checked) {
                    if (inputCount.value < inputMax.value - inputMin.value + 1) inputCount.value++;
                } else {
                    inputCount.value++;
                }
            };
        })
    })

    quantityBtnsMinus.forEach((btn) => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            if (btn.dataset.input === 'min') inputMin.value--;
            if (btn.dataset.input === 'max') inputMax.value--;
            if (btn.dataset.input === 'count') {
                (inputCount.value > 1) ? inputCount.value-- : null;
            };
        })
    })

    formBtn.addEventListener("click", (e) => {
        e.preventDefault();
        let randomNumArr = [];

        floatToInteger(inputMin);
        floatToInteger(inputMax);
        floatToInteger(inputCount);

        if (+inputMin.value > +inputMax.value) {
            alertUser('Мінімальне число має бути менше максимального', form, formBtn);

        } else if (inputUnique.checked && inputCount.value > (inputMax.value - inputMin.value + 1)) {
            alertUser('Кількість унікальних чисел не може перевищувати ранжування', form, formBtn);

        } else if (inputCount.value < 1) {
            alertUser('Кількість не може бути менше чи дорівнювати нулю', form, formBtn);

        } else {

            while (randomNumArr.length !== Math.trunc(+inputCount.value)) {


                if (inputUnique.checked) {
                    unique = randomizeNumber(+inputMin.value, +inputMax.value);
                    if (!randomNumArr.includes(unique)) {
                        randomNumArr.push(unique);
                    }
                } else {
                    randomNumArr.push(randomizeNumber(+inputMin.value, +inputMax.value));
                }

            }

            result.innerHTML = `
                <p>${randomNumArr.join(', ')}</p>
            `;
        }
    });

    clearBtn.addEventListener('click', (e) => {
        e.preventDefault();
        inputMin.value = 'none';
        inputMax.value = 'none';
        inputCount.value = 1;
        result.innerHTML = `
            <h2>Довірся магії чисел</h2>
        `;
    })
}
