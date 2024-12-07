import { findGuard, isInBounds, parseMap, part1, part2 } from './day6';

describe('Day 6', () => {
  const exampleInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;
const guardMap = parseMap(exampleInput);
const guardPos = findGuard(guardMap);
  
  test('Find Guard', () => {
    expect(guardPos).toEqual([6, 4]);
  });

  test('returns true for valid coordinates', () => {
    expect(isInBounds(guardMap, [0, 0])).toBe(true);  // top-left
    expect(isInBounds(guardMap, [5, 5])).toBe(true);  // middle
    expect(isInBounds(guardMap, [9, 9])).toBe(true);  // bottom-right
  });

  test('returns false for out-of-bounds coordinates', () => {
    expect(isInBounds(guardMap, [-1, 0])).toBe(false);  // above grid
    expect(isInBounds(guardMap, [0, -1])).toBe(false);  // left of grid
    expect(isInBounds(guardMap, [10, 0])).toBe(false);   // below grid
    expect(isInBounds(guardMap, [0, 10])).toBe(false);   // right of grid
  });

  test('Day 6 part 1', () => {
    expect(part1(exampleInput)).toBe(41);
  });

  test('Day 6 part 2', () => {
    expect(part2(exampleInput)).toBe(6);
  });
});