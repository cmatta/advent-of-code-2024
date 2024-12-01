import { part1, part2 } from './day1';

describe('Day 1', () => {
  const exampleInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

  test('part 1', () => {
    expect(part1(exampleInput)).toBe(142);
  });

  test('part 2', () => {
    expect(part2(exampleInput)).toBe(0);
  });
});