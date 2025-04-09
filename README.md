# 🔍 Trie vs Binary Search – TypeScript Implementation

A TypeScript project that implements a **Trie (Prefix Tree)** and compares its efficiency—both **runtime** and **memory usage**—against **Binary Search**, using randomly generated datasets. Ideal for educational purposes.

## 🧩 Why Use a Trie?

- 📈 Fast prefix lookups (ideal for autocomplete, dictionary apps)
- 🧠 More memory-hungry but faster search than binary search for large and prefix-heavy datasets

## 📦 Built With

- TypeScript
- Node.js
- Jest (for testing)
- `process.memoryUsage` for memory profiling

## ✅ Future Improvements

- Visualization via CLI graphs or web dashboard (D3, Chart.js)
- Trie compression (Radix Tree)
- Benchmark against other data structures (e.g., HashMap)

## 📁 Directory Structure

```
├── src/
|   ├──libs
|   │   ├── index.ts                      # Entry point
|   │   ├── trie.ts                       # Trie implementation
|   │   ├── trie.test.ts                  # Trie test
|   │   ├── binarySearch.ts               # Binary search utility
|   │   ├── genRandomDataset.ts           # Random dataset generation
|   │   ├── shuffle.ts                    # Random sampling from dataset
│── index.ts                              # Entry point for comparing
├── README.md
├── tsconfig.json
├── package.json
```

## ⚙️ Getting Started

### Installation

```bash
git clone git@github.com:Ellie-Yen/js_trie.git
npm install
```

### Run Tests

To see the basic operations in trie, including find perfect matches, find all words start with prefix.

```bash
npm run test
```

### Run the Benchmark

You can modify constants in `index.ts` to see how dataset size, word length affecting the result.

```bash
npm run start
```

This runs the benchmark and prints a performance summary to the console.

### Sample Output

```
dataset = 50000
┌────────────────────┬────────────────────┬────────────────────┬────────────────────┬──────────┐
│      (index)       │     totalTime      │     buildTime      │     searchTime     │ memUsage │
├────────────────────┼────────────────────┼────────────────────┼────────────────────┼──────────┤
│ metricBinarySearch │ 79.90579200023785  │ 60.88962499983609  │ 19.016167000401765 │ [Object] │
│     metricTrie     │ 324.07620800007135 │ 210.06033300003037 │ 114.01587500004098 │ [Object] │
└────────────────────┴────────────────────┴────────────────────┴────────────────────┴──────────┘
┌───────────────────────┬───────────┬───────────┬───────────┬──────────┬──────────────┐
│        (index)        │    rss    │ heapTotal │ heapUsed  │ external │ arrayBuffers │
├───────────────────────┼───────────┼───────────┼───────────┼──────────┼──────────────┤
│ memUsage_BinarySearch │ 390201344 │ 284983296 │ 248860248 │ 3878748  │   2356718    │
│     memUsage_Trie     │ 475168768 │ 407830528 │ 357457800 │ 3870596  │   2348526    │
└───────────────────────┴───────────┴───────────┴───────────┴──────────┴──────────────┘
```
