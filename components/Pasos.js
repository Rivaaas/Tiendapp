import React from 'react'

import { useRouter } from 'next/router'

const pasos = [
  { paso: 1, nombre: "Menu", url: "/" },
  { paso: 2, nombre: "Resumen", url: "/resumen" },
  { paso: 3, nombre: "Datos y Total", url: "/total" }
]


const Pasos = () => {
  const router = useRouter()

  return (
    <>

      <div className='flex justify-between'>{pasos.map(paso => (
        <button
          type="button"
          key={paso.paso}
          className="text-2xl font-bold"
          onClick={() => {
            router.push(paso.url)
          }}
        >
          {paso.nombre}
        </button>
      ))}</div>
    </>
  )
}

export default Pasos