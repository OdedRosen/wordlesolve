export type Letter = string
export type LetterArray<Type> = Type[]

export const LETTERS_IN_ALPHABET = 26
export const WORD_LENGTH = 5

export const sortSolutionsByScore = (wordScoreMap: Map<string, number>): [string, number][] => {
  const unsortedWordScoreMap = [...wordScoreMap]
  const wordScoreMapSortedByScore = unsortedWordScoreMap.sort(([, score1], [, score2]) => score2 - score1)
  return wordScoreMapSortedByScore
}

export const letterCounter = (letterArray: LetterArray<number>, word: string): LetterArray<number> => {
  const wordLetters = getWordLettersAsArray(word)
  wordLetters.forEach((letter) => {
    letterArray[getLetterIndex(letter)]++
  })
  return letterArray
}

export const getLetterIndex = (letter: Letter): number => {
  const letterAsciiCode = letter.charCodeAt(0)
  return letterAsciiCode - 97
}

export const scoreWord = (word: string, frequencyArray: LetterArray<number>, excludeLetters?: Letter[]): number => {
  const wordLetters = getWordLettersAsArray(word)
  let dedupedLetters = [...new Set(wordLetters)]
  if (excludeLetters) {
    dedupedLetters = dedupedLetters.filter((letter) => !excludeLetters.includes(letter))
  }

  const score = dedupedLetters.reduce((currentScore: number, letter: Letter) => {
    return currentScore + frequencyArray[getLetterIndex(letter)]
  }, 0)

  return score
}

export const getWordLettersAsArray = (word: string): Letter[] => {
  return [...word]
}
