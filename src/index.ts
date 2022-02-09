import { answers } from './assets/wordleAnswers'
import { createFrequencyArray } from './processingHelper'

const letterFreq = createFrequencyArray(answers)

console.log(letterFreq)
