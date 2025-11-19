// Overall space and time complexity: O(n)
function sumToNForLoop(n: number): number {
  let sum = 0; // O(1) space
  for (let i = 1; i <= n; i++) { // O(n) time
    sum += i; // O(1) time
  }
  return sum; // O(1) time
}

// sumToNForLoop(5) must return 15
// sumToNForLoop(8) must return 36
console.log(`${sumToNForLoop(8)}`);

// =============================================================================

// Overall space and time complexity: O(n)
function sumToNRecursive(n: number): number {
  if (n === 1) return 1; // base case
  return n + sumToNRecursive(n - 1); // recursive case
}

// sumToNRecursive(5) must return 15
// sumToNRecursive(8) must return 36
console.log(`${sumToNRecursive(8)}`);

// =============================================================================

// Overall space and time complexity: O(1)
function sumToNFormula(n: number): number {
  return (n * (n + 1)) / 2;
}

// sumToNFormula(5) must return 15
// sumToNFormula(8) must return 36
console.log(`${sumToNFormula(8)}`);
