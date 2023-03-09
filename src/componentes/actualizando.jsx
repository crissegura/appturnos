import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";



const Actualizando = ( ) =>{

    const {id} = useParams()

    const [servicio, setServicio] = useState([])

    const getServicio = async ( ) => {
        const res = await axios.get('http://localhost:3001/verprecios')
        setServicio(res.data)
    }

    useEffect(()=>{
        getServicio()
    }, [] )


    let service
    service = servicio.find((serv)=>serv.id == id)    

    let precioNuevo 

    const guardarCambios = ( ) => {
        document.getElementById('actPrec').value===''?
        precioNuevo = service.precio
        :
        precioNuevo = document.getElementById('actPrec').value

        axios.put(`http://localhost:3001/actualizarprecio/${id}`,{
            precio : precioNuevo
        })
        
    }

    return(
        <div>
            {
                service===undefined?
                    <p>Cargando...</p>
                :
                <div>
                    <div className="divactprecioid">
                        <h5>{service.servicio}</h5>
                        <input type="text" id="actPrec" placeholder={service.precio} />
                    </div>
                    <Link to='/actualizandopreciosdenavajalegendary'>
                        <Button variant="secondary" onClick={guardarCambios}>
                            Guardar cambios
                        </Button>
                    </Link>
                </div>
            
            }
        </div>
    )

}

export default Actualizando;