import { fromEvent, Observer } from "rxjs"
import WORD_LIST from "./wordList.json"
import "./style.css"

const onKeyDown$ = fromEvent<KeyboardEvent>(document, "keydown")

const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)]

console.log(randomWord)
const userAnswer: string[][] = []
let userAnswerByRow: string[] = []
let letterRow = 0
let letterCol = 0

const insertLetter: Observer<KeyboardEvent> = {
    next: (event) => {
        const allowedLetters = /^[a-zA-Z\s\b]$/
        const { key } = event
        const pressedKey = key.toUpperCase()

        if(pressedKey.match(allowedLetters)) {
            const allRows = document.querySelectorAll(".letter-row")
            const currentRow = allRows[letterRow]

            if (currentRow && letterCol < currentRow.children.length) {
                const currentLetter = currentRow.children[letterCol]
                currentLetter.textContent = pressedKey
                currentLetter.classList.add("filled-letter")
                userAnswerByRow.push(pressedKey)
                console.log(userAnswerByRow)
                letterCol ++
            } else {
                letterCol = 0
                letterRow++
            }

            if(currentRow && userAnswerByRow.length === currentRow.children.length) {
                userAnswer.push(userAnswerByRow)
                userAnswerByRow = []
            }
        }
    },
    error: (error) => console.log(error),
    complete: () => {}
}

// const deleteLetter: Observer<KeyboardEvent> = {
//     next: (event) => {
//         const { key: pressedKey } = event
//
//         if(pressedKey === "Backspace") {
//             const allRows = document.querySelectorAll(".letter-row")
//             const currentRow = allRows[letterRow]
//
//             if (currentRow && letterCol > 0) {
//                 const currentLetter = currentRow.children[letterCol]
//                 currentLetter.textContent = ""
//                 currentLetter.classList.remove("filled-letter")
//                 letterCol --
//             } else if(currentRow && letterRow > 0) {
//                 letterCol = currentRow.children.length
//                 letterRow++
//             } else {
//                 letterCol = allRows.length
//                 letterRow = allRows.length
//             }
//         }
//     },
//     error: (error) => console.log(error),
//     complete: () => {}
// }

const checkWord: Observer<KeyboardEvent> = {
    next: (event) => {
        const { key: pressedKey } = event

        if(pressedKey === "Enter") {
            const lastPost = userAnswer.length - 1
            console.log(lastPost)
            console.log(userAnswer)
            console.log(userAnswer.at(lastPost))
        }
    },
    error: (error) => console.log(error),
    complete: () => {}
}

onKeyDown$.subscribe(insertLetter)
onKeyDown$.subscribe(checkWord)
/*onKeyDown$.subscribe(deleteLetter)*/
