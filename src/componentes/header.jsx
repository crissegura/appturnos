import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <Navbar variant="dark" bg="dark">
    <Container style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <Navbar.Brand >
            <img src="https://e7.pngegg.com/pngimages/635/596/png-clipart-cartoons-depicting-barber-barber-cartoon-barber-thumbnail.png"
            style={{borderRadius:'50%'}}
            width='100rem' />
        </Navbar.Brand>
        <Navbar.Brand style={{textAlign:'center'}}>
            <h2 style={{fontSize:'2rem'}}>Old School Barbería</h2>
        </Navbar.Brand>
    </Container>
    </Navbar>
  );
}

export default Header;