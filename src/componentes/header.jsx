import Navbar from 'react-bootstrap/Navbar';
import logo from './media/logo.png'

function Header() {
  return (
    <Navbar className='NavBar' >
      <img src={logo}
      style={{borderRadius:'10px',marginLeft:'0'}}
      width='100rem' /> 
      <h2 style={{fontSize:'25px',paddingTop:'15px'}}>NAVAJA LEGENDARY</h2>
    </Navbar>
  );
}

export default Header;