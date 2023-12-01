fun main() {

    fun extract2DigitNum(line: String): Int {
        var result = line.filter { it.isDigit() }

        return when (result.length) {
            1 -> "$result$result".toInt()
            else -> "${result.first()}${result.last()}".toInt()
        }
    }

    fun part1(input: List<String>): Int {
        return input.fold(0) { acc, line -> acc + extract2DigitNum(line) }
    }

    fun replaceNumbers(input: String): String {
        // keeping the first and last letters for cases like: "oneight" or "sevenine"
        return input.replace("one", "o1e").replace("two", "t2o").replace("three", "t3e").replace("four", "f4r")
            .replace("five", "f5e").replace("six", "s6x").replace("seven", "s7n").replace("eight", "e8t")
            .replace("nine", "n9e")
    }

    fun part2(input: List<String>): Int {
        var replacedInput = input.map { line -> replaceNumbers(line) }

        return replacedInput.fold(0) { acc, line -> acc + extract2DigitNum(line) }
    }

    val input = readInput("Day01")
    part1(input).println()
    part2(input).println()
}
