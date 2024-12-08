import { part1, part2 } from './day7';

describe('Day 7', () => {
  const exampleInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

  test('Day 7 part 1', () => {
    expect(part1(exampleInput)).toBe(3749);
  });

  test('Day 7 part 2', () => {
    expect(part2(exampleInput)).toBe(11387);
  });
});