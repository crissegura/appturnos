import {Button} from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { AiFillCopy } from "react-icons/ai";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { collection, getDocs, addDoc, deleteDoc, doc} from 'firebase/firestore';
import db from '../services/firebase';
import axios from 'axios';

const Turnos = ( ) => {

    const navigation = useNavigate()

    const [precios, setPrecios] = useState([])

    const verPrecios=async()=>{
        try{
            const document = collection(db,"precios")
            const col = await getDocs(document)
            const result = col.docs.map((doc)=> doc={id:doc.id,...doc.data()})
            setPrecios(result)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        verPrecios()
    }, []);

    const navigate = useNavigate()

    //Modal Alias
    const [show4, setShow4] = useState(false);
    const handleClose4 = () => setShow4(false);
    const modalAlias = () => setShow4(true);

    //Modal precios
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const modalPrecios = () => setShow3(true);
   
    //Sacar un turno
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const modalTurno = () => setShow(true);
    const [turnos, setTurnos] = useState([])
    const getTurnos=async()=>{
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
        getTurnos()
    }, []);

    const addTurno = async () => {
        try {
            const docRef = await addDoc(collection(db, "turnos"), {
              nombre: document.getElementById('nombre').value.toLowerCase(),
              dia: document.getElementById('dia').value,
              hora : document.getElementById('hora').value  
            }).then(navigation(`/confirmado/${document.getElementById('nombre').value.toLowerCase()}/${document.getElementById('dia').value}/${document.getElementById('hora').value}
            `))
          } catch (e) {
            console.error("ERROR: ", e);
          }
    }

    const solicitar = ( e ) =>{
        e.preventDefault()
        let turno = turnos.find((t)=>t.dia===document.getElementById('dia').value&&t.hora===document.getElementById('hora').value)
        //Verificación de que este dispoible el turno y envio de ser así.
        document.getElementById('hora').value!==''&&document.getElementById('dia').value!==''&&document.getElementById('nombre').value!==''?
        turno?
        alert('Turno no disponible.')
        :addTurno()
        :alert('Por favor llena todos los campos.')   
    }
    //Cancelar un turno
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const cancelarTurno = () => setShow2(true);

    const borrarTurno = async (id) => {
        try {
            const reference = doc(db, 'turnos', id)
            await deleteDoc(reference).then(navigation(`/eliminado/${document.getElementById('nombre2').value.toLowerCase()}/${document.getElementById('dia2').value}/${document.getElementById('hora2').value}
            `))
        } catch (e) {
            console.error("ERROR: ", e);
        }
    }


    const cancelar = ( e ) => {
        e.preventDefault()
        let cancelar = turnos.find((t)=>t.dia===document.getElementById('dia2').value&&t.hora===document.getElementById('hora2').value&&t.nombre.toLowerCase()===document.getElementById('nombre2').value.toLowerCase())
        cancelar?
        borrarTurno(cancelar.id)
        :alert('NO HABIA NINGUN TURNO')

    }

    //Si ya tiene turno y quiere cancelar autorellenar
    const a = () =>{
    let cancelar = turnos.find((turno)=>turno.nombre===document.getElementById('nombre2').value.toLowerCase())
    document.getElementById('dia2').value = cancelar.dia
    document.getElementById('dia2').setAttribute('disabled', true)
    document.getElementById('hora2').value = cancelar.hora
    document.getElementById('hora2').setAttribute('disabled', true)
    }

    const [copiado, setCopiado] = useState(false)

    const textoCopiado = () => {
        setCopiado(true)
        document.getElementById('aliasCopiado').classList.add('d-block')
    }

    const textoNoCopiado = () => {
        setCopiado(false)
        document.getElementById('aliasCopiado').classList.add('d-none')
    }

    const cerrarModalAlias = ( ) => {
        textoNoCopiado()
        handleClose4()
    }


    const [showToast2, setShowToast2] = useState(false)
    const toggleShowToast2 = () => setShowToast2(!showToast2)
    

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
            <Button  onClick={modalAlias} className="my-1 btn-inicio btns">
                <img className="imgBtn" src="https://cdn-icons-png.flaticon.com/512/595/595777.png" alt="" />
                <span>Alias MercadoPago</span> 
            </Button>
            <br />
            
            
            
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
                    <Form.Label className="my-1">Servicio/os</Form.Label> 
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
                    {
                        precios.map((e)=>{
                            return <div className="divServiciosYPrecios">
                                <p>{e.servicio}</p>
                                <p>${e.precio}</p>
                            </div>
                        })
                    }
                    <Button className="my-3  btn-mod" variant='secondary' onClick={handleClose3}>
                        Cerrar
                    </Button>
                </Modal.Body>
            </Modal>

            {/*Modal alias*/}
            <Modal style={{marginTop:'4rem'}} show={show4} onHide={handleClose4}>
                <Modal.Body  className="modalContent"> 
                    <Modal.Title>Alias</Modal.Title>
                        
                        <CopyToClipboard text="maquina.cepillo">
                            <p onClick={textoCopiado} id="alias">maquina.cepillo <AiFillCopy className="mx-2" /></p>
                        </CopyToClipboard>
                        <p id="aliasCopiado">¡Alias copiado!</p>
                        
                        <Button className="my-3  btn-mod" variant='secondary' onClick={cerrarModalAlias}>
                            Cerrar
                        </Button>
                </Modal.Body>
            </Modal>

            {/* <Row>
                <Col md={6} className="mb-2">
                    <Toast show={showToast2} onClose={toggleShowToast2}>
                    <Toast.Header>
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/595/595777.png"
                            width={'20px'}
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto" style={{color:'black'}}>NAVAJA LEGENDARY</strong>
                    </Toast.Header>
                    <Toast.Body style={{color:'black'}}>
                        ¡Turno cancelado correctamente!
                    </Toast.Body>
                    </Toast>
                </Col>
            </Row> */}
        </div>
    )

}

export default Turnos;