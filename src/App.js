import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Home from './Components/Home'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import {Form, FormControl, Nav, Navbar, NavDropdown, Button, Container, Card, Spinner} from "react-bootstrap";
import About from "./Components/About";
import Country from "./Components/Country";
import Search from "./Components/Search";
import MoreDetails from "./Components/ MoreDetails";
import Basket from "./Components/Basket";

class App extends Component {
    state={
        data: [],
        items: '',
        con: true
    }
    componentDidMount() {
        const x = axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        x.then((i) => {
            console.log(i.data.meals)
           this.setState({data:i.data.meals, con: false})
        });
    }

    render() {
        const c = Object.values(this.state.data)
        return  this.state.con? <Spinner className={'spiner'} animation="border" />:
            <Router>
                <Navbar bg="secondary" expand="lg">
                    <Container>
                        <Navbar.Brand href="/home">NAVAT</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll"/>
                        <Navbar.Collapse id="navbarScroll" className={'justify-content-md-between'}>
                            <Nav
                                className="mr-auto my-2 my-lg-0"
                                style={{maxHeight: '100px'}}
                                navbarScroll
                            >
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link as={Link} to={'/Basket'}>Basket</Nav.Link>
                                <NavDropdown title="Сountry" id="navbarScrollingDropdown">
                                    {c.map(function(obj) {
                                        return Object.keys(obj).sort().map((key) => {
                                            return  <NavDropdown.Item as={Link} to={`/Country/${obj[key]}`} >{obj[key]}</NavDropdown.Item>

                                        });
                                    })}
                                </NavDropdown>
                            </Nav>
                            <Form className="d-flex">
                                <FormControl
                                    type="search"
                                    placeholder="Поиск..."
                                    className="mr-2"
                                    aria-label="Search"
                                    onChange={(e) =>
                                        this.setState({items: e.target.value})
                                    }
                                    value={this.state.items}
                                />
                                <Button variant="secondary" as={Link} to={`/Search/${this.state.items}`}>Искать</Button>
                            </Form>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Switch>
                    <Route path="/about/:n" component={About}/>
                    <Route path="/Country/:f" component={Country}/>
                    <Route path={"/Search/:f"} component={Search}/>
                    <Route path={"/MoreDetails/:f"} component={MoreDetails}/>
                    <Route path={"/Basket"} component={Basket}/>
                    <Route path="/home">
                        <Home/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>

                </Switch>

            </Router>

    }
}


export default App;
