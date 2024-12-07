import { readInput, parseLines } from '../utils/input';

const DAY = '6';

type Direction = 'up' | 'right' | 'left' | 'down';
type Position = [number, number]

type Guard = {
  direction: Direction;
  position: Position;
}

const DIRECTIONS = {
  'up': [-1, 0],    // move up (decrease row)
  'right': [0, 1],  // move right (increase column)
  'left': [0, -1],  // move left (decrease column)
  'down': [1, 0]    // move down (increase row)
}

const TURN_RIGHT: Record<Direction, Direction> = {
    'up': 'right',
    'right': 'down',
    'down': 'left',
    'left': 'up'
}

export function findGuard(guardMap: string[][]): Position {
  for (let row = 0; row < guardMap.length; row++) {
    for (let col = 0; col < guardMap[0].length; col++) {
      if (guardMap[row][col] === '^') return [row, col];
    }
  }
  return [-1, -1];
}

export function parseMap(mapInput: string): string[][] {
  const grid = []
  for (const line of mapInput.split('\n')) {
    grid.push(line.split(''));
  }
  return grid;
}

export function isInBounds(guardMap: string[][], guardPos: Position): boolean {
  return guardPos[0] >= 0 && guardPos[0] < guardMap.length && 
    guardPos[1] >= 0 && guardPos[1] < guardMap[0].length;
}

function tryMove(guardMap: string[][], guard: Guard): void {
  const [row, col] = guard.position;
  
  // Keep turning right until we find a valid move or have tried all directions
  for (let attempts = 0; attempts < 4; attempts++) {
    const [dx, dy] = DIRECTIONS[guard.direction];
    const nextPos: Position = [row + dx, col + dy];
    
    // If the next position is clear (or out of bounds), move there
    if (!isInBounds(guardMap, nextPos) || guardMap[nextPos[0]][nextPos[1]] !== "#") {
      guard.position = nextPos;
      return;
    }
    
    // If blocked, turn right and try again
    guard.direction = TURN_RIGHT[guard.direction];
  }
  
  // If we get here, we're completely boxed in (shouldn't happen in this problem)
  guard.position = [row, col];
}

function visualizePath(guardMap: string[][], visitedPositions: Set<string>): string {
    // Create a deep copy of the map
    const visualMap = guardMap.map(row => [...row]);
    
    // Mark all visited positions with 'X'
    for (const posStr of visitedPositions) {
        const [row, col] = posStr.split(',').map(Number);
        if (isInBounds(guardMap, [row, col])) {
            visualMap[row][col] = 'X';
        }
    }
    
    // Convert back to string
    return visualMap.map(row => row.join('')).join('\n');
}

export function part1(input: string): number {
  const guardMap = parseMap(input);
  
  const guard: Guard = {
    position: findGuard(guardMap),
    direction: 'up'
  }

  const visited = new Set<string>();
  while (isInBounds(guardMap, guard.position)) {
    const posKey = `${guard.position[0]},${guard.position[1]}`;
    visited.add(posKey);        
    tryMove(guardMap, guard);
    
  }

  console.log('Final Path');
  console.log(visualizePath(guardMap, visited));
  return visited.size;
}

function findLoopPositions(guardMap: string[][]): Position[] {
    const guardStart = findGuard(guardMap);
    const potentialPositions: Position[] = [];
    
    // Find all empty spaces (except guard start)
    for (let row = 0; row < guardMap.length; row++) {
        for (let col = 0; col < guardMap[0].length; col++) {
            if (guardMap[row][col] === '.' && 
                !(row === guardStart[0] && col === guardStart[1])) {
                potentialPositions.push([row, col]);
            }
        }
    }
    
    // Test each position
    const loopPositions: Position[] = [];
    for (const pos of potentialPositions) {
        // Create a copy of the map with new obstacle
        const testMap = guardMap.map(row => [...row]);
        testMap[pos[0]][pos[1]] = '#';
        
        // Test if this creates a loop
        if (testLoop(testMap, guardStart)) {
            loopPositions.push(pos);
        }
    }
    
    return loopPositions;
}

function testLoop(guardMap: string[][], startPos: Position): boolean {
    const guard: Guard = {
        position: startPos,
        direction: 'up'
    };
    
    const visited = new Set<string>();
    
    while (isInBounds(guardMap, guard.position)) {
        const stateKey = `${guard.position[0]},${guard.position[1]},${guard.direction}`;
        if (visited.has(stateKey)) {
            return true;  // Found a loop!
        }
        visited.add(stateKey);
        tryMove(guardMap, guard);
    }
    
    return false;  // Guard left the map
}


export function part2(input: string): number {
  const guardMap = parseMap(input);
  const loopPositions: Position[] = findLoopPositions(guardMap);
  
  return loopPositions.length;
}

// Run the solutions
if (require.main === module) {
  const input = readInput(Number(DAY));
  console.log(`Day ${DAY} - Part 1:`, part1(input));
  console.log(`Day ${DAY} - Part 2:`, part2(input));
}
