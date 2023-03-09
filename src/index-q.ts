import readline from 'readline-promise'
import { stdin as input, stdout as output } from 'node:process'
import { addGuessFeedback, createGuessFromUserFeedback, initiateGame, makeGuess } from './gameRunner'

const runQuordleGame = async (): Promise<void> => {
  const rl = readline.createInterface({ input, output, terminal: true })
  const game1 = initiateGame()
  const game2 = initiateGame()
  const game3 = initiateGame()
  const game4 = initiateGame()

  let isDone1 = false
  let isDone2 = false
  let isDone3 = false
  let isDone4 = false

  while (!isDone1 || !isDone2 || !isDone3 || !isDone4) {
    let guessWord

    if (!isDone1) {
      guessWord = makeGuess(game1)
    } else if (!isDone2) {
      guessWord = makeGuess(game2)
    } else if (!isDone3) {
      guessWord = makeGuess(game3)
    } else {
      guessWord = makeGuess(game4)
    }

    console.log(`Guess: \x1b[1m${guessWord}\x1b[0m`)
    if (!isDone1) {
      const gString1 = await rl.questionAsync('1. Location of \x1b[32mGREEN\x1b[0m (1-5, separated by space): ')
      const yString1 = await rl.questionAsync('1. Location of \x1b[33mYELLOW\x1b[0m (1-5, separated by space): ')
      const guessFeedback1 = createGuessFromUserFeedback(guessWord, gString1, yString1)
      addGuessFeedback(game1, guessFeedback1)
    }

    if (!isDone2) {
      const gString2 = await rl.questionAsync('2. Location of \x1b[32mGREEN\x1b[0m (1-5, separated by space): ')
      const yString2 = await rl.questionAsync('2. Location of \x1b[33mYELLOW\x1b[0m (1-5, separated by space): ')
      const guessFeedback2 = createGuessFromUserFeedback(guessWord, gString2, yString2)
      addGuessFeedback(game2, guessFeedback2)
    }

    if (!isDone3) {
      const gString3 = await rl.questionAsync('3. Location of \x1b[32mGREEN\x1b[0m (1-5, separated by space): ')
      const yString3 = await rl.questionAsync('3. Location of \x1b[33mYELLOW\x1b[0m (1-5, separated by space): ')
      const guessFeedback3 = createGuessFromUserFeedback(guessWord, gString3, yString3)
      addGuessFeedback(game3, guessFeedback3)
    }

    if (!isDone4) {
      const gString4 = await rl.questionAsync('4. Location of \x1b[32mGREEN\x1b[0m (1-5, separated by space): ')
      const yString4 = await rl.questionAsync('4. Location of \x1b[33mYELLOW\x1b[0m (1-5, separated by space): ')
      const guessFeedback4 = createGuessFromUserFeedback(guessWord, gString4, yString4)
      addGuessFeedback(game4, guessFeedback4)
    }

    isDone1 = game1.guesses[game1.guesses.length - 1].greenLocations.length === 5
    isDone2 = game2.guesses[game2.guesses.length - 1].greenLocations.length === 5
    isDone3 = game3.guesses[game3.guesses.length - 1].greenLocations.length === 5
    isDone4 = game4.guesses[game4.guesses.length - 1].greenLocations.length === 5
  }

  if (isDone1 && isDone2 && isDone3 && isDone4) {
    console.log('Woohoo!')
  }
  rl.close()
}

runQuordleGame()
