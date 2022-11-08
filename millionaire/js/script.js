let question = document.querySelector('.question');
let answers = document.querySelectorAll('.answer');

let btnStart = document.querySelector('.pop-up-start')
let endGameBtn = document.querySelector('.end-game');

let lifelineFiftyFifty = document.querySelector('.lifeline-fifty');
let lifelineFriendCall = document.querySelector('.lifeline-call');

let startScreen = document.querySelector('.game-start');
let gameScreen = document.querySelector('.game');

let timeLimitedInput = document.querySelector('input[name="time-limited"]');

let currentPriceGuaranteed = 0,
    currentBank = 0,
    questionsInfoCounter = 1,
    isAnswered = false;

let timeLeft, seconds, timerun;


const questionsInfo = {
    1: {
        cost: 100,
        question: `Яке призвісько мали бандити в різдвяному сімейному фільмі "Сам удома"?`,
        answers: {
            1: `A. Сухі бандити`,
            2: `B. Мокрі бандити`,
            3: `C. Тверезі бандити`,
            4: `D. Чесні бандити`,
        },
        correctAnswer: 2,
    },
    2: {
        cost: 200,
        question: `Хто вкрав Різдво?`,
        answers: {
            1: `A. Зелений Ґоблін`,
            2: `B. Ґарфілд`,
            3: `C. Привид теперішнього Різдва`,
            4: `D. Ґрінч`,
        },
        correctAnswer: 4,
    },
    3: {
        cost: 300,
        question: `Головний герой "Різдвяної пісні в прозі" Ч. Діккенса, скнара й лихвар, змушений напередодні Різдва переглянути своє ставлення до життя, став прототипом для якого персонажа мультфільму?`,
        answers: {
            1: `A. Вінні Пух`,
            2: `B. Міккі Маус`,
            3: `C. Скрудж МакДак`,
            4: `D. Гомер Сімпсон`,
        },
        correctAnswer: 3,
    },
    4: {
        cost: 500,
        question: `Скільки оленів їздять на санях Санти Клауса (враховуючи Рудольфа)?`,
        answers: {
            1: `A. 3`,
            2: `B. 7`,
            3: `C. 9`,
            4: `D. 21`,
        },
        correctAnswer: 3,
    },
    5: {
        cost: 1000,
        question: `Автором безсмертного британського різдвяного хіта "Last Christmas" є:`,
        answers: {
            1: `A. Брюс Спрінгстін`,
            2: `B. Джордж Майкл (у складі Wham!)`,
            3: `C. Стінґ (у складі The Police)`,
            4: `D. Елтон Джон`,
        },
        correctAnswer: 2,
    },
    6: {
        cost: 2000,
        question: `В оповіданні "Дари волхвів" О. Генрі, бідне подружжя розпрощалися з найціннішим, щоб зробити одне одному подарунки на Різдво. Що саме вони віддали?`,
        answers: {
            1: `A. Розкішне волосся й золотий годинник`,
            2: `B. Набір гребінів для волосся й платиновий ланцюжок`,
            3: `C. Родинний перстень і дорогоцінну брошку`,
            4: `D. Свої обручки`,
        },
        correctAnswer: 1,
    },
    7: {
        cost: 4000,
        question: `Частиною різдвяних свят в Іспанії є "Día de los santos inocentes" (День невинних святих), що відзначається 28 грудня. Аналогом якого свята є цей день?`,
        answers: {
            1: `A. Масниця`,
            2: `B. День усіх дурнів`,
            3: `C. День усіх святих (Геловін)`,
            4: `D. День подяки`,
        },
        correctAnswer: 2,
    },
    8: {
        cost: 8000,
        question: `Вертеп - це традиційний пересувний ляльковий театр, в якому представлялася містерія Різдва Христового. Чому він отримав назву Вертеп?`,
        answers: {
            1: `A. Вертеп - питома назва польського народного лялькового театру`,
            2: `B. Вертеп - старослов'янська назва двоповерхового будинку`,
            3: `C. Вертеп - це музичний твір, яким супроводжувалася вистава`,
            4: `D. Вертеп - старослов'янська назва печери, місця народження Ісуса`,
        },
        correctAnswer: 4,
    },
    9: {
        cost: 16000,
        question: `26-ий президент США Теодор Рузвельт відомий багато чим. А яким рішенням стосовно Різдва він нібито відзначився?`,
        answers: {
            1: `A. Надіслав першу в світі різдвяну листівку`,
            2: `B. Почав прикрашати оселю гірляндами`,
            3: `C. Заборонив ставити різдвяні ялинки в Білому домі`,
            4: `D. Випустив власну різдвяну поштову марку`,
        },
        correctAnswer: 3,
    },
    10: {
        cost: 32000,
        question: `У різдвяному анімаціонному фільмі Роберта Земекіса "Полярний Експрес" цей популярний актор зіграв аж шість ролей. Хто цей актор?`,
        answers: {
            1: `A. Том Гарді`,
            2: `B. Джим Керрі`,
            3: `C. Дензел Вашингтон`,
            4: `D. Том Генкс`,
        },
        correctAnswer: 4,
    },
    11: {
        cost: 64000,
        question: `Перша різдвяна листівка була надіслана 1843 року сером Генрі Коулом, дизайнером виступив Джон Келкот Горслі. Що було зображено на листівці, окрім побажань щасливих свят?`,
        answers: {
            1: `A. Сім'я сера Коула за святковим столом та дві сцени доброчинності щодо бідних`,
            2: `B. Ілюстрація до біблійної історії народження Христа`,
            3: `C. Сім'я сера Коула та близькі друзі родини за святковим столом`,
            4: `D. Діти навколо Санти Клауса та різдвяної ялинки`,
        },
        correctAnswer: 1,
    },
    12: {
        cost: 125000,
        question: `Ця відома різдвяна пісня насправді була написана до Дня подяки. Яка?`,
        answers: {
            1: `A. Frosty the Snowman`,
            2: `B. Jingle Bells`,
            3: `C. Deck the Halls`,
            4: `D. Sleigh Ride`,
        },
        correctAnswer: 2,
    },
    13: {
        cost: 250000,
        question: `В якій країні існує традиція їсти KFC на різдвяну вечерю?`,
        answers: {
            1: `A. США`,
            2: `B. Японія`,
            3: `C. Індонезія`,
            4: `D. Тайвань`,
        },
        correctAnswer: 2,
    },
    14: {
        cost: 500000,
        question: `Український оберіг, символ Всесвіту, традиційна прикраса оселі на різдвяні й новорічні свята, виготовлена з соломи - це ...?`,
        answers: {
            1: `A. Різдвяний "павук"`,
            2: `B. Різдвяна "ластівка"`,
            3: `C. Різдвяний янгол`,
            4: `D. Різдвяна зірка`,
        },
        correctAnswer: 1,
    },
    15: {
        cost: 1000000,
        question: `За язичницькою традицією, після Святої вечері українці залишають по ложці кожної страви або (в деяких регіонах) взагалі не прибирають зі столу. Чому?`,
        answers: {
            1: `A. Щоб впродовж року було багато їжі`,
            2: `B. Обробляють залишками землю, щоб вона була родючою`,
            3: `C. Щоб вберегтися від невдач`,
            4: `D. Щоб почастувати душі померлих`,
        },
        correctAnswer: 4,
    },
}

