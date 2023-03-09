import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { collection, getDocs} from 'firebase/firestore';
import db from '../services/firebase';

const ActualizarPrecios = ( ) => {

    const navigation = useNavigate()

    const [servicio, setServicio] = useState([])

    const getServicio=async()=>{
        try{
            const document = collection(db,"precios")
            const col = await getDocs(document)
            const result = col.docs.map((doc)=> doc={id:doc.id,...doc.data()})
            setServicio(result)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getServicio()
    }, [] )

    const irAActulizar = (id ) => {
        navigation(`/actualizar/${id}`)
    }


    return(
        <div style={{padding:'1rem'}}>
            <Button className="volver" onClick={()=>navigation('/admin=juanchobarber')}>
            ❰❰
            </Button>
            <h3>Actualizar precios</h3>
            {
                servicio.map((serv)=>{
                    return  <div className="contActPre">
                                <button onClick={()=>irAActulizar(serv.id)} className="btn-act">
                                    <AiFillEdit />
                                </button>
                                <div className="divActPre">
                                <label>{serv.servicio}</label>
                                <p> ${serv.precio} </p>
                                </div>
                            </div>
                })
            }
        </div>
    )
}

export default ActualizarPrecios;