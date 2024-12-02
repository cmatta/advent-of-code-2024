import { readInput, parseLines } from '../utils/input';

const DAY = '__DAY__';

export function part1(input: string): number {
  const lines = parseLines(input);
  // Your solution here

  return 0;
}

export function part2(input: string): number {
  const lines = parseLines(input);
  // Your solution here
  
  return 0;
}

// Run the solutions
if (require.main === module) {
  const input = readInput(Number(DAY));
  console.log(`Day ${DAY} - Part 1:`, part1(input));
  console.log(`Day ${DAY} - Part 2:`, part2(input));
}
