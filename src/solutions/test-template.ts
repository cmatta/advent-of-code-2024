import { part1, part2 } from './day__DAY__';

describe('Day __DAY__', () => {
  const exampleInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

  test(' Day __DAY__ part 1', () => {
    expect(part1(exampleInput)).toBe(142);
  });

  test('Day __DAY__ part 2', () => {
    expect(part2(exampleInput)).toBe(0);
  });
});