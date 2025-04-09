const hasWord = Symbol("hasWord");

type ITrie = {
  [char: string]: ITrie;
  [hasWord]: boolean;
};

export class Trie {
  private _trie: ITrie = {
    [hasWord]: false,
  };
  constructor(wordList: string[]) {
    wordList.forEach((word) => {
      Trie.insertWord(this._trie, word);
    });
  }

  public toString() {
    return Trie._toString(this._trie, "");
  }

  private static _toString(trie: ITrie, padding: string) {
    const recursiveParts: string[] = [];
    Object.keys(trie).forEach((char) => {
      if (char.length !== 1) {
        return;
      }
      recursiveParts.push(
        `${padding}  ${char}: ${Trie._toString(trie[char], padding + "  ")}`
      );
    });
    const nested = recursiveParts.length === 0 ? "" : recursiveParts.join(`\n`);
    return (
      `Trie {\n` +
      `${padding}  hasWord: ${trie[hasWord]}\n` +
      nested +
      `${padding}}\n`
    );
  }

  private static insertWord(trie: ITrie, word: string) {
    if (!word) {
      return;
    }
    let t = trie;
    for (const char of word) {
      if (!t[char]) {
        t[char] = {
          [hasWord]: false,
        };
      }
      t = t[char];
    }
    t[hasWord] = true;
    return;
  }

  public hasPerfectMatch(target: string): boolean {
    let t = this._trie;
    for (const char of target) {
      if (!t[char]) {
        return false;
      }
      t = t[char];
    }
    return t[hasWord];
  }

  public getWordsWithPrefix(prefix: string): string[] {
    // traversal prefix to get sub trie that all words under it words start with prefix
    let t = this._trie;
    for (const char of prefix) {
      if (!t[char]) {
        return [];
      }
      t = t[char];
    }

    // get words under sub trie
    const res: string[] = [];
    const bfs = (t: ITrie, prevMatch: string) => {
      if (t[hasWord]) {
        res.push(prevMatch);
      }
      Object.keys(t).forEach((char) => {
        if (char.length !== 1) {
          return;
        }
        const nextTrie = t[char];
        if (!nextTrie) {
          return;
        }
        bfs(nextTrie, prevMatch + char);
      });
    };
    bfs(t, prefix);
    return res;
  }
}
