import { part1, part2 } from './day1';

describe('Day 1', () => {
  const exampleInput = `3   4
4   3
2   5
1   3
3   9
3   3`;

  test('part 1', () => {
    expect(part1(exampleInput)).toBe(11);
  });

  test('part 2', () => {
    expect(part2(exampleInput)).toBe(31);
  });
});