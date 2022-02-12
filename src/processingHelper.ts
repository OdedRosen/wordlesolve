export type Letter = string
export type LetterArray<Type> = Type[]

export const LETTERS_IN_ALPHABET = 26
export const WORD_LENGTH = 5

export const sortSolutionsMapByScore = (wordScoreMap: Map<string, number>): [string, number][] => {
  const unsortedWordScoreMap = [...wordScoreMap]
  const wordScoreMapSortedByScore = unsortedWordScoreMap.sort(([, score1], [, score2]) => score2 - score1)
  return wordScoreMapSortedByScore
}

export const sortSolutionsListByScore = (wordScoreList: [string, number][]): [string, number][] => {
  const wordScoreMapSortedByScore = wordScoreList.sort(([, score1], [, score2]) => score2 - score1)
  return wordScoreMapSortedByScore
}

export const letterCounter = (letterArray: LetterArray<number>, word: string): LetterArray<number> => {
  const wordLetters = getWordLettersAsArray(word)
  wordLetters.forEach((letter) => {
    letterArray[getLetterIndex(letter)]++
  })
  return letterArray
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

export const hasAnyLetter = (word: string, letters: Letter[]): boolean => {
  const wordLetters = getWordLettersAsArray(word)
  let result = false
  wordLetters.forEach((wordLetter) => {
    if (letters.includes(wordLetter)) {
      result = true
    }
  })
  return result
}

export const hasGreenLetter = (word: string, greenString: string): boolean => {
  for (let i = 0; i < word.length; i++) {
    if (word.charAt(i) === greenString.charAt(i)) {
      return true
    }
  }
  return false
}

const getLetterIndex = (letter: Letter): number => {
  const letterAsciiCode = letter.charCodeAt(0)
  return letterAsciiCode - 97
}
