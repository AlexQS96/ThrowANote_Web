import Link from "next/link";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { getNotes } from "../hooks/useFetch";
import overflowFix from "../hooks/overflowFix";

const Notes = () => {
    const {asPath, push, pathname, query} = useRouter();
    const {notes, pages, loading} = getNotes();

    const container = {
        hidden: {
          transition: {
            staggerChildren: 0.02,
            staggerDirection: -1
          }
        },
        show: {
          transition: {
            staggerChildren: 0.04
          }
        }
      };
      
    const itemVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            transition: { type: "spring", bounce: 0.4 }
        },
        show: { opacity: 1, scale: 1, transition: { type: "spring", bounce: 0.4 } }
    };

    const getPageRange = (currentPage) => {
        const pageCount = pages.length
        if (pageCount < 4) {
          return pages;
        }
        let pageRange = [1, 2, 3];
        if (currentPage > 1 && currentPage !== pageCount) {
          pageRange.length = 0;
          pageRange.push(currentPage - 1);
          pageRange.push(currentPage);
          pageRange.push(currentPage + 1);
        } else if (currentPage === pageCount){
          pageRange.length = 0;
          pageRange.push(currentPage - 2);
          pageRange.push(currentPage - 1);
          pageRange.push(currentPage);
        }
        return pageRange;
    };

    const changePage = (indexPage) => {
        setTimeout(() => {
            window.scrollTo(0,0)
        }, 100);
        return push({ pathname: pathname, query: { ...query, page: indexPage }}, undefined, {shallow: true});
    }

    useEffect(() => {
        overflowFix()
    }, [loading,notes])

    return (
        <>
            <Head>
                <title>Notas</title>
            </Head>
            {
                !loading?
                <>
                <AnimatePresence
                    key={asPath}
                >
                <motion.div
                    className="note_list"
                    key={asPath}
                    variants={container}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                >
                {
                    notes.map((note,index) => (
                        <Link href={'/notes/'+note.id} key={index}>
                        <motion.div key={index} variants={itemVariants}>
                            <p>#{note.id}</p>
                            <p>{note.note? note.note.toString().substr(0,15)+'....' : 'Vacio'}</p>
                            <p>ver mas..</p>
                        </motion.div>
                        </Link>
                    ))
                }
                </motion.div>
                </AnimatePresence>
            <div className="pages">
                <button
                    onClick={() => 
                        {(+query.page > 1) && changePage(+query.page - 1)}
                    }
                    disabled={query.page <= 1}
                >
                    {`<`}
                </button>
                {
                    getPageRange(+query.page).map(page => (
                        <button className={+query.page === page? 'page_Active' : query.page === undefined && page === 1? 'page_Active' : undefined} onClick={() => changePage(page)} key={page}>{page}</button>
                    ))
                }
                <button
                    onClick={() => 
                        { query.page? (+query.page < Number(pages.length)) && changePage(+query.page + 1) : changePage(pages.length > 1? 2 : 1)}
                    }
                    disabled={
                        +query.page === Number(pages.length)
                    }
                >
                    {`>`}
                </button>
            </div>
            </>
            :
            <div className="loading">
                Cargando, porfavor espere
            </div>
            }
        </>
    );
};

export default Notes;
