import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';




const Ingresar = ( ) => {

    const location = useNavigate()

    const ingresar = ( ) => {

        let usuario = 'admin'
        let contraseña = 1234
        
        usuario === 'admin' && contraseña === 1234 ? location(`/admin`):console.log('DISTINTO');
        
    }

    return(
        <div style={{color:'white',display:'flex',alignItems:'center',flexDirection:'column', width:'80%', marginLeft:'10%'}}> 
            <Form.Label className="my-1">Usuario</Form.Label> 
            <Form.Control type="text" id='usuario' />
            <Form.Label className="my-1">Contraseña</Form.Label> 
            <Form.Control type="password" id='contraseña' />
            <Button variant='secondary' className='my-2' onClick={ingresar}>
                Ingresar
            </Button>
        </div>
    )
}

export default Ingresar;