import readline from 'readline-promise'
import { stdin as input, stdout as output } from 'node:process'
import { addGuessFeedback, createGuessFromUserFeedback, initiateGame, makeGuess } from './gameRunner'

const runGame = async (): Promise<void> => {
  const rl = readline.createInterface({ input, output, terminal: true })
  const game = initiateGame()

  let isDone = false
  while (!isDone) {
    const guessWord = makeGuess(game)
    console.log(`Guess: \x1b[1m${guessWord}\x1b[0m`)
    const greenString = await rl.questionAsync('Location of \x1b[32mGREEN\x1b[0m letters (1-5, separated by space): ')
    const yellowString = await rl.questionAsync('Location of \x1b[33mYELLOW\x1b[0m letters (1-5, separated by space): ')

    const guessFeedback = createGuessFromUserFeedback(guessWord, greenString, yellowString)
    addGuessFeedback(game, guessFeedback)

    isDone = game.guesses[game.guesses.length - 1].greenLocations.length === 5
  }

  rl.close()
}

runGame()
