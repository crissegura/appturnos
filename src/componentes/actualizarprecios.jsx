import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";


const ActualizarPrecios = ( ) => {

    const navigation = useNavigate()

    const [servicio, setServicio] = useState([])

    const getServicio = async ( ) => {
        const res = await axios.get('http://localhost:3001/verprecios')
        setServicio(res.data)
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