btnStart.onclick = () => {
    startScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    playGame();
}


endGameBtn.onclick = () => handlePopUp('add', 'endgame', `Ви впевнені, що хочете закінчити гру?`);

// ========================================FUNCTIONS========================================

function playGame() {

    getHelpFiftyFifty();
    getHelpFromFriend();

    if (timeLimitedInput.checked) {
        timerun = setTimeout(countdown, 1000);
    }

    formNewQuestion(questionsInfoCounter);


    answers.forEach((answer) => {
        let userAnswer, correctAnswer;
        answer.addEventListener('click', (e) => {
            isAnswered = true;
            clearTimeout(timerun);

            userAnswer = e.target;
            correctAnswer = questionsInfo[questionsInfoCounter].correctAnswer;

            answers.forEach(answer => {
                answer.disabled = true;
                lifelineFiftyFifty.disabled = true;
                lifelineFriendCall.disabled = true;
                answer.style.pointerEvents = 'none';
                if (answer.dataset.answer !== userAnswer.dataset.answer) {
                    answer.classList.add('answer-disabled');
                }
            })

            checkAnswers(questionsInfoCounter, userAnswer, correctAnswer);

        })
    })
}

function formNewQuestion(counter) {

    isAnswered = false;

    if (counter < 6) {
        timeLeft = 20;
    } else if (counter < 11) {
        timeLeft = 30;
    } else if (counter < 15) {
        timeLeft = 40;
    } else {
        timeLeft = 45;
    }

    seconds = timeLeft;

    lifelineFiftyFifty.disabled = false;
    lifelineFriendCall.disabled = false;

    answers.forEach(answer => {
        answer.disabled = false;
        answer.style.pointerEvents = '';
        answer.style.visibility = '';
        answer.classList.remove('answer-disabled', 'answer-correct', 'answer-incorrect', 'answer-correct-when-incorrect');
    })

    question.innerHTML = `
        <div class="circle-snowman"><img src="./img/snowman_question.gif" alt=""></div>
        <p class="question__header">Питання №${counter} <span>(₴${questionsInfo[counter].cost})</span></p>
        <br>
        ${(timeLimitedInput.checked) ? `<div class="question__timer">00:${(seconds < 10) ? '0' + seconds : seconds}</div>` : ``}
        <p class="question__text">${questionsInfo[counter].question}</p>
    `;

    answers.forEach((answer, index, arr) => {
        for (let i = 0; i < 4; i++) {
            arr[i].innerHTML = `${questionsInfo[counter].answers[i + 1]}`;
        }
    })
}

