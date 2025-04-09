export class BinarySearch {
  private sorted: string[] = [];

  constructor(wordList: string[]) {
    // can use binary insert, skip implementation here
    this.sorted = wordList.toSorted();
  }

  public hasPerfectMatch(target: string): boolean {
    let [lo, hi] = [0, this.sorted.length];
    while (lo < hi) {
      const mid = lo + ((hi - lo) >> 1);
      const word = this.sorted[mid];
      // console.log(lo, hi, mid, word, target);
      if (word === target) {
        return true;
      }
      if (word > target) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }

    return false;
  }
}
