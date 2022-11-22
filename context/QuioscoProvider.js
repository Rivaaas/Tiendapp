import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'


const QuioscoContext = createContext()


const QuioscoProvider = ({ children }) => {

  const [categorias, setCategorias] = useState([])

  const [categoriaActual, setCategoriaActual] = useState({})

  const [producto, setProducto] = useState({})

  const [modal, setModal] = useState(false)

  const [pedido, setPedido] = useState([])

  const [paso, setPaso] = useState(1)

  const [nombre, setNombre] = useState("")

  const [total, setTotal] = useState(0)

  const router = useRouter()

  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    if (pedido.some(productoState => productoState.id === producto.id)) {
      //Actualizar la cantidad 
      const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
      setPedido(pedidoActualizado)
      toast.success("Guardado correctamente")

    } else {
      setPedido([...pedido, producto])
      toast.success("Agregado al pedido")

    }
    setModal(false)

  }


  const handleChangeModal = () => {
    setModal(!modal)
  }


  const obtenerCategorias = async () => {
    const { data } = await axios('/api/categorias')
    setCategorias(data)
  }

  useEffect(() => {
    obtenerCategorias()
  }, [])

  useEffect(() => {
    setCategoriaActual(categorias[0])
  }, [categorias])


  const handleClickCategoria = id => {
    const categoria = categorias.filter(cat => cat.id === id)
    setCategoriaActual(categoria[0])
    router.push("/")
  }

  const handleSetProducto = producto => {
    setProducto(producto)
  }

  const handleChangePaso = paso => {
    setPaso(paso)
  }


  const handleEditarCantidades = id => {
    const prooductoActualizar = pedido.filter(producto => producto.id === id)
    setProducto(prooductoActualizar[0])
    setModal(!modal)
  }

  const handleEliminarProducto = id => {
    const pedidoActualizado = pedido.filter(producto => producto.id !== id)
    setPedido(pedidoActualizado)
  }

  const colocarOrden = async (e) => {
    e.preventDefault()

    try {
      await axios.post("/api/ordenes", { pedido, nombre, total, fecha: Date.now().toString() })
      //Reset la app

      setCategoriaActual(categorias[0])
      setPedido([])
      setNombre("")
      setTotal(0)

      toast.success("Pedido realizado correctamente")

      setTimeout(() => {
        router.push('/')
      },3000)
    } catch (error) {
      console.log(error)
    }


  }

  useEffect(() => {
    const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
    setTotal(nuevoTotal)
  }, [pedido])


  return (

    <QuioscoContext.Provider
      value={{
        categorias,
        handleClickCategoria,
        categoriaActual,
        handleSetProducto,
        producto,
        handleChangeModal,
        modal,
        handleAgregarPedido,
        pedido,
        handleChangePaso,
        paso,
        handleEditarCantidades,
        handleEliminarProducto,
        nombre,
        setNombre,
        colocarOrden,
        total
      }}
    >
      {children}
    </QuioscoContext.Provider>
  )
}


export {
  QuioscoProvider
}

export default QuioscoContext