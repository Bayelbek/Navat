import React, {Component} from 'react';
import axios from "axios";
import {Button, Card, Col, Container, Row, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
class MoreDetails extends Component {
    state={
        data: [],
        con: true
    }


    componentDidMount() {
        const c = axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${this.props.match.params.f}`);
        c.then((b) => {
            console.log(b)
            this.setState({data: b.data.meals, con: false})
        });
    }
    render() {
        return this.state.con? <Spinner className={'spiner'} animation="border" />:
            <div>
                {this.state.data.map(b =>
                    {
                        const v = b.strYoutube.split('v=')[1];
                        return (
                            <Container  className={'m-lg-5'}>
                                <Row>
                                    <Col xs={6} >
                                        <img className={'w-100'} src={b.strMealThumb}/>
                                    </Col>
                                    <Col xs={6}  >
                                        <h1>{b.strMeal}</h1>
                                        <div>{b.strInstructions}</div>
                                        <Col>
                                        <iframe className={'mt-3'} id="player" type="text/html" width="640" height="360"
                                                src={`http://www.youtube.com/embed/${v}?enablejsapi=1`}
                                                frameBorder="0"/>
                                        </Col>
                                    </Col>
                                </Row>
                            </Container>
                        );
                    }
                )}
            </div>

    }
}

export default MoreDetails;