import React from 'react'
import { Link } from 'react-router-dom'

function Jumbo() {
  return (
    <div>
      <div className="flex items-center text-center p-8 min-h-[380px] bg-gradient-to-t from-gray-800 to-Slate-50 w-full font-[sans-serif]">
      <div className="max-w-4xl mx-auto">
        <h1 className="sm:text-4xl text-2xl font-bold text-white" role='head'>The Perfect Way to Grab a Deal</h1>
        <p role='bannertxt' className="mt-8 text-sm text-gray-300 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nuncet
          tempus blandit, metus mi consectetur nibh, a pharetra felis turpis vitae ligula. Etiam laoreet velit nec neque
          ultrices, non consequat mauris tincidunt. pharetra felis turpis vitae ligula. Etiam laoreet velit nec neque
          ultrices, non consequat mauris tincidunt.</p>
       <Link to={"/userprod"}> <button type="button" role='prod'
          className="px-6 py-3 mt-12 rounded-full text-white text-base tracking-wider border-none outline-none bg-orange-600 hover:bg-orange-700">Explore  now</button></Link>
      </div>
    </div>
    </div>
  )
}

export default Jumbo