function checkAnswers(counter, userAnswer, correctAnswer) {

    let currentPrice = document.querySelector('.price-current');
    let priceGuaranteed = document.querySelector('.price-guaranteed');

    if (+userAnswer.dataset.answer === correctAnswer) {
        currentBank = questionsInfo[counter].cost;

        setTimeout(() => {
            question.querySelector('.circle-snowman').innerHTML = '<img src="./img/snowman_right.gif" alt="">';
            userAnswer.classList.add('answer-correct');
            currentPrice.innerHTML = `Ваш банк:<br>₴${currentBank}`;

            if (counter === 5 || counter === 10) {
                currentPriceGuaranteed = currentBank;
                priceGuaranteed.innerHTML = `Гарантована сума:<br>₴${currentPriceGuaranteed}`;
            }
        }, 1000)


        setTimeout(() => {
            if (counter < Object.keys(questionsInfo).length) {

                if (counter === 5 || counter === 10) {
                    currentPriceGuaranteed = currentBank;
                    handlePopUp('add', 'next', `Правильно! Вам гарантована сума ₴${currentBank}!`);
                } else {
                    handlePopUp('add', 'next', `Чудово, ви відповіли правильно! На вашому рахунку ₴${currentBank}!`);
                }

            } else {
                handlePopUp('add', 'gameover', `Вітаємо, ви перемогли! Ви забрали ₴${currentBank}!`);
            }
        }, 4000)


    } else {
        answers.forEach(answer => {
            if (+answer.dataset.answer === correctAnswer) {
                setTimeout(() => {
                    question.querySelector('.circle-snowman').innerHTML = '<img src="./img/snowman_wrong.gif" alt="">';
                    userAnswer.classList.add('answer-incorrect');
                    answer.classList.remove('answer-disabled');
                    answer.classList.add('answer-correct-when-incorrect');
                }, 1000)
            }
        })

        setTimeout(() => {
            handlePopUp('add', 'gameover', `На жаль, це неправильна відповідь! Ви забираєте ₴${currentPriceGuaranteed}!`);
        }, 4000)

    }
}

