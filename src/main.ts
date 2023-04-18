import { fromEvent, Observer } from "rxjs"
import "./style.css"

const onKeyDown$ = fromEvent<KeyboardEvent>(document, "keydown")
let letterRow = 0
let letterCol = 0

const insertLetter: Observer<KeyboardEvent> = {
    next: (event) => {
        const allowedLetters = /^[a-zA-Z\s\b]$/
        const { key } = event
        const pressedKey = key.toUpperCase()

        // || pressedKey === "BACKSPACE"

        if(pressedKey.match(allowedLetters)) {
            const allRows = document.querySelectorAll(".letter-row")
            const currentRow = allRows[letterRow]

            if (currentRow && letterCol < currentRow.children.length) {
                const currentLetter = currentRow.children[letterCol]
                currentLetter.textContent = pressedKey
                currentLetter.classList.add("filled-letter")
                letterCol ++
            } else {
                letterCol = 0
                letterRow++
            }
        }
    },
    error: (error) => console.log(error),
    complete: () => {}
}

const deleteLetter: Observer<KeyboardEvent> = {
    next: (event) => {
        const { key: pressedKey } = event

        // || pressedKey === "BACKSPACE"

        if(pressedKey === "Backspace") {
            const allRows = document.querySelectorAll(".letter-row")
            const currentRow = allRows[letterRow]

            if (currentRow && letterCol > 0) {
                const currentLetter = currentRow.children[letterCol]
                currentLetter.textContent = ""
                currentLetter.classList.remove("filled-letter")
                letterCol --
            } else if(currentRow && letterRow > 0) {
                letterCol = currentRow.children.length
                letterRow++
            } else {
                letterCol = allRows.length
                letterRow = allRows.length
            }
        }
    },
    error: (error) => console.log(error),
    complete: () => {}
}

onKeyDown$.subscribe(insertLetter)
/*onKeyDown$.subscribe(deleteLetter)*/
