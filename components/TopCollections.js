import React from 'react'

const TopCollections = () => {
  return (
    <div>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <h1 className="pt-20 pb-10 text-center text-3xl font-semibold text-white">
            Top collections
          </h1>
          <div class="inline-block min-w-full py-2 px-12 md:px-60 ">
            <div class="overflow-hidden">
              <table class="min-w-full">
                <tbody>
                  <tr class="border-b border-primary-color-6 transition duration-300 ease-in-out hover:bg-primary-color-hover">
                    <td class="whitespace-nowrap px-6 py-4 text-sm font-light text-white">
                      <a href="/">
                        <div className="flex items-center space-x-2">
                          <div className="space-y-1 font-medium">
                            <div>1</div>
                          </div>
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://img-ae.seadn.io/https%3A%2F%2Flh3.googleusercontent.com%2F7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ%3Ds10000?fit=max&h=120&w=120&auto=format&s=65b159799dcff448deaf9106b1ead13e"
                            alt=""
                          />
                          <div className="space-y-1 font-medium">
                            <div>Mark</div>
                          </div>
                        </div>
                      </a>
                    </td>

                    <td class="whitespace-nowrap px-6 py-4 text-right text-sm font-light text-white">
                      <button>
                        <div className="container flex justify-between rounded-lg border px-2 text-center text-gray-400 hover:text-white focus:text-white">
                          <div className="my-2">Add Watchlist</div>
                        </div>
                      </button>
                    </td>
                  </tr>
                  <tr class="border-b border-primary-color-6 transition duration-300 ease-in-out hover:bg-primary-color-hover">
                    <td class="whitespace-nowrap px-6 py-4 text-sm font-light text-white">
                      <a href="/">
                        <div className="flex items-center space-x-2">
                          <div className="space-y-1 font-medium">
                            <div>2</div>
                          </div>
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://img-ae.seadn.io/https%3A%2F%2Flh3.googleusercontent.com%2F7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ%3Ds10000?fit=max&h=120&w=120&auto=format&s=65b159799dcff448deaf9106b1ead13e"
                            alt=""
                          />
                          <div className="space-y-1 font-medium">
                            <div>Mark</div>
                          </div>
                        </div>
                      </a>
                    </td>

                    <td class="whitespace-nowrap px-6 py-4 text-right text-sm font-light text-white">
                      <button>
                        <div className="container flex justify-between rounded-lg border px-2 text-center text-gray-400 hover:text-white focus:text-white">
                          <div className="my-2">Add Watchlist</div>
                        </div>
                      </button>
                    </td>
                  </tr>
                  <tr class="border-b border-primary-color-6 transition duration-300 ease-in-out hover:bg-primary-color-hover">
                    <td class="whitespace-nowrap px-6 py-4 text-sm font-light text-white">
                      <a href="/">
                        <div className="flex items-center space-x-2">
                          <div className="space-y-1 font-medium">
                            <div>3</div>
                          </div>
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://img-ae.seadn.io/https%3A%2F%2Flh3.googleusercontent.com%2F7B0qai02OdHA8P_EOVK672qUliyjQdQDGNrACxs7WnTgZAkJa_wWURnIFKeOh5VTf8cfTqW3wQpozGedaC9mteKphEOtztls02RlWQ%3Ds10000?fit=max&h=120&w=120&auto=format&s=65b159799dcff448deaf9106b1ead13e"
                            alt=""
                          />
                          <div className="space-y-1 font-medium">
                            <div>Mark</div>
                          </div>
                        </div>
                      </a>
                    </td>

                    <td class="whitespace-nowrap px-6 py-4 text-right text-sm font-light text-white">
                      <button>
                        <div className="container flex justify-between rounded-lg border px-2 text-center text-gray-400 hover:text-white focus:text-white">
                          <div className="my-2">Add Watchlist</div>
                        </div>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopCollections
