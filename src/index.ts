import { answers } from './assets/wordleAnswers'
// import { possible } from './assets/wordlePossible'
import { createFrequencyArray, solve } from './processor'

const letterFreq = createFrequencyArray(answers)

// const set1 = getTopWords(possible, letterFreq)
// const set2 = getTopWords(possible, letterFreq, ['o', 'a', 't', 'e', 'r'])
// const set3 = getTopWords(possible, letterFreq, ['o', 'a', 't', 'e', 'r', 'l', 'i', 'n', 'g', 's'])

console.log(solve(answers, letterFreq, '?n??t', [['e', 0]], ['r', 'i', 'o', 's', 'b', 'u', 'm', 'p', 'y', 'a', 'c']))
