import { Trie } from "./trie";

describe("demo", () => {
  const wordList = ["aaabc", "aacs", "bb"];
  const trie = new Trie(wordList);

  console.log(trie.toString());

  test("perfect match", () => {
    expect(trie.hasPerfectMatch("aaabc")).toBe(true);
    expect(trie.hasPerfectMatch("aaab")).toBe(false);
    expect(trie.hasPerfectMatch("xx")).toBe(false);
  });

  test("prefix", () => {
    expect(trie.getWordsWithPrefix("aa")).toEqual(["aaabc", "aacs"]);
    expect(trie.getWordsWithPrefix("n")).toEqual([]);
  });
});
