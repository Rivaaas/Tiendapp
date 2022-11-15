import Image from 'next/image'
import useQuiosco from '../hooks/useQuiosco';

const Categoria = ({ categoria }) => {

  const { nombre, icono, id } = categoria;

  const { categoriaActual, handleClickCategoria } = useQuiosco();


  return (
    <div className={`${categoriaActual?.id === id ? "bg-amber-400" : "" } flex items-center gap-2 w-full border p-5 hover:bg-amber-400 `}>
      <Image
        alt="img"
        width={50}
        height={50} 
        src={`/assets/img/icono_${icono}.svg`}
      />

      <button type="button" onClick={()=> handleClickCategoria(id)} className="text-2x1 font-bold hover:cursor-pointer " >
        {nombre}
      </button>
    </div>
  )
}

export default Categoria