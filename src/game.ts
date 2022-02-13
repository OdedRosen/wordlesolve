import { getWordLettersAsArray, Letter, WORD_LENGTH } from './processingHelper'

export interface Guess {
  word: string
  yellowLocations: number[]
  greenLocations: number[]
}

export interface GameState {
  guesses: Guess[]
  targetWord: string
}

export const initializeGameWithRandomWord = (sourceArray: string[]): GameState => {
  const targetWord = sourceArray[Math.floor(Math.random() * sourceArray.length)]
  return {
    guesses: [],
    targetWord
  }
}

export const initializeGameWithGivenWord = (word: string): GameState => {
  return {
    guesses: [],
    targetWord: word
  }
}

export const initializeGameWithUnknownWord = (): GameState => {
  return {
    guesses: [],
    targetWord: ''
  }
}

export const addGuess = (game: GameState, newGuess: string): void => {
  game.guesses.push(compareGuessWordToTargetWord(game.targetWord, newGuess))
}

const compareGuessWordToTargetWord = (targetWord: string, newGuess: string): Guess => {
  const greenLocations: number[] = []
  const yellowLocations: number[] = []
  let targetWordEdited = targetWord

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (newGuess.charAt(i) === targetWordEdited.charAt(i)) {
      greenLocations.push(i)
      targetWordEdited = replaceAt(targetWordEdited, i, '?')
    }
  }

  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = newGuess.charAt(i)
    if ([...targetWordEdited].includes(char)) {
      yellowLocations.push(i)
      targetWordEdited = replaceAt(targetWordEdited, targetWordEdited.indexOf(char), '?')
    }
  }

  return {
    word: newGuess,
    yellowLocations,
    greenLocations
  }
}

const replaceAt = (word: string, index: number, replacement: string): string => {
  return word.substring(0, index) + replacement + word.substring(index + 1)
}

export const getGuessPrintCode = (guess: Guess): string => {
  let result = ''
  for (let i = 0; i < WORD_LENGTH; i++) {
    const letter = guess.word.charAt(i)
    if (guess.greenLocations.includes(i)) {
      result = result + '\x1b[32m' + letter + '\x1b[0m'
    } else if (guess.yellowLocations.includes(i)) {
      result = result + '\x1b[33m' + letter + '\x1b[0m'
    } else {
      result += letter
    }
  }
  return result
}

export const printGame = (game: GameState): void => {
  let gameString = ''
  game.guesses.forEach((guess) => {
    gameString += getGuessPrintCode(guess) + ' '
  })

  console.log(gameString, game.guesses.length)
}

export const getGreenString = (lastGuess: Guess): string => {
  let result = ''
  for (let i = 0; i < WORD_LENGTH; i++) {
    const letter = lastGuess.word.charAt(i)
    if (lastGuess.greenLocations.includes(i)) {
      result += letter
    } else {
      result += '?'
    }
  }
  return result
}

export const getYellowPatterns = (game: GameState): [Letter, number][] => {
  const result: Set<[Letter, number]> = new Set<[Letter, number]>()
  const reversedGuesses = [...game.guesses].reverse()
  const [lastGuess, ...prevGuesses] = reversedGuesses

  lastGuess.yellowLocations.forEach((yellowLocation) => {
    const locArray: [Letter, number] = [lastGuess.word.charAt(yellowLocation), yellowLocation]
    result.add(locArray)
  })

  const greenString = getGreenString(lastGuess)
  prevGuesses.forEach((prevGuess) => {
    prevGuess.yellowLocations.forEach((yellowLocation) => {
      if (!greenString.includes(prevGuess.word.charAt(yellowLocation))) {
        const locArray: [Letter, number] = [prevGuess.word.charAt(yellowLocation), yellowLocation]
        if (!result.has(locArray)) {
          result.add(locArray)
        }
      }
    })
  })

  return [...result]
}

export const getGrayLetters = (game: GameState, greenString: string, yellowPatterns: [Letter, number][]): string[] => {
  const result: Set<string> = new Set<string>()

  game.guesses.forEach((guess) => {
    for (let i = 0; i < WORD_LENGTH; i++) {
      if (!guess.greenLocations.includes(i) && !guess.yellowLocations.includes(i)) {
        result.add(guess.word.charAt(i))
      }
    }
  })

  getWordLettersAsArray(greenString).forEach((greenLetter) => {
    if (greenLetter !== '?' && result.has(greenLetter)) {
      result.delete(greenLetter)
    }
  })

  yellowPatterns.forEach(([yellowLetter]) => {
    if (result.has(yellowLetter)) {
      result.delete(yellowLetter)
    }
  })

  return [...result]
}
