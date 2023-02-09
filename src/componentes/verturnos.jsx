import Table from 'react-bootstrap/Table';
import axios from 'axios'
import {useState,useEffect} from 'react'


const VerTurnos = ( ) => {

    const [turnos, setTurnos] = useState([])

    const verTurnos =async () =>{
        const res = await axios.get('https://turnosserverr-production-fa13.up.railway.app/verturnos')
        setTurnos(res.data)
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
    
    turnosDelDia.map((x)=>x.fecha!==fecha?turnosDelDia.pop():'')

    console.log(turnosDelDia)
    
    return(
        <div>
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