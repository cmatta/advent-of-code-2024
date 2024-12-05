import { isInbounds, part1, part2 } from './day4';

describe('Day 4', () => {
  const exampleInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
  
  test(' Day 4 part 1', () => {
    expect(part1(exampleInput)).toBe(18);
  });

  test('Day 4 part 2', () => {
    expect(part2(exampleInput)).toBe(9);
  });
});

describe('isInbounds', () => {
  const puzzle = [
    ['A', 'B', 'C'],
    ['D', 'E', 'F'],
    ['G', 'H', 'I']
  ];

  test('returns true for valid coordinates', () => {
    expect(isInbounds(puzzle, 0, 0)).toBe(true);  // top-left
    expect(isInbounds(puzzle, 2, 2)).toBe(true);  // bottom-right
    expect(isInbounds(puzzle, 1, 1)).toBe(true);  // middle
  });

  test('returns false for out of bounds coordinates', () => {
    // Test negative coordinates
    expect(isInbounds(puzzle, -1, 0)).toBe(false);
    expect(isInbounds(puzzle, 0, -1)).toBe(false);
    
    // Test coordinates beyond array bounds
    expect(isInbounds(puzzle, 3, 0)).toBe(false);
    expect(isInbounds(puzzle, 0, 3)).toBe(false);
    
    // Test diagonal out of bounds
    expect(isInbounds(puzzle, 3, 3)).toBe(false);
  });
});