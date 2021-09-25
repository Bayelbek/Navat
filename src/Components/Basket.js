import React, {Component} from 'react';
import axios from "axios";
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";


class Basket extends Component {
    state={
        basket2: []
    }

    componentDidMount() {
        this.setState({basket2: JSON.parse(localStorage.getItem('baskets')) || []})
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.basket2 !== this.state.basket2) {
            localStorage.setItem("baskets", JSON.stringify(this.state.basket2));
        }
    }
    onclick = (i) => {
            let a =[...this.state.basket2];
            a.splice(i, 1)
        this.setState({basket2: a})
        }

    render() {
        if(this.state.basket2.length<1) {
            return (
                <>
                    <h1 style={{textAlign:'center', marginTop: '250px', color: 'red'}}>Sorry, you didn't order anything.</h1>
                </>
            )
        } else if (this.state)
            return (
            <div className={'d-flex  justify-content-around flex-wrap'}>
                {this.state.basket2.map((v, i) =>
                    <Card style={{width: '20rem'}} className={'m-lg-5 s flex-column'}>
                        <Card.Img className={'img'} variant="top" src={v.strMealThumb}/>

                        <Card.Body>
                            <Card.Title style={{textAlign: 'center'}}>{v.strMeal}</Card.Title>
                            <Button as={Link} to={`/MoreDetails/${v.idMeal}`} variant="primary" className={'mt-4'}>Подробнее</Button>
                            <Button className={'w-100 mt-4'} variant={this.state.basket2.find(p => p.idMeal === v.idMeal)? 'danger' : 'secondary'}
                                    onClick={() => this.onclick(i)}>{this.state.basket2.find(p => p.idMeal === v.idMeal)? 'Remove Basket': 'Add Basket'}</Button>
                        </Card.Body>
                    </Card>
                )}
            </div>
        );
    }
}

export default Basket;