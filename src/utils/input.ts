import { readFileSync } from 'fs';
import { join } from 'path';

export function readInput(day: number): string {
  const inputPath = join(__dirname, '..', 'inputs', `day${day}.txt`);
  return readFileSync(inputPath, 'utf-8').trim();
}

export function parseLines(input: string): string[] {
  return input.split('\n');
}
