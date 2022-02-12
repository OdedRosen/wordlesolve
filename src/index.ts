import { answers } from '../assets/wordleAnswers'
import { possible } from '../assets/wordlePossible'
import { addGuess, GameState, initializeGameWithGivenWord, printGame } from './game'
import { getSolutions } from './solver'

// Super parameters:
const INITIAL_WORD = 'saice'
const GUESS_THRESHOLD = 10

const fullList = [...answers, ...possible]
const games: GameState[] = []

const playWord = (word: string): GameState => {
  const game = initializeGameWithGivenWord(word)

  console.log('')
  console.log(`Target word: ${game.targetWord}`)

  addGuess(game, INITIAL_WORD)

  let solutionsFromFullList = getSolutions(fullList, game)
  let solutionsFromAnswersList = getSolutions(answers, game)

  while (game.guesses[game.guesses.length - 1].greenLocations.length < 5 && game.guesses.length < 7) {
    if (solutionsFromAnswersList.length <= GUESS_THRESHOLD) {
      addGuess(game, solutionsFromAnswersList[0][0])
    } else {
      addGuess(game, solutionsFromFullList[0][0])
    }

    solutionsFromFullList = getSolutions(fullList, game)
    solutionsFromAnswersList = getSolutions(answers, game)
  }

  printGame(game)
  if (game.guesses[game.guesses.length - 1].greenLocations.length === 5) {
    console.log(`done in ${game.guesses.length} guesses`)
  } else {
    console.log(`failed`)
  }

  return game
}

const first15words = [...answers]
first15words.splice(100)

first15words.forEach((word) => {
  const gameResult = playWord(word)
  games.push(gameResult)
})

const attemptHistogram: number[] = Array(6).fill(0)

games.forEach((game) => {
  attemptHistogram[game.guesses.length - 1]++
})

console.log(attemptHistogram)
