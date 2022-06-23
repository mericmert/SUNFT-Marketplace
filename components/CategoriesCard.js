import React from 'react'
import Link from 'next/link'

const CategoriesCard = (props) => {
  return (
    <div className="flex justify-center pt-8 px-2">
    <div className="max-w-sm rounded-lg bg-primary-color-6 border border-gray-700 hover:shadow-indigo-900 ">
      <Link href="/explore">
        <a>
          <img
            className="rounded-t-lg"
            src={props.image}
            alt=""
          />
        </a>
        </Link>
      <div className="p-4">
        <h5 className="text-center text-xl font-semibold text-white">
          {props.category}
        </h5>
      </div>
    </div>
  </div>
  )
}

export default CategoriesCard
