import React from 'react'
import 'tailwindcss-line-clamp'
import Link from 'next/link'

const CollectionCard = ({ name, owner, description, img_src }) => {
  return (
    <div>
      <div className="mb-6 lg:mb-0 ">
        <div className="relative block rounded-lg bg-primary-color-6 shadow-md shadow-gray-900">
          <div className="flex">
            <div
              className="h-54 container relative mx-4 -mt-4 w-full overflow-hidden rounded-lg bg-cover bg-no-repeat shadow-md shadow-gray-900"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              
              <img src={img_src} className="h-full w-full object-cover " />
              <Link href={`/collection/${name}`}>
                <a>
                  <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
                </a>
              </Link>
            </div>
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2/3 transform ">
            <img
              src="https://media.istockphoto.com/vectors/abstract-blurred-colorful-background-vector-id1186790852?k=20&m=1186790852&s=612x612&w=0&h=Z33vXK5dRcFobERKrJmmk82N6Se5klqljBlvuJsdFAE="
              className="h-12 w-12 rounded-full border border-primary-color-4 align-middle shadow-md shadow-gray-900"
              alt="Avatar"
            />
          </div>

          <div className="justify-center bg-primary-color-6 p-6">
            <h5 className="mb-3 text-ellipsis text-center text-xl font-bold">
              {name}
            </h5>
            <p className="text-center text-base">
              {' '}
              by
              <Link href={`/profile/${owner}`}>
              <a className="text-white">
                <span className="font-bold text-purple-400 "> {owner}</span>{' '}
              </a>
              </Link>
            </p>

            <p className="mx-4 mb-4 pb-1 text-center text-lg text-gray-200 line-clamp-3">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionCard
