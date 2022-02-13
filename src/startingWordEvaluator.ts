import { answers } from '../assets/wordleAnswers'
import { possible } from '../assets/wordlePossible'
import { addGuess, GameState, getGuessPrintCode, initializeGameWithGivenWord, printGame } from './game'
import { getSolutions } from './solver'

const fullList = [...answers, ...possible]

const playWord = (
  targetWord: string,
  initialWord: string,
  guessThreshold: number,
  memo: Map<string, string>
): GameState => {
  const game = initializeGameWithGivenWord(targetWord)

  addGuess(game, initialWord)
  const memoCode = getGuessPrintCode(game.guesses[0])
  let chosenSolution = ''
  let solutionsFromFullList: [string, number][] = []
  let solutionsFromAnswersList: [string, number][] = []

  if (memo.has(memoCode) || game.guesses[0].greenLocations.length === 5) {
    chosenSolution = memo.get(memoCode) || ''
  } else {
    solutionsFromFullList = getSolutions(fullList, game)
    solutionsFromAnswersList = getSolutions(answers, game)
    if (solutionsFromAnswersList.length <= guessThreshold) {
      chosenSolution = solutionsFromAnswersList[0][0]
    } else {
      chosenSolution = solutionsFromFullList[0][0]
    }
    memo.set(memoCode, chosenSolution)
  }

  while (game.guesses[game.guesses.length - 1].greenLocations.length < 5 && game.guesses.length < 7) {
    if (chosenSolution !== '') {
      addGuess(game, chosenSolution)
      chosenSolution = ''
    } else {
      if (solutionsFromAnswersList.length <= guessThreshold) {
        addGuess(game, solutionsFromAnswersList[0][0])
      } else {
        addGuess(game, solutionsFromFullList[0][0])
      }
    }

    solutionsFromFullList = getSolutions(fullList, game)
    solutionsFromAnswersList = getSolutions(answers, game)
  }

  printGame(game)
  return game
}

export const evaluateStartingWord = (startingWord: string, guessThreshold: number, sample: boolean): number[] => {
  const memo: Map<string, string> = new Map<string, string>()

  const games: GameState[] = []

  const attemptHistogram: number[] = Array(10).fill(0)
  let wordSet = [...answers]
  if (sample) {
    wordSet = wordSet.filter((word, i) => i % 10 === 0)
  }

  wordSet.forEach((targetWord) => {
    const gameResult = playWord(targetWord, startingWord, guessThreshold, memo)
    games.push(gameResult)
    attemptHistogram[gameResult.guesses.length - 1]++
  })

  return attemptHistogram
}
