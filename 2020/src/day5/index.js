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

/* PART 1 */
const goA = (input) => {
  return input
    .map((seatSpecification) => getSeatingPosition(seatSpecification))
    .reduce((highestID, curr) => (curr.id > highestID ? curr.id : highestID), 0)
}

/* PART 2 */
const goB = (input) => {
  const seats = input.map((seatSpecification) =>
    getSeatingPosition(seatSpecification)
  )

  // create array with seats that do not have neighbors
  return seats
    .sort((a, b) => a.id - b.id)
    .reduce(
      (acc, curr, idx, seatsArr) =>
        curr.id - 1 === (idx - 1 >= 0 && seats[idx - 1].id) &&
        curr.id + 1 === (idx + 1 < seatsArr.length && seats[idx + 1].id)
          ? [...acc]
          : [...acc, curr],
      []
    )
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
