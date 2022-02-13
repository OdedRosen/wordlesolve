import { GameState, Guess, initializeGameWithUnknownWord } from './game'
import { getSolutions } from './solver'
import { answers } from '../assets/wordleAnswers'
import { possible } from '../assets/wordlePossible'

const INITIAL_WORD = 'slate'
const GUESS_THRESHOLD = 10

const fullList = [...answers, ...possible]

export const initiateGame = (): GameState => {
  return initializeGameWithUnknownWord()
}

export const makeGuess = (game: GameState): string => {
  if (game.guesses.length === 0) {
    return INITIAL_WORD
  }

  const solutionsFromFullList = getSolutions(fullList, game)
  const solutionsFromAnswersList = getSolutions(answers, game)
  let chosenSolution = ''

  if (solutionsFromAnswersList.length <= GUESS_THRESHOLD) {
    chosenSolution = solutionsFromAnswersList[0][0]
  } else {
    chosenSolution = solutionsFromFullList[0][0]
  }

  return chosenSolution
}

export const addGuessFeedback = (game: GameState, guess: Guess): void => {
  game.guesses.push(guess)
}

export const createGuessFromUserFeedback = (word: string, greenString: string, yellowString: string): Guess => {
  const yellowLocations = yellowString.split(' ').map((locStr) => parseInt(locStr, 10) - 1)
  const greenLocations = greenString.split(' ').map((locStr) => parseInt(locStr, 10) - 1)
  const guess: Guess = {
    word,
    yellowLocations,
    greenLocations
  }
  return guess
}
