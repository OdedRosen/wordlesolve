import {
  Letter,
  LetterArray,
  LETTERS_IN_ALPHABET,
  letterCounter,
  sortSolutionsMapByScore,
  scoreWord,
  hasAnyLetter,
  getWordLettersAsArray,
  sortSolutionsListByScore,
  hasGreenLetter
} from './processingHelper'

export const createFrequencyArray = (answers: string[]): LetterArray<number> => {
  const emptyLetterArray = new Array(LETTERS_IN_ALPHABET).fill(0)
  const numberOfLettersInSample = answers.length * 5

  const letterCount = answers.reduce(letterCounter, emptyLetterArray)

  const frequencyArray = letterCount.map((count) => {
    return (1.0 * count) / numberOfLettersInSample
  })

  return frequencyArray
}

export const getTopWordsByLetterFreq = (
  sourceArray: string[],
  frequencyArray: LetterArray<number>,
  excludeLetters?: Letter[]
) => {
  const possibleWordsScoreMap = new Map<string, number>()
  sourceArray.forEach((possibleWord) => {
    possibleWordsScoreMap.set(possibleWord, scoreWord(possibleWord, frequencyArray, excludeLetters))
  })

  return sortSolutionsMapByScore(possibleWordsScoreMap)
}

export const getTopWordsByContainingAnyLetter = (
  possibleArray: string[],
  answersArray: string[]
): [string, number][] => {
  return getTopWordsByScoringFunction(possibleArray, answersArray, getWordsContainingAnyLetter)
}

export const getTopWordsByMostGreenLetters = (possibleArray: string[], answersArray: string[]): [string, number][] => {
  return getTopWordsByScoringFunction(possibleArray, answersArray, getWordsWithGreenLetters)
}

export const getTopWordsByCombinedYellowOrGreenFreq = (
  possibleArray: string[],
  answersArray: string[]
): [string, number][] => {
  return getTopWordsByScoringFunction(possibleArray, answersArray, getWordsByCombinedYellowOrGreenFreq)
}

interface ScoringFunction {
  (answersArray: string[], word: string): number
}
const getTopWordsByScoringFunction = (
  possibleArray: string[],
  answersArray: string[],
  scoringFunction: ScoringFunction
): [string, number][] => {
  const numberOfAnswers = answersArray.length

  const result = possibleArray.map((possibleWord) => {
    const wordScoreTuple: [string, number] = [
      possibleWord,
      (1.0 * scoringFunction(answersArray, possibleWord)) / numberOfAnswers
    ]
    return wordScoreTuple
  })
  return sortSolutionsListByScore(result)
}

const getWordsContainingAnyLetter = (sourceArray: string[], yellowString: string): number => {
  const letters = getWordLettersAsArray(yellowString)
  return sourceArray.filter((word) => hasAnyLetter(word, letters)).length
}

const getWordsWithGreenLetters = (sourceArray: string[], greenString: string): number => {
  return sourceArray.filter((word) => hasGreenLetter(word, greenString)).length
}

export const getWordsByCombinedYellowOrGreenFreq = (sourceArray: string[], word: string): number => {
  return getWordsContainingAnyLetter(sourceArray, word) + getWordsWithGreenLetters(sourceArray, word)
}
