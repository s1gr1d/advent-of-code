const { test, readInput } = require('../utils')

const prepareInput = (rawInput) => {
  const inputArray = rawInput.split(/\n/)

  return inputArray.map((val) => {
    const split1 = val.split('-')
    const split2 = split1[1].split(' ')
    const split3 = split2[1].split(':')
    const split4 = split2[2].split('\r')

    const min = Number(split1[0])
    const max = Number(split2[0])
    const letter = split3[0]
    const password = split4[0]
    return { min, max, letter, password }
  })
}

const input = prepareInput(readInput())

const goA = (input) =>
  input.reduce((validPwCount, pwdInfo) => {
    const chars = pwdInfo.password.split('')

    // count how many of the given letter are within the string
    const givenLetterCount = chars.reduce((nrOfLetters, char) => {
      return char === pwdInfo.letter ? nrOfLetters + 1 : nrOfLetters
    }, 0)

    // check if the given letter count is within the valid range
    return givenLetterCount >= pwdInfo.min && givenLetterCount <= pwdInfo.max
      ? validPwCount + 1
      : validPwCount
  }, 0)

const goB = (input) =>
  input.reduce((validPwCount, pwdInfo) => {
    const chars = pwdInfo.password.split('')

    // check if letters are on each position
    const fistPosContainsLetter = chars[pwdInfo.min - 1] === pwdInfo.letter
    const secondPosContainsLetter = chars[pwdInfo.max - 1] === pwdInfo.letter

    // just one position is allowed to contain the letter
    return (fistPosContainsLetter || secondPosContainsLetter) &&
      !(fistPosContainsLetter && secondPosContainsLetter)
      ? validPwCount + 1
      : validPwCount
  }, 0)

/* Tests */

// test(result, expected)

/* Results */

console.time('Time')
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd('Time')

console.log('Solution to part 1:', resultA)
console.log('Solution to part 2:', resultB)
