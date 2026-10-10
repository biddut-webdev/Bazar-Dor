const Loading = () => {
  return (
    <main className="mx-auto min-h-screen max-w-6xl px-4 py-8">
      <div className="mb-8 h-64 animate-pulse rounded-3xl bg-gray-200 sm:h-80" />

      <div className="mb-5 h-8 w-48 animate-pulse rounded bg-gray-200" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 bg-white/80 p-4"
          >
            <div className="h-32 animate-pulse rounded-xl bg-gray-200" />
            <div className="mt-4 h-5 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-gray-200" />
            <div className="mt-4 h-7 w-2/3 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Loading;