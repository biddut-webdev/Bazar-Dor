
const Loading = () => {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">

      <div className="mb-8 flex items-center gap-3">

        <div className="skeleton h-12 w-12 rounded-full"></div>

        <div>
          <div className="skeleton h-8 w-40"></div>

          <div className="skeleton mt-2 h-4 w-64"></div>
        </div>

      </div>

      <div className="mb-6 flex justify-end">
        <div className="skeleton h-12 w-full sm:w-52"></div>
      </div>


      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {[1, 2, 3, 4, 5, 6, 7, 8].map(
          (item) => (
            <div
              key={item}
              className="rounded-2xl border border-base-300 bg-base-100 p-4"
            >

              <div className="flex items-center gap-3">

                <div className="skeleton h-14 w-14 shrink-0 rounded-xl"></div>

                <div className="flex-1">

                  <div className="skeleton h-5 w-28"></div>

                  <div className="skeleton mt-2 h-4 w-20"></div>

                </div>

              </div>

              <div className="mt-5">

                <div className="skeleton h-4 w-20"></div>

                <div className="skeleton mt-2 h-7 w-28"></div>

              </div>

              <div className="mt-3 flex justify-end">

                <div className="skeleton h-7 w-16 rounded-full"></div>

              </div>

            </div>
          )
        )}

      </div>

    </main>
  );
};

export default Loading;
