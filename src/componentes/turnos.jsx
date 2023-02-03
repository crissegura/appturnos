import {Button} from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { Link } from "react-router-dom";

//Fecha y días
let calendario = new Date()
let numero = calendario.getDate()
let meses = ['01','02','03','04','05','06','07','08','09','10','11','12']
let mes = meses[calendario.getMonth()]
let semana = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']
let dia = semana[calendario.getDay()]
let año = calendario.getFullYear()
numero<10?numero='0'+numero:numero=numero
let fecha = (año+'-'+mes+'-'+numero).toString()
let hoy = numero+'-'+mes+'-'+año
console.log(numero);
let dia1
numero==='0'+1?dia1=2:dia1=calendario.getDate()+1
let dia2 = dia1+1
let dia3 = dia2+1
let dia4 = dia3+1
dia1<10?dia1='0'+dia1:dia1=dia1
dia2<10?dia2='0'+dia2:dia2=dia2
dia3<10?dia3='0'+dia3:dia3=dia3
dia4<10?dia4='0'+dia4:dia4=dia4
let opcionesDia = [
    {label:hoy,value:hoy},
    {label:dia1+'-'+mes+'-'+año,value:dia1+'-'+mes+'-'+año},
    {label:dia2+'-'+mes+'-'+año,value:dia2+'-'+mes+'-'+año},
    {label:dia3+'-'+mes+'-'+año,value:dia3+'-'+mes+'-'+año},
    {label:dia4+'-'+mes+'-'+año,value:dia4+'-'+mes+'-'+año},
]
console.log(opcionesDia)


const Turnos = ( ) => {
   
    //Sacar un turno
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const modalTurno = () => setShow(true);
    const [turnos, setTurnos] = useState([])
    const getTurnos = async () => {
        const res = await axios.get('https://turnosserverr-production-fa13.up.railway.app/verturnos')
        setTurnos(res.data)
    }
    useEffect(() => {
        getTurnos()
    }, []);
    const solicitar = ( e ) =>{
        e.preventDefault()
        let turno = turnos.find((t)=>t.dia===document.getElementById('dia').value&&t.hora===document.getElementById('hora').value)
        //Verificación de que este dispoible el turno y envio de ser así.
        document.getElementById('hora').value!==''&&document.getElementById('dia').value!==''&&document.getElementById('nombre').value!==''?turno?alert('Turno no disponible.'):axios.post('https://turnosserverr-production-fa13.up.railway.app/nuevoturno',{nombre : document.getElementById('nombre').value.toLowerCase(),dia : document.getElementById('dia').value,hora : document.getElementById('hora').value}).then(alert('Turno agendado!')).then(handleClose().then(getTurnos())):alert('Por favor llena todos los campos.')      
    }
    //Cancelar un turno
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const cancelarTurno = () => setShow2(true);
    const cancelar = ( e ) => {
        e.preventDefault()
        let cancelar = turnos.find((t)=>t.dia===document.getElementById('dia2').value&&t.hora===document.getElementById('hora2').value&&t.nombre.toLowerCase()===document.getElementById('nombre2').value.toLowerCase())
        cancelar?axios.delete(`https://turnosserverr-production-fa13.up.railway.app/cancelarturno/${document.getElementById('nombre2').value.toLowerCase()}`).then(alert('Turno cancelado!')).then(handleClose2().then(getTurnos)):alert('NO HABIA NINGUN TURNO')
    }

    //Si ya tiene turno y quiere cancelar autorellenar
    document.getElementById('nombre2')

    return(
        <div className="inicio" style={{display:'flex',flexAlign:'center',justifyContent:'center',flexDirection:'column'}}>
            <Button variant="secondary" onClick={modalTurno} className="my-1 btn-inicio">
                Sacar turno
            </Button>
            <br />
            <Button variant="secondary" onClick={cancelarTurno} className="my-1 btn-inicio">
                Cancelar turno
            </Button>
            <br />
            <Link to='/ingresar'>
                <Button variant="secondary" className="my-1 btn-inicio">
                    Administrador
                </Button>
            </Link>
            {/*Modal para sacar turno*/}
            <Modal style={{color:'white'}} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Sacá turno</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label className="my-1">Nombre y apellido</Form.Label> 
                    <Form.Control type="text" id='nombre' />
                    <Form.Label className="my-1">Seleccioná el día</Form.Label> 
                    <Form.Select id='dia'>
                        {opcionesDia.map((x)=>{
                            return <option>{x.value}</option>
                        })}
                    </Form.Select>
                    <Form.Label className="my-1">Horario</Form.Label> 
                    <Form.Select id='hora'>
                        <option>10:00</option>
                        <option>11:00</option>
                        <option>12:00</option>
                        <option>13:00</option>
                        <option>14:00</option>
                        <option>15:00</option>
                        <option>16:00</option>
                        <option>17:00</option>
                        <option>18:00</option>
                        <option>19:00</option>
                        <option>20:00</option>
                    </Form.Select>
                    <Button className="my-2" variant='secondary' onClick={solicitar}>
                        Enviar
                    </Button>
                </Modal.Body>
            </Modal>

            {/*Modal para cancelar turno*/}
            <Modal style={{color:'white'}} show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                <Modal.Title>Cancelar turno</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label className="my-1">Nombre y apellido</Form.Label> 
                    <Form.Control type="text" id='nombre2' />
                    <Form.Label className="my-1">Seleccioná el día</Form.Label> 
                    <Form.Select id='dia2'>
                        {opcionesDia.map((x)=>{
                            return <option>{x.value}</option>
                        })}
                    </Form.Select>
                    <Form.Label className="my-1">Horario</Form.Label> 
                    <Form.Select id='hora2'>
                        <option>10:00</option>
                        <option>11:00</option>
                        <option>12:00</option>
                        <option>13:00</option>
                        <option>14:00</option>
                        <option>15:00</option>
                        <option>16:00</option>
                        <option>17:00</option>
                        <option>18:00</option>
                        <option>19:00</option>
                        <option>20:00</option>
                    </Form.Select>
                    <Button className="my-2" variant='secondary' onClick={cancelar}>
                        Cancelar turno
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    )

}

export default Turnos;