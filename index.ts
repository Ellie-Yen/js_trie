import {
  Trie,
  BinarySearch,
  genRandomDataset,
  fisherYatesShuffle,
} from "./libs";

const DATA_SET_SIZE = 50_000;
const CHARSET_SIZE = 20;
const MAX_WORD_LEN = 100;
const MIN_WORD_LEN = 50;
const CHARSET = Array.from(new Array(CHARSET_SIZE)).map((_, i) =>
  String.fromCharCode(197 + i)
);

type Data = {
  dataset: string[];
  perfectMatchTargets: string[];
  notMatchTargets: string[];
};

function initData(): Data {
  const dataset = genRandomDataset(DATA_SET_SIZE, {
    maxWordLength: MAX_WORD_LEN,
    minWordLength: MIN_WORD_LEN,
    charset: CHARSET,
  });

  const perfectMatchTargets = fisherYatesShuffle(
    dataset.concat(dataset),
    Math.ceil((DATA_SET_SIZE * 3) / 4)
  );

  const notMatchTargets = fisherYatesShuffle(
    dataset.concat(dataset),
    Math.ceil(DATA_SET_SIZE / 2)
  ).map((str, i) => (i % 2 ? str + "XXX" : "XXX" + str));

  return {
    dataset,
    perfectMatchTargets,
    notMatchTargets,
  };
}

function useTrie(data: Data) {
  const t1 = performance.now();
  const trie = new Trie(data.dataset);
  const t2 = performance.now();
  data.perfectMatchTargets.forEach((v) => {
    const isFind = trie.hasPerfectMatch(v);
    if (!isFind) {
      throw new Error(`failed to match ${v}`);
    }
  });
  data.notMatchTargets.forEach((v) => {
    const isFind = trie.hasPerfectMatch(v);
    if (isFind) {
      throw new Error(`failed to mismatch ${v}`);
    }
  });
  const tEnd = performance.now();
  return {
    totalTime: tEnd - t1,
    buildTime: t2 - t1,
    searchTime: tEnd - t2,
    memUsage: process.memoryUsage(),
  };
}

function useBinarySearch(data: Data) {
  const t1 = performance.now();
  const bs = new BinarySearch(data.dataset);
  const t2 = performance.now();
  data.perfectMatchTargets.forEach((v) => {
    const isFind = bs.hasPerfectMatch(v);
    if (!isFind) {
      throw new Error(`failed to match ${v}`);
    }
  });
  data.notMatchTargets.forEach((v) => {
    const isFind = bs.hasPerfectMatch(v);
    if (isFind) {
      throw new Error(`failed to mismatch ${v}`);
    }
  });
  const tEnd = performance.now();
  return {
    totalTime: tEnd - t1,
    buildTime: t2 - t1,
    searchTime: tEnd - t2,
    memUsage: process.memoryUsage(),
  };
}

function main() {
  const data = initData();
  console.log(`dataset = ${DATA_SET_SIZE}`);
  const metricBinarySearch = useBinarySearch(data);
  const metricTrie = useTrie(data);
  console.table({
    metricBinarySearch,
    metricTrie,
  });
  console.table({
    memUsage_BinarySearch: metricBinarySearch.memUsage,
    memUsage_Trie: metricTrie.memUsage,
  });
}

main();
