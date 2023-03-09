import { collection, getDocs } from 'firebase/firestore';
import db from '../services/firebase';
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



const VerTodosLosTurnos = ( ) => {

    const navigation = useNavigate()

    const [turnos,setTurnos] = useState([])

    const getTurnosRegistrados=async()=>{
        try{
            const document = collection(db,"turnos")
            const col = await getDocs(document)
            const result = col.docs.map((doc)=> doc={id:doc.id,...doc.data()})
            setTurnos(result)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getTurnosRegistrados()
    }, [])

    //buscar cliente
    const [ cliente, setCliente ] = useState([])

    const getCliente = (e) =>{
        setCliente(e.target.value)
    }

    const buscarTurno=turnos.filter(turno=>turno.nombre.toLowerCase().includes(cliente.toString().toLocaleLowerCase()))

    return(
        <div >
            {
                turnos.length!==0?
                <div>
                    <Button className="volver" onClick={()=>navigation('/admin=juanchobarber')}>
                        ❰❰ 
                    </Button>
                    <br />
                    <input type="text" placeholder="buscar cliente" className="inputBuscarClientes" onChange={getCliente} value={cliente} />
                    {
                        buscarTurno.length!==0?
                        <div>
                            {
                                buscarTurno.map((turno)=>{
                                    return <div className="divToTu">
                                            <h6>Cliente: {turno.nombre}</h6>
                                            <div className="divToTu2">
                                                <p>Día: {turno.dia}</p>
                                                <p>Hora: {turno.hora}</p>
                                            </div>
                                            </div>
                                })
                            }
                        </div>
                        :
                        <div>
                            <h3 style={{textAlign:'center',marginTop:'2rem'}}>
                                No existe el turno para el cliente: "{cliente}"
                            </h3>
                        </div>
                    }
                </div>
                :
                <div style={{textAlign:'center',marginTop:'2rem'}}>
                    cargando...
                </div>
            }
        </div>
    )

}

export default VerTodosLosTurnos;