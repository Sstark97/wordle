import {fromEvent, Observer, Subject} from "rxjs"
import WORD_LIST from "./wordList.json"
import "./style.css"

const onKeyDown$ = fromEvent<KeyboardEvent>(document, "keydown")
const userWin$ = new Subject()

const allRows = document.querySelectorAll(".letter-row")
const messageText = document.querySelector("#message-text")
const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]

console.log(randomWord)

let userAnswer: string[] = []
let letterRow = 0
let letterCol = 0

const insertLetter: Observer<KeyboardEvent> = {
    next: (event) => {
        const allowedLetters = /^[a-zA-Z\s\b]$/
        const { key } = event
        const pressedKey = key.toUpperCase()

        if(pressedKey.match(allowedLetters)) {
            const currentRow = allRows[letterRow]

            if (currentRow && currentRow.children[letterCol]) {
                const currentLetter = currentRow.children[letterCol]
                currentLetter.textContent = pressedKey
                currentLetter.classList.add("filled-letter")
                letterCol ++
                userAnswer.push(pressedKey)
            }
        }
    },
    error: (error) => console.log(error),
    complete: () => {}
}

const deleteLetter: Observer<KeyboardEvent> = {
    next: (event) => {
        const { key: pressedKey } = event

        if (pressedKey === "Backspace" && letterCol !== 0) {
            const current = allRows[letterRow].children[userAnswer.length - 1];
            current.textContent = "";
            current.classList = "letter";
            letterCol--;
            userAnswer.pop();
        }
    },
    error: (error) => console.log(error),
    complete: () => {}
}
const checkWord: Observer<KeyboardEvent> = {
    next: (event) => {
        const { key: pressedKey } = event

        if(pressedKey === "Enter") {
            const userWord = userAnswer.join("").toUpperCase()

            if(userWord.length === randomWord.length) {
                letterRow ++
                letterCol = 0
                userAnswer = []
            } else {
                messageText.textContent = "You have to fill all the letters"
            }

            if (userWord === randomWord) {
                userWin$.next("win")
            }
        }
    },
    error: (error) => console.log(error),
    complete: () => {}
}

onKeyDown$.subscribe(insertLetter)
onKeyDown$.subscribe(deleteLetter)
onKeyDown$.subscribe(checkWord)
userWin$.subscribe((result) => {
    const currentRow = Array.from(allRows)[letterRow]
    const childrenRow = Array.from(currentRow.children)

    console.log(result)

    if(result === "win") {
        childrenRow.forEach((letter) => {
            letter.classList.add("letter-green")
        })
    }
})

