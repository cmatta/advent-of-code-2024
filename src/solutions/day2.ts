import { readInput, parseLines } from '../utils/input';

const DAY = '2';

export function allIncrease(input: number[]): boolean {
  return input.slice(1)
    .map((curr, i) => [input[i], curr])
    .filter(([prev, curr]) => curr > prev)
    .length == (input.length - 1);
}

export function allDecrease(input: number[]): boolean {
  return input.slice(1)
    .map((curr, i) => [input[i], curr])
    .filter(([prev, curr]) => curr < prev)
    .length == (input.length - 1);
}

export function correctDiff(input: number[]): boolean {
  return input.slice(1)
    .map((curr, i) => [input[i], curr])
    .filter(([prev, curr]) => (Math.abs(curr - prev) >= 1 && Math.abs(curr - prev) <= 3))
    .length == (input.length - 1);
}

export function part1(input: string): number {
  const lines = parseLines(input);
  // Your solution here
  let safeReports: number = 0;

  for(const report of lines) {
    const levels: number[] = report.split(' ').map(Number);
    const isMonotonic = allIncrease(levels) || allDecrease(levels);
    if(isMonotonic && correctDiff(levels)) safeReports += 1;
    
  }
  return safeReports;
}

export function part2(input: string): number {
  const lines = parseLines(input);
  let safeReports: number = 0;
  // Your solution here
  for (const report of lines) {
    const levels: number[] = report.split(' ').map(Number);
    for (let i = 0; i < levels.length; i++) {
      const newLevels = levels.filter((_, idx) => idx !== i)
      const isMonotonic = allIncrease(newLevels) || allDecrease(newLevels)
      if (isMonotonic && correctDiff(newLevels)) {
        safeReports += 1; 
        break;
      }
    }
  }
  
  return safeReports;
}

// Run the solutions
if (require.main === module) {
  const input = readInput(Number(DAY));
  console.log(`Day ${DAY} - Part 1:`, part1(input));
  console.log(`Day ${DAY} - Part 2:`, part2(input));
}