function getHelpFiftyFifty() {
    lifelineFiftyFifty.onclick = () => {
        let correctAnswer = questionsInfo[questionsInfoCounter].correctAnswer;
        let randomAnswer = correctAnswer;

        while (randomAnswer === correctAnswer) {
            randomAnswer = randomizeNumber(1, 4);
        }
        answers.forEach(answer => {

            if (!(+answer.dataset.answer === correctAnswer) && !(+answer.dataset.answer === randomAnswer)) {
                answer.style.visibility = 'hidden';
            }
        })
        lifelineFiftyFifty.style.display = 'none';
    }
}

function getHelpFromFriend() {
    lifelineFriendCall.onclick = () => {
        let randomAnswer, randomKey;
        let ansArr = [];
        answers.forEach((answer, indx, arr) => {
            if (answer.style.visibility !== 'hidden') {
                ansArr.push(+arr[indx].dataset.answer);
            }
        })
        randomKey = randomizeNumber(0, ansArr.length - 1);
        randomAnswer = ansArr[randomKey];
        console.log(ansArr);
        console.log(randomAnswer);
        answers.forEach(answer => {
            if (+answer.dataset.answer === randomAnswer) {
                handlePopUp('add', 'call', `Я не впевнений, але я думаю, що відповідь ${answer.innerText}`);
            }
        })
        lifelineFriendCall.style.display = 'none';
    }
}

function handlePopUp(handler, type, message) {
    let wrapper = document.querySelector('.wrapper');
    let popUp = document.querySelector('.pop-up');
    let popUpMessage = document.querySelector('.pop-up-message');
    let btnYes = document.querySelector('.pop-up-yes');
    let btnNo = document.querySelector('.pop-up-no');
    let btnNext = document.querySelector('.pop-up-next');
    let btnOK = document.querySelector('.pop-up-ok');

    if (handler === 'add') {
        btnYes.style.display = 'none';
        btnNo.style.display = 'none';
        btnNext.style.display = 'none';
        btnOK.style.display = 'none';

        popUpMessage.textContent = message;

        switch (type) {
            case ('endgame'):
                btnYes.style.display = 'block';
                btnNo.style.display = 'block';
                btnYes.onclick = () => {
                    isAnswered = true;
                    clearTimeout(timerun);
                    handlePopUp('remove');
                    handlePopUp('add', 'gameover', `Дякуємо за участь, заходьте ще! Ви забираєте ₴${currentBank}!`);
                }
                btnNo.onclick = () => handlePopUp('remove');
                break;

            case ('gameover'):
                btnOK.style.display = 'block';
                btnOK.onclick = () => {
                    handlePopUp('remove');
                    formGameOverScreen();
                }
                break;

            case ('call'):
                btnOK.style.display = 'block';
                btnOK.onclick = () => handlePopUp('remove');
                break;

            case ('next'):
                btnNext.style.display = 'block';
                btnNext.onclick = () => {
                    handlePopUp('remove');
                    questionsInfoCounter++;
                    playGame();
                    console.log('click');
                }
                break;
        }

        popUp.classList.add('active');
        wrapper.classList.add('overlay');

    } else {
        popUp.classList.remove('active');
        wrapper.classList.remove('overlay');
    }
}

function countdown() {
    let timer = document.querySelector('.question__timer');

    timeLeft--;
    seconds = timeLeft;

    if (timeLeft < 11) {
        timer.style.color = 'red';
    }

    timer.innerHTML = `
        00:${(seconds < 10) ? '0' + seconds : seconds}
    `;


    if (timeLeft <= 0 && !isAnswered) {
        setTimeout(() => {
            isAnswered = true;
            handlePopUp('add', 'gameover', `На жаль, ви вичерпали свій час! Ви забираєте ₴${currentPriceGuaranteed}`);
        }, 100)
    }

    if (isAnswered) {
        clearTimeout(timerun);
    } else {
        if (timeLeft > 0) {
            timerun = setTimeout(countdown, 1000);
        }
    }
}

function randomizeNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formGameOverScreen() {
    let game = document.querySelector('.game');
    let gameOverScreen = document.querySelector('.game-over-screen');
    game.style.display = 'none';
    gameOverScreen.style.display = '';
}
