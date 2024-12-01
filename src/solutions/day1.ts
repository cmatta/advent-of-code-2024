import { off } from 'process';
import { readInput, parseLines } from '../utils/input';
import { count } from 'console';

interface ParsedLists {
  readonly list1: number[];
  readonly list2: number[];
}

function getSortedLists(input: string[]): ParsedLists {
  return {
    list1: input.map(line => Number(line.split(/\s+/)[0])).sort(),
    list2: input.map(line => Number(line.split(/\s+/)[1])).sort()
  }
}

export function part1(input: string): number {
  const lines = parseLines(input);
  // Your solution here
  const {list1, list2 } = getSortedLists(lines);
  const distances = list1.map((num, i) => Math.abs(num - list2[i]));
  return distances.reduce((acc, curr) => acc + curr, 0);
}

function countOccurrences(input: number[], member: number): number {
  return input.filter(num => num === member).length;
}

export function part2(input: string): number {
  const lines = parseLines(input);
  // Your solution here
  const {list1, list2 } = getSortedLists(lines);
  return list1
    .map(num => num * countOccurrences(list2, num))
    .reduce((sum, curr) => sum + curr, 0);
}

// Run the solutions
if (require.main === module) {
  const input = readInput(1); // reads day1.txt
  console.log('Part 1:', part1(input));
  console.log('Part 2:', part2(input));
}
