import React from 'react'
import 'tw-elements'

const Carousel = () => {
  return (
    <div>
      <div>
        <section className="mb-40">
          <div>
            <div className="text-md pt-12 text-center text-4xl font-bold text-white drop-shadow-md font-main-font">
              <h3>Buy, sell, and showcase NFTs</h3>
            </div>
            <div className="text-md pt-4 pb-8 text-center text-xl font-bold text-white drop-shadow-md font-main-font">
              <h3>from leading creators and brands</h3>
            </div>

            <div className="container mx-auto flex px-6 md:px-12 xl:px-32">
              <div
                id="carouselDarkVariant"
                className="slide carousel carousel-fade carousel-dark relative object-center shadow-2xl rounded-md shadow-purple-300"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators absolute right-0 bottom-0 left-0 mb-4 flex justify-center p-0">
                  <button
                    data-bs-target="#carouselDarkVariant"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    data-bs-target="#carouselDarkVariant"
                    data-bs-slide-to="1"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    data-bs-target="#carouselDarkVariant"
                    data-bs-slide-to="2"
                    aria-label="Slide 1"
                  ></button>
                </div>

                <div className="carousel-inner relative w-full overflow-hidden">
                  <div className="active carousel-item relative float-left w-full">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(19).webp"
                      className="block w-full rounded-md"
                      alt="Motorbike Smoke"
                    />
                    <div className="carousel-caption absolute hidden text-center md:block font-main-font">
                      <h5 className="text-xl">First slide label</h5>
                      <p>
                        Some representative placeholder content for the first
                        slide.
                      </p>
                    </div>
                  </div>

                  <div className="carousel-item relative float-left w-full">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(35).webp"
                      className="block w-full rounded-md"
                      alt="Mountaintop"
                    />
                    <div className="carousel-caption absolute hidden text-center md:block">
                      <h5 className="text-xl">Second slide label</h5>
                      <p>
                        Some representative placeholder content for the second
                        slide.
                      </p>
                    </div>
                  </div>

                  <div className="carousel-item relative float-left w-full">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(40).webp"
                      className="block w-full rounded-md"
                      alt="Woman Reading a Book"
                    />
                    <div className="carousel-caption absolute hidden text-center md:block">
                      <h5 className="text-xl">Third slide label</h5>
                      <p>
                        Some representative placeholder content for the third
                        slide.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  className="carousel-control-prev absolute top-0 bottom-0 left-0 flex items-center justify-center border-0 p-0 text-center hover:no-underline hover:outline-none focus:no-underline focus:outline-none"
                  type="button"
                  data-bs-target="#carouselDarkVariant"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon inline-block bg-no-repeat"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next absolute top-0 bottom-0 right-0 flex items-center justify-center border-0 p-0 text-center hover:no-underline hover:outline-none focus:no-underline focus:outline-none"
                  type="button"
                  data-bs-target="#carouselDarkVariant"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon inline-block bg-no-repeat"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Carousel;