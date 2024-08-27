# Word Chains Game

This is a Next.js project that implements a Word Chains game. Players must transform a starting word into an ending word by changing one letter at a time, with each intermediate word being a valid word in the dictionary.

## Getting Started

First, run the development server:

npm run dev

# or

yarn dev

# or

pnpm dev

# or

bun dev

Open http://localhost:3000 with your browser to see the result.

## Game Rules

1. You start with a 3-letter word and must reach another 3-letter word.
2. You can only change one letter at a time.
3. Each word you create must be a valid word in the game's dictionary.
4. You have a maximum of 10 attempts to reach the target word.

## Project Structure

- app/components/WordChainsGame.tsx: Main game component
- app/utils/dictionary.ts: List of valid words for the game
- app/utils/wordChainSolver.ts: Algorithm to find a solution path between two words

## Features

- Random selection of start and end words
- Input validation for word length and one-letter difference
- Dictionary check for valid words
- Game state management (attempts, messages, game over conditions)
- Solution finder to ensure solvable word pairs

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

## Learn More

To learn more about Next.js, check out the following resources:

- Next.js Documentation - learn about Next.js features and API.
- Learn Next.js - an interactive Next.js tutorial.

You can check out the Next.js GitHub repository - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out our Next.js deployment documentation for more details.
