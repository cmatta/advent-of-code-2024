import { allDecrease, allIncrease, part1, part2 } from './day2';

describe('Day 2', () => {
  const exampleInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

describe('Day 2 Helper Functions', () => {
  describe('allIncrease', () => {
    it('should return true for strictly increasing numbers', () => {
      expect(allIncrease([1, 2, 3, 4])).toBe(true);
      expect(allIncrease([0, 5, 10])).toBe(true);
    });

    it('should return false for non-increasing numbers', () => {
      expect(allIncrease([1, 2, 2, 3])).toBe(false);
      expect(allIncrease([1, 3, 2])).toBe(false);
      expect(allIncrease([4, 3, 2, 1])).toBe(false);
    });

    it('should handle single number array', () => {
      expect(allIncrease([1])).toBe(true);
    });
  });

  describe('allDecrease', () => {
    it('should return true for strictly decreasing numbers', () => {
      expect(allDecrease([4, 3, 2, 1])).toBe(true);
      expect(allDecrease([10, 5, 0])).toBe(true);
    });

    it('should return false for non-decreasing numbers', () => {
      expect(allDecrease([3, 2, 2, 1])).toBe(false);
      expect(allDecrease([3, 2, 4])).toBe(false);
      expect(allDecrease([1, 2, 3, 4])).toBe(false);
    });

    it('should handle single number array', () => {
      expect(allDecrease([1])).toBe(true);
    });
  });
});


  test('Day 2 part 1', () => {
    expect(part1(exampleInput)).toBe(2);
  });

  test('Day 2 part 2', () => {
    expect(part2(exampleInput)).toBe(4);
  });
});