export function genRandomDataset(
  size: number,
  {
    maxWordLength,
    minWordLength,
    charset,
  }: {
    maxWordLength: number;
    minWordLength: number;
    charset: string[];
  }
): string[] {
  const dataset: string[] = [];
  for (; size > 0; size--) {
    dataset.push(genRandomWord({ maxWordLength, minWordLength, charset }));
  }
  return dataset;
}

function genRandomWord({
  maxWordLength,
  minWordLength,
  charset,
}: {
  maxWordLength: number;
  minWordLength: number;
  charset: string[];
}) {
  const n = charset.length;
  let wordLen = randomInt(minWordLength, maxWordLength);
  let word = "";
  for (; wordLen > 0; wordLen--) {
    const i = randomInt(0, n);
    word += charset[i];
  }
  return word;
}

function randomInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min));
}
