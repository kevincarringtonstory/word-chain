import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-purple-200">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Word Chain</h1>
        <p className="text-xl mb-8">
          Transform words by changing one letter at a time. Reach the target!
        </p>
        <Link
          href="/game"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Play
        </Link>
      </div>
      <div className="mt-16 text-sm">
        <p>
          {new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
        <p>Kevin Carrington</p>
      </div>
    </main>
  );
}
