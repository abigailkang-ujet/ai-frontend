export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">API Portal</h1>
        <p className="text-gray-600 mb-8">
          Frontend application for API documentation
        </p>
        <a
          href="/design"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          View QuickStart Page
        </a>
      </div>
    </main>
  );
}

