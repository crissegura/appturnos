import {Button} from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { useNavigate } from "react-router-dom";


const Turnos = ( ) => {

    const navigate = useNavigate()

    //Modal precios
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const modalPrecios = () => setShow3(true);
   
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
    const a = () =>{
    let cancelar = turnos.find((turno)=>turno.nombre===document.getElementById('nombre2').value.toLowerCase())
    document.getElementById('dia2').value = cancelar.dia
    document.getElementById('dia2').setAttribute('disabled', true)
    document.getElementById('hora2').value = cancelar.hora
    document.getElementById('hora2').setAttribute('disabled', true)
    }

    return(
        <div className="inicio">
            <Button  onClick={modalPrecios} className="my-1 btn-inicio btns">
                <img className="imgBtn" src="https://cdn-icons-png.flaticon.com/512/595/595777.png" alt="" />
                <span>Lista de precios</span> 
            </Button>
            <br />
            <Button  onClick={modalTurno} className="my-1 btn-inicio btns">
                <img className="imgBtn" src="https://cdn-icons-png.flaticon.com/512/595/595777.png" alt="" />
                <span>Sacar turno</span> 
            </Button>
            <br />
            <Button  onClick={cancelarTurno} className="my-1 btn-inicio btns">
                <img className="imgBtn" src="https://cdn-icons-png.flaticon.com/512/595/595777.png" alt="" />
                <span>Cancelar turno</span> 
            </Button>
            <br />
            
            <Button onClick={()=>navigate('/ingresar')} className="my-1 btn-inicio btns">
                <img className="imgBtn" src="https://cdn-icons-png.flaticon.com/512/595/595777.png" alt="" />
                <span>Administrador</span> 
            </Button>
            
            {/*Modal para sacar turno*/}
            <Modal style={{marginTop:'4rem'}} show={show} onHide={handleClose}>
                
                <Modal.Body className="modalContent" >
                    <Modal.Title>SOLICITAR TURNO</Modal.Title>
                    <Form.Label className="my-1">Nombre y apellido</Form.Label> 
                    <Form.Control type="text" id='nombre' />
                    <Form.Label className="my-1">Seleccioná el día</Form.Label> 
                    <Form.Control type='date' id='dia'/>
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
                    <Button className="my-3 btn-mod"  onClick={solicitar}>
                        Solicitar turno
                    </Button>
                </Modal.Body>
            </Modal>

            {/*Modal para cancelar turno*/}
            <Modal style={{marginTop:'4rem'}} show={show2} onHide={handleClose2}>
                <Modal.Body  className="modalContent"> 
                    <Modal.Title>CANCELAR TURNO</Modal.Title>
                    <Form.Label className="my-1">Nombre y apellido</Form.Label> 
                    <Form.Control type="text" id='nombre2' onChange={a} />
                    <Form.Label className="my-1">Seleccioná el día</Form.Label> 
                    <Form.Control type='date' id='dia2'/>
                    <Form.Label className="my-1">Horario</Form.Label> 
                    <Form.Select id='hora2'>
                        <option >10:00</option>
                        <option >11:00</option>
                        <option >12:00</option>
                        <option >13:00</option>
                        <option >14:00</option>
                        <option >15:00</option>
                        <option >16:00</option>
                        <option >17:00</option>
                        <option >18:00</option>
                        <option >19:00</option>
                        <option >20:00</option>
                    </Form.Select>
                    <Button className="my-3  btn-mod" variant='secondary' onClick={cancelar}>
                        Cancelar turno
                    </Button>
                </Modal.Body>
            </Modal>

             {/*Modal precios*/}
             <Modal style={{marginTop:'4rem'}} show={show3} onHide={handleClose3}>
                <Modal.Body  className="modalContent"> 
                    <Modal.Title>LISTA DE PRECIOS</Modal.Title>
                    <p style={{fontSize:'22px'}}></p>
                    <Button className="my-3  btn-mod" variant='secondary' onClick={handleClose3}>
                        Cerrar
                    </Button>
                </Modal.Body>
            </Modal>
        </div>
    )

}

export default Turnos;