const { test, readInput } = require('../utils')

const prepareInput = (rawInput) => rawInput.split(/\n/)

const input = prepareInput(readInput())

const ROWS = 127
const COLUMNS = 7

/* CALCULATIONS */
const range = ([low, high]) => high - low

const newUpperLimit = ([low, high]) => Math.floor(low + range([low, high]) / 2)
const newLowerLimit = ([low, high]) => Math.ceil(high - range([low, high]) / 2)

const upperHalf = ([low, high]) => [newLowerLimit([low, high]), high]
const lowerHalf = ([low, high]) => [low, newUpperLimit([low, high])]

/* PART 1 */
const goA = (input) => {
  const getSeatingPosition = (seatSpecification) => {
    const row = seatSpecification
      .slice(0, 7)
      .split('')
      .reduce(
        ([lower, upper], char) =>
          char === 'F' ? lowerHalf([lower, upper]) : upperHalf([lower, upper]),
        [0, ROWS]
      )[0]

    const col = seatSpecification
      .slice(7)
      .split('')
      .reduce(
        ([lower, upper], char) =>
          char === 'L' ? lowerHalf([lower, upper]) : upperHalf([lower, upper]),
        [0, COLUMNS]
      )[0]

    return { row, col, id: row * 8 + col }
  }

  return input
    .map((seatSpecification) => getSeatingPosition(seatSpecification))
    .reduce((highestID, curr) => (curr.id > highestID ? curr.id : highestID), 0)
}

const goB = (input) => {
  return
}

/* Tests */

// test(result, expected)

/* Results */

console.time('Time')
const resultA = goA(input)
const resultB = goB(input)
console.timeEnd('Time')

console.log('Solution to part 1:', resultA)
console.log('Solution to part 2:', resultB)
