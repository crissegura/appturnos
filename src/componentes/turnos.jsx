import {Button} from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { Link } from "react-router-dom";



const Turnos = ( ) => {
    //Sacar un turno
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const modalTurno = () => setShow(true);
    const [turnos, setTurnos] = useState([])
    const getTurnos = async () => {
        const res = await axios.get('http://localhost:3001/verturnos')
        setTurnos(res.data)
    }
    useEffect(() => {
        getTurnos()
    }, []);
    const solicitar = ( e ) =>{
        e.preventDefault()
        let turno = turnos.find((t)=>t.dia===document.getElementById('dia').value&&t.hora===document.getElementById('hora').value)
        //Verificación de que este dispoible el turno y envio de ser así.
        document.getElementById('hora').value!==''&&document.getElementById('dia').value!==''&&document.getElementById('nombre').value!==''?turno?alert('Turno no disponible.'):axios.post('http://localhost:3001/nuevoturno',{nombre : document.getElementById('nombre').value.toLowerCase(),dia : document.getElementById('dia').value,hora : document.getElementById('hora').value}).then(alert('Turno agendado!')).then(handleClose().then(getTurnos())):alert('Completá todos los campos.')
    }
    //Cancelar un turno
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const cancelarTurno = () => setShow2(true);
    const cancelar = ( e ) => {
        e.preventDefault()
        let cancelar = turnos.find((t)=>t.dia===document.getElementById('dia2').value&&t.hora===document.getElementById('hora2').value&&t.nombre.toLowerCase()===document.getElementById('nombre2').value.toLowerCase())
        cancelar?axios.delete(`http://localhost:3001/cancelarturno/${document.getElementById('nombre2').value.toLowerCase()}`).then(alert('Turno cancelado!')).then(handleClose2().then(getTurnos)):alert('NO HABIA NINGUN TURNO')
    }

    return(
        <div style={{display:'flex',flexAlign:'center',justifyContent:'center',flexDirection:'column'}}>
            <Button onClick={modalTurno} className="my-1" style={{width:'40%', marginLeft:'30%'}}>
                Sacar turno
            </Button>
            <br />
            <Button onClick={cancelarTurno} className="my-1" style={{width:'40%', marginLeft:'30%'}}>
                Cancelar turno
            </Button>
            <br />
            <Link to='/ingresar'>
                <Button className="my-1" style={{width:'40%', marginLeft:'30%'}}>
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
                    <Form.Text className="text-muted mx-2">
                        Lunes a viernes. Sábado por orden de llegada.
                    </Form.Text>
                    <Form.Control type="date" id='dia' />
                    <Form.Label className="my-1">Horario</Form.Label> 
                    <Form.Text className="text-muted mx-2">
                        Horario de atención 10:00 a 20:00hs.
                    </Form.Text>
                    <Form.Control type="time" id='hora' />
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
                    <Form.Control type="date" id='dia2' />
                    <Form.Label className="my-1">Horario</Form.Label> 
                    <Form.Control type="time" id='hora2' />
                    <Button className="my-2" variant='secondary' onClick={cancelar}>
                        Cancelar turno
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    )

}

export default Turnos;