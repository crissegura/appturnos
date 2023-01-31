import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Admin = () =>{

    return(
        <div style={{color:'white',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <h3>OldSchoolBarberia/admin</h3>
            <Link to='/verturnosreservadosparahoy'>
                <Button>
                    Ver turnos
                </Button>
            </Link>
            
        </div>
    )
}

export default Admin;