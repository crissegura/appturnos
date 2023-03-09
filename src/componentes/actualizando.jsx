import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs,doc,updateDoc} from 'firebase/firestore';
import db from '../services/firebase';

const Actualizando = ( ) =>{

    const {id} = useParams()

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


    let service
    service = servicio.find((serv)=>serv.id == id)    

    let precioNuevo 


    const navigation = useNavigate()

    function handleUpdate(e){
        e.preventDefault();
        document.getElementById('actPrec').value===''?
        precioNuevo = service.precio
        :
        precioNuevo = document.getElementById('actPrec').value
        const examcollref = doc(db,'precios', id)
        updateDoc(examcollref,{
            precio : precioNuevo
        } ).then(response => {
          navigation('/actualizandopreciosdenavajalegendary')
        }).catch(error =>{
          console.log(error.message)
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
                    
                    <Button variant="secondary" onClick={handleUpdate}>
                        Guardar cambios
                    </Button>
                    
                </div>
            
            }
        </div>
    )

}

export default Actualizando;