import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Admin = () =>{

    return(
        <div style={{color:'white',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <h3>NavajaLegendary/admin</h3>
            <Link to='/verturnosreservadosparahoy'>
                <Button className="m-1 btn-admin">
                    Ver turnos del día
                </Button>
                <br />
            </Link>
            <Link to='/vertodoslosturnosregistrados'>
                <Button className="m-1 btn-admin">
                        Ver todos los turnos
                </Button>
            </Link>
            <Link to='/actualizandopreciosdenavajalegendary'>
                <Button className="m-1 btn-admin">
                        Actualizar precios
                </Button>
            </Link>
        </div>
    )
}

export default Admin;