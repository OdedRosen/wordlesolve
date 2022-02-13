import { hasAnyLetter, getWordLettersAsArray, hasGreenLetter } from './processingHelper'

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
