import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco'
import Categoria from './Categoria'



const Slidebar = () => {


  const { categorias }  = useQuiosco()
  return (
    <>
      <Image width={150} height={200} src="/assets/img/logo.svg" alt="Imagen" />

      <nav className='mt-10'>
          {categorias.map(categoria => (
              <Categoria 
                key={categoria.id}
                categoria={categoria}
              />

          ))}
      </nav>
    </>
  )
}

export default Slidebar