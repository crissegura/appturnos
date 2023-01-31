import Table from 'react-bootstrap/Table';
import axios from 'axios'
import {useState,useEffect} from 'react'

const VerTurnos = ( ) => {

    const [turnos, setTurnos] = useState([])

    const verTurnos =async () =>{
        const res = await axios.get('http://localhost:3001/verturnos')
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
    let fecha = (año+'-'+mes+'-'+numero).toString()

    let horarios = []
    
    for (let i = 0; i < turnos.length; i++) {
        horarios.push(turnos[i].hora);
    } 
    console.log(horarios.sort())

    return(
        <div>
            <p style={{color:'white',paddingLeft:'10px'}}>
                {dia+' '+numero+'/'+mes+'/'+año}
            </p>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>Horario</th>
                    <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        turnos.map((t)=>t.dia===fecha?
                            <tr>
                                <td>{t.hora}</td>
                                <td>{t.nombre}</td>
                            </tr>
                            :<div></div>
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default VerTurnos;