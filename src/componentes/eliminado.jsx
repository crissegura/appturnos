import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import { useParams } from 'react-router-dom';


const Eliminado = ( ) => {

    const {cliente} = useParams()
    const {dia} = useParams()
    const {hora} = useParams()

    const [showToast, setShowToast] = useState(true)
    const toggleShowToast = () => setShowToast(!showToast)

    console.log(cliente)

    return(

        <div style={{display:'flex',justifyContent:'center', flexDirection:'column', alignItems:'center'}}>

            <Row className="my-3">
                <Col md={6} className="mb-2">
                    <Toast show={showToast} >
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
                        ¡Turno eliminado correctamente!
                        <br />
                        Nombre: {cliente}
                        <br />
                        Dia: {dia}
                        <br />
                        Hora: {hora}
                    </Toast.Body>
                    </Toast>
                </Col>
            </Row>

            <a href='/' className="my-1 btn-inicio btns">
                <img className="imgBtn" src="https://cdn-icons-png.flaticon.com/512/595/595777.png" alt="" />
                <span>Volver al inicio</span> 
            </a>

        </div>

    )

}

export default Eliminado;