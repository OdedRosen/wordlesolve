import { Letter, sortSolutionsMapByScore, getWordLettersAsArray, WORD_LENGTH } from './processingHelper'
import { getWordsByCombinedYellowOrGreenFreq } from './scorers'
import { GameState, getGrayLetters, getGreenString, getYellowPatterns } from './game'

export const getSolutions = (list: string[], game: GameState) => {
  const greenString = getGreenString(game.guesses[game.guesses.length - 1])
  const yellowPatterns = getYellowPatterns(game)
  const grayLetters = getGrayLetters(game, greenString, yellowPatterns)
  let matchingSolutions = getMatchingSolutions(list, greenString, yellowPatterns, grayLetters)

  matchingSolutions = matchingSolutions.filter(([word]) => {
    let result = true
    game.guesses.forEach((guess) => {
      if (guess.word === word) {
        result = false
      }
    })
    return result
  })
  return matchingSolutions
}

export const getMatchingSolutions = (
  sourceArray: string[],
  greenString: string,
  yellowPatterns: [Letter, number][],
  excludeLetters: Letter[]
): [string, number][] => {
  const possibleSolutionsMap = new Map<string, number>()
  sourceArray.forEach((possibleSolution) => {
    if (wordMatchesConditions(possibleSolution, greenString, yellowPatterns, excludeLetters)) {
      possibleSolutionsMap.set(possibleSolution, getWordsByCombinedYellowOrGreenFreq(sourceArray, possibleSolution))
    }
  })
  return sortSolutionsMapByScore(possibleSolutionsMap)
}

const wordMatchesConditions = (
  word: string,
  greenString: string,
  yellowPatterns: [Letter, number][],
  excludeLetters: Letter[]
): boolean => {
  return (
    matchesGreenString(word, greenString) &&
    matchesYellowPatterns(word, yellowPatterns, greenString) &&
    doesNotHaveExcludedLetters(word, excludeLetters)
  )
}

const matchesGreenString = (word: string, greenString: string): boolean => {
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (!(greenString.charAt(i) === '?' || greenString.charAt(i) === word.charAt(i))) {
      return false
    }
  }
  return true
}

const hasAllYellowLetters = (word: string, yellowLetters: Letter[], greenString: string): boolean => {
  const nonGreenLetters = getNonGreenLetters(word, greenString)

  const yellowLettersNotInWord = [...new Set(yellowLetters)]
  nonGreenLetters.forEach((nonGreenLetter) => {
    if (yellowLettersNotInWord.includes(nonGreenLetter)) {
      yellowLettersNotInWord.splice(yellowLettersNotInWord.indexOf(nonGreenLetter), 1)
    }
  })

  return yellowLettersNotInWord.length === 0
}

const matchesYellowPatterns = (word: string, yellowPatterns: [Letter, number][], greenString: string): boolean => {
  const yellowLetters = yellowPatterns.map(([yellowLetter]) => yellowLetter)

  if (hasAllYellowLetters(word, yellowLetters, greenString)) {
    const wordWithoutGreenLetters = getWordWithoutGreenLetters(word, greenString)
    let matches = true
    yellowPatterns.forEach(([yellowLetter, index]) => {
      if (wordWithoutGreenLetters.charAt(index) === yellowLetter) {
        matches = false
      }
    })
    return matches
  } else {
    return false
  }
}

const doesNotHaveExcludedLetters = (word: string, excludeLetters: Letter[]): boolean => {
  const wordLetters = getWordLettersAsArray(word)
  let hasExcludedLetter = false
  wordLetters.forEach((wordLetter) => {
    if (excludeLetters.includes(wordLetter)) {
      hasExcludedLetter = true
    }
  })
  return !hasExcludedLetter
}

const getNonGreenLetters = (word: string, greenString?: string): Letter[] => {
  if (!greenString) {
    return getWordLettersAsArray(word)
  }

  const result: Letter[] = []

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (greenString.charAt(i) === '?' || greenString.charAt(i) !== word.charAt(i)) {
      result.push(word.charAt(i))
    }
  }
  return result
}

const getWordWithoutGreenLetters = (word: string, greenString: string): string => {
  let result = ''

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (greenString.charAt(i) === word.charAt(i)) {
      result = result.concat('?')
    } else {
      result = result.concat(word.charAt(i))
    }
  }
  return result
}
