import React from "react"
import { languages } from "./languages"
import clsx from "clsx"
import { getFarewellText, getRandomWord } from "./utils"

export default function Hangman() {

    // State values
    const [currentWord, setCurrentWord] = React.useState(getRandomWord)
    const [guessedLetters, setGuessedLetters] = React.useState([])

    // Derived values
    const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length

    const isGameWon = currentWord.split("").every(letter => guessedLetters.includes(letter))
    const isGameLost = wrongGuessCount >= languages.length - 1

    const isGameOver = isGameWon || isGameLost
    const lastGuess = guessedLetters[guessedLetters.length - 1]

    const isLastGuessIncorrect = lastGuess && !currentWord.includes(lastGuess)

    console.log(currentWord)



    // console.log(wrongGuessCount)


    // Static values
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    const keyElements = alphabet.split("").map((letter, index) => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
        const className = clsx(
            {
                "key": true,
                "correct-char": isCorrect,
                "wrong-char": isWrong
            }
        )


        return (
            <button
                key={index}
                aria-disabled={guessedLetters.includes(letter)}
                aria-label={`letter ${letter}`}
                className={className}
                disabled={isGameOver}
                onClick={handleClick}>
                {letter}
            </button>
        )
    })



    const charEls = currentWord.split("").map((letter, index) => {

        return <span
            className="letter"
            key={index}>
            {guessedLetters.includes(letter) ? letter : ""}
        </span>
    })



    const langChips = languages.map((item, index) => {
        const styles = {
            backgroundColor: item.backgroundColor,
            color: item.color
        }

        return (
            <span
                key={item.name}
                style={styles}
                className={index < wrongGuessCount ? "lost" : "chips"}>
                {item.name}
            </span>
        )
    })

    function handleClick(event) {
        const letter = event.target.textContent

        setGuessedLetters(prevArr =>
            prevArr.includes(letter) ?
                prevArr :
                [...prevArr, letter]
        )
    }

    const gameStatusClass = clsx("game-status", {
        "won": isGameWon,
        "lose": isGameLost,
        "playing": !isGameOver && isLastGuessIncorrect
    })


    function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return (
                <p>{getFarewellText(languages[wrongGuessCount - 1].name)}</p>
            )
        }

        if (isGameWon) {
            return (
                <>
                    <h2>You Win!</h2>
                    <p>Well done!🎊</p>
                </>
            )
        }
        else if (isGameLost) {
            return (
                <>
                    <h2>Game Over!</h2>
                    <p>You Lost! Better start learning Assembly!😭</p>
                </>
            )
        }
        else {
            return null
        }
    }

    function startNewGame(){
        setCurrentWord(getRandomWord)
        setGuessedLetters([])
    }



    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word in under 8 attempts to
                    save the programming world from Assembly!</p>
            </header>
            <section aria-live="polie"
                role="status"
                className={gameStatusClass}>
                {renderGameStatus()}
            </section >
            <section className="language-chips">
                {langChips}
            </section>
            <section className="display-word">
                {charEls}
            </section>
            <section className="keyboard">
                {keyElements}
            </section>
            <section>
                {isGameOver && <button className="new-game-btn" onClick={startNewGame}>New Game</button>}
            </section>
        </main >
    )
}