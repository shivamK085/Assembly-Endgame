import React from "react"
import { languages } from "./languages"
import clsx from "clsx"

export default function Hangman() {

    // State values
    const [currentWord, setCurrentWord] = React.useState("react")
    const [guessedLetters, setGuessedLetters] = React.useState([])

    // Derived values
    const wrongGuessCount = guessedLetters.filter(letter => !currentWord.includes(letter)).length

    console.log(wrongGuessCount)


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
                    className={className} 
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
            color: item.color,
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

    function handleClick(event){
        const letter = event.target.textContent

        setGuessedLetters(prevArr =>
            prevArr.includes(letter) ?
                prevArr :
                [...prevArr, letter]
        )
    }


    return (
        <main>
            <header>
                <h1>Assembly: Endgame</h1>
                <p>Guess the word in under 8 attempts to
                    save the programming world from Assembly!</p>
            </header>
            <section className="game-status">
                <h2>You Win!</h2>
                <p>Well done!🎊</p>
            </section>
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
                <button className="new-game-btn">New Game</button>
            </section>
        </main>
    )
}