import Head from 'next/head'
import Link from 'next/link'
import { AnimatePresence, motion } from "framer-motion";
import { KeyLogo } from '../components/PageIcons'
import { useEffect } from 'react';
import overflowFix from '../hooks/overflowFix'

export default function Home() {

  const container = {
    hidden: {
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1
      }
    },
    show: {
      transition: {
        staggerChildren: 0.09
      }
    }
  };
  
  const itemVariants = {
      hidden: {
          opacity: 0,
          scale: 0.5,
          transition: { type: "spring", bounce: 0.4 }
      },
      show: { 
        opacity: 1,
        scale: 1,
        transition: { type: "spring", bounce: 0.4 } 
      }
  };

  useEffect(() => {
    overflowFix()
  }, [])

  return (
    <>
      <Head>
        <title>Throw A Note</title>
      </Head>
      <div className='welcome'>
        <AnimatePresence
          key={container}
        >
          <motion.article
            key={11313}
            variants={itemVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <h1>
              Crea notas <mark>anonimamente</mark> y compartilas en Throw a Note
            </h1>
            <div className='noteSample'>
              <h1>#S30</h1>
              <h2>Subi tu nota a throw a note y unite a las demas notas <mark>anonimas.</mark></h2>
            </div>
          </motion.article>

          <motion.article
            key={23131}
            variants={itemVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <h1>
              Publica con la funcion <mark>Privada</mark> y asegura tu nota con una clave <mark>{`:)`}</mark>
            </h1>
            <div className='noteSample'>
              <KeyLogo />
              <h1>#964</h1>
              <h2>Ingresa en el buscador #964 y accede con la clave: blackbird, tu nota privada en throw a note <mark>{`:)`}</mark>.</h2>
            </div>
          </motion.article>

          <motion.section
            key={30313}
            variants={itemVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <h1>¿Listo para subir una nota?</h1>
            <Link href='/note'>Crear Nota</Link>

            <br/>

            <h1>Te invitamos a ver las notas de la comunidad</h1>

            <Link href='/notes'>Notas Publicadas</Link>
          </motion.section>
        </AnimatePresence>
      </div>
    </>
  )
}
