import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logout from "../Auth/Logout";
import { useSelector } from "react-redux";
export default function TheNav(props) {

  const isPremium = useSelector((state) => state.expense.premieum);
  return (
    <Navbar bg="dark" expand="lg" className="py-1">
    <Container fluid>
    <Navbar.Brand href="/welcome"
          className="border border-4 border-info rounded-4 bg-dark my-1"
        >
          <h5 className="text-white fw-bold border  px-2 my-1 mx-2 border-5 rounded-3 border-primary">
           React Expense 
          </h5>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 m-auto "
            style={{ maxHeight: "100px" }}
            navbarScroll>
              <Nav.Link href="/profile" className="text-white fs-5 mx-3">Profile Page</Nav.Link>
              <Nav.Link href="/dailyexp" className="text-white fs-5 mx-3">Daily Expenses</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#" className="me-3"><Logout className="btn btn-info px-3 py-2 text-success fw-bold"/></Nav.Link>
              {isPremium && (<Nav.Link href="#" style={{ fontWeight: "bold" }}></Nav.Link>)}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}
