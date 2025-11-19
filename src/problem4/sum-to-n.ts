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
