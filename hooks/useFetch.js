import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import overflowFix from './overflowFix'

export const getNotes = () => {

    const { query } = useRouter();
    const error_msg = 'Error al cargar notas.';
    const [notes, setNotes] = useState([]);
    const [pages, setPages] = useState([]);
    const noteLimit = 5;
    const [loading, setLoading] = useState(true);
    

    const baseUrl = process.env.NEXT_PUBLIC_DB_HOST +
    `/list${'?notelimit=' + noteLimit}${query.search ? "&search=" + query.search : ""}${query.page? '&page='+query.page : ""}`

    useEffect(() => {
        if (baseUrl) {
            const fetchData = async () => {
                try {
                    const { data } = await axios.get(baseUrl)
                    setNotes(data[0]);
                    setPages([...Array(Math.ceil(data[1] / noteLimit) + 1).keys()].slice(1))
                } catch (error) {
                    console.error(error);
                    console.log("Error en el servidor.");
                }
                setLoading(false);
            }
            fetchData();
        }
    }, [query?.search, query?.page]);

    return { notes, pages, loading, error_msg };
}

export const getNote = () => {

    const { query } = useRouter()
    const error_msg = 'Error al cargar nota.'
    const [note, setNote] = useState({
        id: '404',
        note: 'Error en la conexión'
    });
    const [loading, setLoading] = useState(true);
    
    const baseUrl = query?.secret? process.env.NEXT_PUBLIC_DB_HOST+"/private/"+query?.id+'?secret='+query?.secret : process.env.NEXT_PUBLIC_DB_HOST+'/'+query?.id;

    useEffect(() => {
        
        if (query.id !== undefined) {
            const fetchData = async () => {
                try {
                    const { data } = await axios.get(baseUrl)
                    setNote(data);
                } catch (error) {
                    console.error(error);
                    console.log("Error en el servidor.");
                }
                setLoading(false);
            }
            fetchData();
        }

    }, [query?.id, query?.secret]);

    return { note, loading, error_msg };
}