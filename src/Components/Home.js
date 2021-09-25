import React, {Component} from 'react';
import axios from "axios";
import {Card, Spinner} from "react-bootstrap";
import './style.css';
import {Link} from "react-router-dom";

class Home extends Component {
    state = {
        data: [],
        con: true
    }

    componentDidMount() {
        const a = axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
        a.then((tor) => {
            console.log(tor)
            this.setState({data: tor.data.categories, con: false})
        });
    }

    render() {
        return this.state.con? <Spinner className={'spiner'} animation="border" />:
            <div className={'d-flex  justify-content-around flex-wrap'}>
                {this.state.data.map(v =>
                    <Card as={Link} to={`/about/${v.strCategory}`} style={{width: '20rem'}} className={'m-lg-5 s flex-column'}>
                        <Card.Img className={'img'} variant="top" src={v.strCategoryThumb}/>

                        <Card.Body>
                            <Card.Title style={{textAlign: 'center'}}>{v.strCategory}</Card.Title>
                        </Card.Body>
                    </Card>
                )}
            </div>

    }
}

export default Home;