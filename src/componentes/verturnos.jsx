import Table from 'react-bootstrap/Table';
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { collection, getDocs,doc,deleteDoc } from 'firebase/firestore';
import db from '../services/firebase';

const VerTurnos = ( ) => {

    const navigation = useNavigate()

    const [turnos, setTurnos] = useState([])

    const verTurnos=async()=>{
        try{
            const document = collection(db,"turnos")
            const col = await getDocs(document)
            const result = col.docs.map((doc)=> doc={id:doc.id,...doc.data()})
            setTurnos(result)
        }catch(error){
            console.log(error)
        }
    }
    
    useEffect(() => {
        verTurnos()
    }, []);

    let hoy = new Date()
    let numero = hoy.getDate()
    let meses = ['01','02','03','04','05','06','07','08','09','10','11','12']
    let mes = meses[hoy.getMonth()]
    let semana = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
    let dia = semana[hoy.getDay()]
    let año = hoy.getFullYear()
    numero<10?numero='0'+numero:numero=numero
    let fecha = (año+'-'+mes+'-'+numero).toString()

    let turnosDelDia = []
    turnos.map((x)=>x.dia===fecha?turnosDelDia.push({id:x.id,nombre:x.nombre,horario:parseInt(x.hora),fecha:x.dia}):'')

    turnosDelDia.sort((a,b)=>{
        if(a.horario<b.horario){
            return -1
        } else if (a.horario>b.horario){
            return 1
        }else{
            return 0
        }
    })
    
    let hora = hoy.getHours()

    const borrarTurno = async (id) => {
        try {
            const reference = doc(db, 'turnos', id)
            await deleteDoc(reference)
        } catch (e) {
            console.error("ERROR: ", e);
        }
    }

    const borrarTurnosPasados = ( ) =>{
        if(hora===13){
            turnosDelDia.map((id)=>borrarTurno(id.id))
        }
        window.location.reload()
    }
    
    setInterval(borrarTurnosPasados,1800000)


    return(
        <div>
            <Button className="volver" onClick={()=>navigation('/admin=juanchobarber')}>
            ❰❰ 
            </Button>
            <p style={{color:'white',paddingLeft:'10px',fontSize:'25px'}}>
                {dia+' '+numero+'/'+mes+'/'+año}
            </p>
            <Table bordered hover className='tabla'>
                <thead>
                    <tr>
                    <th>Horario</th>
                    <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {turnosDelDia.map((t)=><tr>
                        <td>{t.horario<10?'0'+t.horario+':00':t.horario+':00'}</td>
                        <td>{t.nombre}</td>
                    </tr>)}
                </tbody>
            </Table>
        </div>
    )
}

export default VerTurnos;