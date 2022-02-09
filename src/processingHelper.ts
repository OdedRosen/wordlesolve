export const createFrequencyArray = (answers: string[]): { [key: string]: number }[] => {
  const letterCount = answers.reduce(letterCounter, {})
  const numberOfLettersInSample = answers.length * 5

  const frequencyArray = Object.entries(letterCount).map(([letter, count]) => {
    const freqObj: { [key: string]: number } = {}
    freqObj[letter] = (1.0 * count) / numberOfLettersInSample
    return freqObj
  })

  return frequencyArray
}

const letterCounter = (letterMap: { [key: string]: number }, word: string): { [key: string]: number } => {
  const letterArray = [...word]
  letterArray.forEach((letter) => {
    if (letter in letterMap) {
      letterMap[letter]++
    } else {
      letterMap[letter] = 1
    }
  })
  return letterMap
}
