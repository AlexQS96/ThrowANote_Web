import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Linkify from "@quiq/react-linkify";
import Head from 'next/head';
import { KeyLogo, UrlLogo } from '../../components/PageIcons';
import { getNote } from '../../hooks/useFetch';
import overflowFix from '../../hooks/overflowFix'

const NoteDetail = () => {

  const { push, back, query} = useRouter();
  const { note, loading } = getNote();
  const [privateWord, setPrivateWord] = useState('');

  const goBack = () => {
    return window.sessionStorage.getItem("useractive") === 'yes' ? back() : push('/');
  }

  const copyURL = () => {
    document.querySelector('[data-copied]').textContent = 'Copiado'
    setTimeout(() => {
      document.querySelector('[data-copied]').textContent = null
    }, 1000);
    return navigator.clipboard? navigator.clipboard?.writeText(window.location.href): console.log((window.location.href))
  }

  useEffect(() => {
    overflowFix()
  }, [loading])

  return (
    <>
    <Head>
      {
        !loading?
        <title>Nota #{note.id}</title>
        :
        <title>Nota</title>
      }
    </Head>
    <div className='viewNote'>
      {
          !loading?
          note?.private?
          <div className='secretNote'>
            <label>Ingresa la clave</label>
            <section>
              <input 
                type="text"
                onChange={e => setPrivateWord(e.target.value)}
                onKeyPress={(e) => {
                  e.key === "Enter" && push(query.id+'?secret='+privateWord)
                }}
                value={privateWord}
              />
              <div onClick={() => push(query.id+'?secret='+privateWord)}>
                <KeyLogo/>
              </div>
            </section>
          </div>
          :
          <>
            {
              note?.id === '404'?
              <>
                <h1 data-error-note >{note.note}</h1>
                <button data-try-again onClick={() => goBack()}>Volver a Notas</button>
              </>  
              :
              note?.id === '403'?
              <>
                <h1 data-error-note >{note.note}</h1>
                <button data-try-again onClick={() => push(query?.id)}>Reintentar</button>
              </>     
              :
              <>
                <div data-note-actions>
                  <h3 onClick={() => goBack()}>{`../Notas`}</h3>
                  <figure data-copied></figure>
                  <div onClick={() => copyURL()}>
                    <UrlLogo/>
                  </div>
                </div>
                <p data-title-note>#{note?.id}</p>
                <Linkify properties={{target: '_blank', rel: 'noreferrer noopener'}}>
                  <p>{note?.note}</p>
                </Linkify>
              </>
            }
          </>
        :
        <>
        <p className='loading'>Cargando, porfavor espere</p>
        </>
      }
    </div>
    </>
  )
}

export default NoteDetail
