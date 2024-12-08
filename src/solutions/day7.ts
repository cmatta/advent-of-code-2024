import { readInput, parseLines } from '../utils/input';

const DAY = '7';

function generateOperatorCombos(length: number, validOperators: string[]): string[][] {

    function recurse(current: string[]): string[][] {
        
        if (current.length === length) {
            return [current];
        }

        let results: string[][] = [];
        for (const op of validOperators) {
            results = results.concat(
                recurse([...current, op])
            );
        }
        return results;
    }

    return recurse([]);
}

function evaluateLeftToRight(numbers: number[], operators: string[]): number {
    let result = numbers[0];  // Start with first number
    
    for (let i = 0; i < operators.length; i++) {
        const nextNum = numbers[i + 1];
        const op = operators[i];
        
        if (op === '+') {
            result += nextNum;
        } else if (op === '*') {
            result *= nextNum;
        } else if (op === '||') {
            result = Number(String(result) + String(nextNum));
        }
    }
    return result;
}

export function part1(input: string): number {
  const lines = parseLines(input);
  // Your solution here
  const validOperators = ['+', '*'];
  const validLines = new Set<string>();
  for (const line of lines) {
    const [answer, numberString] = line.split(':').map(x => x.trim());
    const numbers = numberString.split(' ').map(n => Number(n));
    const operatorCombos = generateOperatorCombos(numbers.length - 1, validOperators);
    
    for (const combo of operatorCombos) {
      if (evaluateLeftToRight(numbers, combo) === Number(answer)) {
        validLines.add(line);
      }
    }

  }

  return [...validLines].map((l: string) => Number(l.split(":")[0]))
    .reduce((sum, curr) => curr + sum, 0);

}

export function part2(input: string): number {
  const lines = parseLines(input);
  // Your solution here
  const validOperators = ['+', '*', '||'];
  const validLines = new Set<string>();
  for (const line of lines) {
    const [answer, numberString] = line.split(':').map(x => x.trim());
    const numbers = numberString.split(' ').map(n => Number(n));
    const operatorCombos = generateOperatorCombos(numbers.length - 1, validOperators);
    
    for (const combo of operatorCombos) {
      if (evaluateLeftToRight(numbers, combo) === Number(answer)) {
        validLines.add(line);
      }
    }
  }

  return [...validLines].map((l: string) => Number(l.split(":")[0]))
    .reduce((sum, curr) => curr + sum, 0);
}

// Run the solutions
if (require.main === module) {
  const input = readInput(Number(DAY));
  console.log(`Day ${DAY} - Part 1:`, part1(input));
  console.log(`Day ${DAY} - Part 2:`, part2(input));
}
