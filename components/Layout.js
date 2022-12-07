import Header from './Header'
import Footer from './Footer'
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from 'react';
import overflowFix from '../hooks/overflowFix';

export default function Layout({ children }) {
  const { pathname } = useRouter();
  const variants = {
    in: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.55,
        delay: 0.1
      }
    },
    out: {
      opacity: 0,
      scale: 1,
      x: 200,
      transition: {
        duration: 0.55
      }
    }
  };

  const getPathKey = (path, level = 2) => {
    //this function make framer motion to render only if the path after the / changes
    //avoiding rerender if querys are added to the current URL 
    // path: "/topics/react/router"
    // level: 1 -> topics
    // level: 2 -> topics/react
    // level: 3 -> topics/react/router
    return path.split('/').splice(1, level).join('/');
  }

  useEffect(() => {
    window.sessionStorage.setItem("useractive", "yes");
  }, [])

  return (
    <>
      <Header />
      <AnimatePresence initial={false} mode='wait'>
        <motion.main
          key={getPathKey(pathname)}
          variants={variants}
          animate="in"
          initial="out"
          exit="out"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}