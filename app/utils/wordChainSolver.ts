function isOneLetterDifference(word1: string, word2: string): boolean {
  if (word1.length !== word2.length) return false;
  let differences = 0;
  for (let i = 0; i < word1.length; i++) {
    if (word1[i] !== word2[i]) differences++;
    if (differences > 1) return false;
  }
  return differences === 1;
}

export function findWordChain(
  start: string,
  end: string,
  dictionary: string[]
): string[] | null {
  const queue: [string, string[]][] = [[start, [start]]];
  const visited = new Set<string>([start]);

  while (queue.length > 0) {
    const [currentWord, path] = queue.shift()!;

    if (currentWord === end) {
      return path;
    }

    for (const word of dictionary) {
      if (!visited.has(word) && isOneLetterDifference(currentWord, word)) {
        visited.add(word);
        queue.push([word, [...path, word]]);
      }
    }
  }

  return null;
}
