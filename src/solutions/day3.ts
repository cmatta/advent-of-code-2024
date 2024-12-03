import { readInput, parseLines } from '../utils/input';

const DAY = '3';
const MUL_PATTERN = /mul\(\d{1,3},\d{1,3}\)/g
const CONTROL_PATTERN = /mul\(\d{1,3},\d{1,3}\)|don't\(\)|do\(\)/g;

export function processMul(input: string) {
  const match = input.match(/\((\d{1,3}),(\d{1,3})\)/);
  if (!match) return 0; 
  const [_fullMatch, num1, num2] = match;
  return Number(num1) * Number(num2);
}

export function part1(input: string): number {
  const lines = parseLines(input);
  // Your solution here
  let result = 0;
  const pattern = new RegExp(MUL_PATTERN);
  for (const line of lines) {
    const match = line.match(pattern);
    if (!match) continue;
    result += match.map((mul) => processMul(mul))
      .reduce((sum, curr) => curr + sum, 0);
  }
  return result;
}

export function part2(input: string): number {
  const lines = parseLines(input);
  // Your solution here
  let doContinue = true;
  let result = 0;
  const pattern = new RegExp(CONTROL_PATTERN);
  for (const line of lines) {
    const matches = line.match(pattern);
    if(!matches) continue;
    for (const match of matches) {
      if (match === "don't()") doContinue = false;
      if (match === "do()") doContinue = true;
      if (doContinue && match.match(/^mul/)) {
        result += processMul(match);
      }
    }
  }
  return result;
}

// Run the solutions
if (require.main === module) {
  const input = readInput(Number(DAY));
  console.log(`Day ${DAY} - Part 1:`, part1(input));
  console.log(`Day ${DAY} - Part 2:`, part2(input));
}
