import Head from 'next/head'
import Slidebar from '../components/Slidebar';
import Modal from 'react-modal'
import useQuiosco from '../hooks/useQuiosco';
import ModalProduto from '../components/ModalProduto';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pasos from '../components/Pasos';


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%,-50%)",
  },
};

Modal.setAppElement("#__next")

export default function Layout({ children, pagina }) {

  const { modal } = useQuiosco()
  return (
    <>
      <Head>
        <title >Café - {pagina}</title>
        <meta name="description" content="Quiosco Cafetería" />
      </Head>

      <div className="md:flex">
        <aside className="md:w-4/12 xl:w-1/4 2xl:w1/5">
          <Slidebar />
        </aside>

        <main className="md:w-8/12 xl:w-3/4 2xl:w4/5 h-screen overflow-y-scroll">
          <div className='p-10 '>
            <Pasos/>
            {children}
          </div>
        </main>
      </div>
      {modal && (
        <Modal
          isOpen={modal}
          style={customStyles}
        >
          <ModalProduto />
        </Modal>

      )}
      <ToastContainer  autoClose={1000} />

    </>
  );
}