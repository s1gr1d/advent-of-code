import kotlin.math.max

fun main() {
    
    fun getGameId(game: String): Int = game.substringBefore(':').filter { it.isDigit() }.toInt()

    fun getGameSets(game: String): List<String> {
        val afterSemicolon = game.indexOf(':') + 2 // + 2 because of semicolon itself and the space
        return game.substring(afterSemicolon).split(';')
    }

    fun getRedCubesAmount(gameSet: String): Int =
        Regex(""".*?(\d+) red""").find(gameSet)?.groupValues?.get(1)?.toInt() ?: 0

    fun getGreenCubesAmount(gameSet: String): Int =
        Regex(""".*?(\d+) green""").find(gameSet)?.groupValues?.get(1)?.toInt() ?: 0

    fun getBlueCubesAmount(gameSet: String): Int =
        Regex(""".*?(\d+) blue""").find(gameSet)?.groupValues?.get(1)?.toInt() ?: 0


    fun checkIfSetIsValid(gameSet: String): Boolean {
        if (getGreenCubesAmount(gameSet) > 13) return false
        if (getBlueCubesAmount(gameSet) > 14) return false
        return getRedCubesAmount(gameSet) <= 12
    }

    fun getIdOfValidGame(game: String): Int {
        val gameId = getGameId(game)
        val gameSets = getGameSets(game)

        val gameIsPossible =
            gameSets.fold(true) { isPossible, currSet -> if (!isPossible) false else checkIfSetIsValid(currSet) }

        return if (gameIsPossible) gameId else 0
    }

    fun part1(input: List<String>): Int {
        return input.fold(0) { sumOfIds, game -> sumOfIds + getIdOfValidGame(game) }
    }

    fun determineMinNumberOfCubes(game: String): Int {
        val gameSets = getGameSets(game)

        val minRedAmount = gameSets.fold(0) { minAmount, gameSet -> max(minAmount, getRedCubesAmount(gameSet)) }
        val minGreenAmount = gameSets.fold(0) { minAmount, gameSet -> max(minAmount, getGreenCubesAmount(gameSet)) }
        val minBlueAmount = gameSets.fold(0) { minAmount, gameSet -> max(minAmount, getBlueCubesAmount(gameSet)) }

        return minRedAmount * minGreenAmount * minBlueAmount
    }

    fun part2(input: List<String>): Int {
        return input.fold(0) { sum, curr -> sum + determineMinNumberOfCubes(curr) }
    }


    val input = readInput("Day02")
    part1(input).println()
    part2(input).println()
}
