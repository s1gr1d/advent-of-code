/**
 *  Disclaimer: It works, but I am not proud of this code
 */

fun main() {
    fun isNotPeriodOrDigit(char: Char): Boolean = char != '.' && !char.isDigit()

    fun isNumberAdjacentToSymbol(input: List<String>, currLineIdx: Int, indexesOfNumber: MutableList<Int>): Boolean {
        val firstInLine = 0
        val lastInLine = 139

        val beforeFirstDigitIdx =
            if (indexesOfNumber.first() == firstInLine) firstInLine else indexesOfNumber.first() - 1
        val afterFirstDigitIdx =
            if (indexesOfNumber.last() == lastInLine) lastInLine else indexesOfNumber.last() + 1

        // line above
        if (currLineIdx != 0) {
            val lineAbove = input[currLineIdx - 1]

            if (isNotPeriodOrDigit(lineAbove[beforeFirstDigitIdx]) || isNotPeriodOrDigit(lineAbove[afterFirstDigitIdx])) {
                return true
            }

            for (idx in indexesOfNumber) {
                if (isNotPeriodOrDigit(lineAbove[idx])) {
                    return true
                }
            }
        }

        // current line
        val currentLine = input[currLineIdx]
        if (isNotPeriodOrDigit(currentLine[beforeFirstDigitIdx]) || isNotPeriodOrDigit(currentLine[afterFirstDigitIdx])) {
            return true
        }

        // line below
        if (currLineIdx < input.size - 1) {
            val lineBelow = input[currLineIdx + 1]

            if (isNotPeriodOrDigit(lineBelow[beforeFirstDigitIdx]) || isNotPeriodOrDigit(lineBelow[afterFirstDigitIdx])) {
                return true
            }

            for (idx in indexesOfNumber) {
                if (isNotPeriodOrDigit(lineBelow[idx])) {
                    return true
                }
            }
        }

        return false
    }

    fun addToPartNumbersIfApplicable(
        indexesOfNumber: MutableList<Int>,
        foundNumber: String,
        input: List<String>,
        lineIdx: Int,
        partNumbers: MutableList<Int>
    ) {
        val isAdjacent = isNumberAdjacentToSymbol(input, lineIdx, indexesOfNumber)

        if (isAdjacent) {
            partNumbers.add(foundNumber.toInt())
        }
    }

    fun part1(input: List<String>): Int {
        val partNumbers = mutableListOf<Int>()

        for ((lineIdx, line) in input.withIndex()) {

            val numbersInLines = mutableMapOf<String, MutableList<Int>>()

            val indexes = mutableListOf<Int>()

            var foundNumber = ""

            for ((charIdx, char) in line.withIndex()) {
                if (char.isDigit()) {
                    foundNumber = "$foundNumber$char"
                    indexes.add(charIdx)

                    if (charIdx == line.length - 1) {
                        numbersInLines[foundNumber] = indexes.toMutableList()

                        val indexesOfFoundNumber = numbersInLines[foundNumber]

                        addToPartNumbersIfApplicable(indexesOfFoundNumber!!, foundNumber, input, lineIdx, partNumbers)

                        foundNumber = ""
                        indexes.clear()
                    }
                } else if (foundNumber.isNotEmpty() && !char.isDigit()) {
                    numbersInLines[foundNumber] = indexes.toMutableList()

                    val indexesOfFoundNumber = numbersInLines[foundNumber]

                    addToPartNumbersIfApplicable(indexesOfFoundNumber!!, foundNumber, input, lineIdx, partNumbers)

                    foundNumber = ""
                    indexes.clear()
                }
            }
        }
        return partNumbers.sum()
    }


    fun part2(input: List<String>): Int {
        return input.size
    }

    val input = readInput("Day03")
    part1(input).println()
    part2(input).println()
}



