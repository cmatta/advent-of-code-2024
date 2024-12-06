import { readInput, parseLines } from '../utils/input';

const DAY = '5';

export function findMiddle(update: string[]): string {
  return update[Math.floor(update.length/2)];
}

export function validUpdate(update: string[], rules: string[][]): boolean {
  return rules.every(rule => {
    if(!update.includes(rule[0]) || !update.includes(rule[1])) return true; // skip rules that don't apply
    const rule1 = update.findIndex((x) => x === rule[0]);
    const rule2 = update.findIndex((x) => x === rule[1]);
    return rule1 < rule2;
  });
}

export function part1(input: string): number {
  // Your solution here
  const [rulesSection, pagesSection] = input.split('\n\n');
  const rules = parseLines(rulesSection).map((line) => line.split('|'));
  const pagesUpdates = parseLines(pagesSection).map((line) => line.split(','));

  const validUpdates = pagesUpdates.filter(update => validUpdate(update, rules));
  const middleNumbers = validUpdates.map(update => findMiddle(update));
  return middleNumbers.reduce((sum, curr) => Number(curr) + sum, 0);
  
}

function sortedUpdate(pages: string[], rules: string[][]): string[] {
  // Create graph of dependencies
  const graph = new Map();  // what comes after each page
  const inDegree = new Map(); // how many things must come before each page
  
  // Initialize maps
  pages.forEach(page => {
    graph.set(page, []);
    inDegree.set(page, 0);
  });
  
  // Build graph from applicable rules
  rules.forEach(rule => {
    if (pages.includes(rule[0]) && pages.includes(rule[1])) {
      graph.get(rule[0]).push(rule[1]);
      inDegree.set(rule[1], inDegree.get(rule[1]) + 1);
    }
  });
  
  // Find nodes with no dependencies
  const queue = pages.filter(page => inDegree.get(page) === 0);
  const result = [];
  
  // Process queue
  while (queue.length > 0) {
    const page = queue.shift();
    if(!page) break;
    result.push(page);
    
    // Remove this page's edges
    for (const nextPage of graph.get(page)) {
      inDegree.set(nextPage, inDegree.get(nextPage) - 1);
      if (inDegree.get(nextPage) === 0) {
        queue.push(nextPage);
      }
    }
  }
  
  return result;
}

export function part2(input: string): number {
  const [rulesSection, pagesSection] = input.split('\n\n');
  const rules = parseLines(rulesSection).map((line) => line.split('|'));
  const pagesUpdates = parseLines(pagesSection).map((line) => line.split(','));
  let pageNumberSum = 0;
  
  const invalidUpdates = pagesUpdates.filter(update => !validUpdate(update, rules));
  const sortedUpdates = invalidUpdates.map((update) => sortedUpdate(update, rules));
  return sortedUpdates.map(update => findMiddle(update))
    .reduce((sum, curr) => Number(curr) + sum, 0);
}

// Run the solutions
if (require.main === module) {
  const input = readInput(Number(DAY));
  console.log(`Day ${DAY} - Part 1:`, part1(input));
  console.log(`Day ${DAY} - Part 2:`, part2(input));
}
