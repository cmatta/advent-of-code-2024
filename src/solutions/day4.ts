import { readInput, parseLines } from '../utils/input';

const DAY = '4';

export function isInbounds(puzzle: string[][], x: number, y: number): boolean {
  if (x < 0 || x >= puzzle[0].length || y < 0 || y >= puzzle.length) return false;
  return true;
}

function getDirectionVector(xPos: number, yPos: number, mX: number, mY: number): number[] {
  return [
    Math.sign(mX - xPos),
    Math.sign(mY - yPos)
  ]
}

export function findXMAS(puzzle: string[][], xX: number, xY: number): number[][] {
  const circleCoords = [
    [xX - 1, xY - 1], [xX, xY - 1], [xX + 1, xY - 1],
    [xX - 1, xY], [xX + 1, xY],
    [xX - 1, xY + 1], [xX, xY + 1], [xX + 1, xY + 1]
  ]

  // XMASes will be arrays of XM positions where XMAS was directionally correct
  const xMases: number[][] = [];

  circleCoords.map((pos) => {
    const mX: number = pos[0];
    const mY: number = pos[1];

    if (isInbounds(puzzle, mX, mY)) {
      if (puzzle[mY][mX] === "M") {
        const [dX, dY] = getDirectionVector(xX, xY, mX, mY); 
        const aX = mX + dX;
        const aY = mY + dY;
        if (isInbounds(puzzle, aX, aY) && puzzle[aY][aX] === "A") {
          const sX = aX + dX;
          const sY = aY + dY;
          if (isInbounds(puzzle, sX, sY) && puzzle[sY][sX] === "S") xMases.push([mX, mY]);
        }
      }
    }
  })
  
  return xMases;
}

export function part1(input: string): number {
  const lines = parseLines(input);
  // Your solution here
  const puzzle: string[][] = lines.map(str => str.split(''))
  const result = puzzle.flatMap((line, y) =>  line.map((c, x) => ({c, y, x})))
    .filter(({c}) => c === 'X')
    .flatMap(({y, x}) => findXMAS(puzzle, x, y));

  return result.length;
}


function checkOppositeEnds(puzzle: string[][], pos1: number[], pos2: number[]): boolean {
  const [x1, y1] = pos1;
  const [x2, y2] = pos2;
  
  if (!isInbounds(puzzle, x1, y1) || !isInbounds(puzzle, x2, y2)) return false;
  
  // If one end is M, other must be S (or vice versa)
  return (puzzle[y1][x1] === 'M' && puzzle[y2][x2] === 'S') ||
         (puzzle[y1][x1] === 'S' && puzzle[y2][x2] === 'M');
}

type Coords = [number, number][];

export function checkXMAS(puzzle: string[][], mX: number, mY: number): Coords[] {
  const foundPatterns: Coords[] = [];
  const possibleAcoords: number[][] = [
    [mX - 1, mY - 1], [mX + 1, mY - 1],
    [mX - 1, mY + 1], [mX + 1, mY + 1]
  ]

  for (const [aX, aY] of possibleAcoords) {
    if (!isInbounds(puzzle, aX, aY) || puzzle[aY][aX] !== "A") continue;
    
    // get directional from M to A
    const [dX, dY] = getDirectionVector(mX, mY, aX, aY)

    //possible S
    const sX = aX + dX, sY = aY + dY;
    
    if (!isInbounds(puzzle, sX, sY) || puzzle[sY][sX] !== "S") continue;
    //Now check M and S around the A
    const [end1X, end1Y] = [aX + dX, aY - dY]
    const [end2X, end2Y] = [aX - dX, aY + dY]
    if(checkOppositeEnds(puzzle, [end1X, end1Y], [end2X, end2Y])){
      foundPatterns.push([
        [mX, mY], //Original M
        [aX, aY], //Original A
        [sX, sY], //Original S
        [end1X, end1Y], // Second M/S
        [end2X, end2Y] // Third M/S
      ]);
    }
  }
  
  return foundPatterns;
}


export function part2(input: string): number {
  const lines = parseLines(input);
  // Your solution here
  const xmases = new Set();

  const puzzle: string[][] = lines.map(str => str.split(''));
  
  puzzle.forEach((line, y) => {
    line.forEach((c, x) => {
      if (c === "M") {
        const newPatterns = checkXMAS(puzzle, x, y);
        newPatterns.forEach(coords => {
          xmases.add(coords.sort((a, b) => 
            a[0] === b[0] ? a[1] - b[1]: a[0] - b[0]
        ).join('|'));
        })
      }
    })
  });

  return xmases.size;
}

// Run the solutions
if (require.main === module) {
  const input = readInput(Number(DAY));
  console.log(`Day ${DAY} - Part 1:`, part1(input));
  console.log(`Day ${DAY} - Part 2:`, part2(input));
}
