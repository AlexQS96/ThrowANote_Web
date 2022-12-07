import axios from "axios";
import { useState, useEffect } from 'react'
import overflowFix from "../hooks/overflowFix";
import Head from "next/head";

const NewNote = () => {
    const [note, setNote] = useState();
    const [id, setId] = useState();
    const [notePrivate, setNotePrivate] = useState(false);
    const [privateKey, setPrivateKey] = useState(false);
    const [error, setError] = useState('');

    const addNewNote = async (e) => {
        e.preventDefault();

        const nota = {
            noteid: id,
            notetext: note,
            noteprivacy: notePrivate,
            notekey : privateKey
        };

        try {
            axios
            .post(process.env.NEXT_PUBLIC_DB_HOST + "/add", nota)
            .then(() => {
                window.location.replace("/notes/" + id.split(' ').join('_'));
            })
            .catch(function (error) {
                setError(error.response? error.response.data : {
                    type : 1,
                    msg : 'Error en la Conexión'
                })
            });   
        } catch (error) {
            setError({msg: 'Error en la Conexión'})
        }
    };

    useEffect(() => {
        overflowFix();
    }, [])

    return (
        <>
        <Head>
            <title>Crea una nota</title>
        </Head>
        <form className="newNote" onSubmit={addNewNote}>
            <div data-type-noteprivacy>
                <span className={!notePrivate? 'selected' : undefined} onClick={() => setNotePrivate(false)} >publica</span>
                <span className={notePrivate? 'selected' : undefined} onClick={() => setNotePrivate(true)}>privada</span>
            </div>
            <div data-inputs>
                <label>#id</label>
                <input
                    className={error.type === 1 ? "invalid" : undefined}
                    type="text"
                    name="noteid"
                    placeholder="Escribi un ID"
                    onChange={(e) => {
                        {
                            setId(e.target.value);
                            setError('');
                        }
                    }}
                />
                {
                    error.type === 1 &&
                    <span data-error-msg>{error.msg}</span>
                }
            </div>
            
            <div data-inputs>
                <label>#nota</label>
                <textarea
                    className={error.type === 2? "invalid" : undefined}
                    name="notetext"
                    placeholder="...Aa"
                    onChange={(e) => {
                        {setNote(e.target.value); setError('');}
                    }}
                />
                {
                    error.type === 2 &&
                    <span data-error-msg>{error.msg}</span>
                }
            </div>

            <div className={notePrivate? 'privateInput expanded' : 'privateInput'}>
                <label>#Clave</label>
                <input
                    className={error.type === 3? "invalid" : undefined}
                    name='notekey'
                    type='text'
                    placeholder="Escribi una clave"
                    onChange={(e) => {
                        {setPrivateKey(e.target.value); setError('');}
                    }}
                />
                {
                    error.type === 3 &&
                    <span data-error-msg>{error.msg}</span>
                }
            </div>

            <input
                className="button_1"
                type="submit"
                value="subir nota"
            />
        </form>
        </>
    );
};

export default NewNote;
