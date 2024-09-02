import { dictionary, fourLetterWords } from './dictionary';

export const isValidWord = (word: string, wordLength: number): boolean => {
  const validWords = wordLength === 3 ? dictionary : fourLetterWords;
  return validWords.includes(word);
};

export const isOneLetterChange = (
  currentWord: string,
  newWord: string
): boolean => {
  if (currentWord.length !== newWord.length) return false;
  let differences = 0;
  for (let i = 0; i < currentWord.length; i++) {
    if (currentWord[i] !== newWord[i]) differences++;
    if (differences > 1) return false;
  }
  return differences === 1;
};

export function validateWordChange(
  currentWord: string,
  newWord: string,
  wordLength: number
): { isValid: boolean; message: string } {
  const validWords = wordLength === 3 ? dictionary : fourLetterWords;

  // Check if the word length matches the expected length
  if (newWord.length !== wordLength) {
    return { isValid: false, message: `Must be ${wordLength} letters` };
  }

  // Check if the word is in the dictionary first
  if (!validWords.includes(newWord)) {
    return { isValid: false, message: 'Not in word list' };
  }

  // Check for one letter difference
  if (currentWord === newWord) {
    return { isValid: false, message: 'Word must be different' };
  }

  let differences = 0;
  for (let i = 0; i < wordLength; i++) {
    if (currentWord[i] !== newWord[i]) {
      differences++;
    }
    if (differences > 1) {
      return { isValid: false, message: 'Only one letter change' };
    }
  }

  return { isValid: true, message: '' };
}
