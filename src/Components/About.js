import React, {Component} from 'react';
import axios from "axios";
import {Card, Button, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";



class About extends Component {
    state={
        data: [],
        basket: [],
        con: true
    }

    componentDidMount() {
        const t = axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.props.match.params.n}`);
        t.then((g) => {
            console.log(g)
            this.setState({data: g.data.meals,con: false})
        });
        this.setState({basket: JSON.parse(localStorage.getItem('baskets')) || []})
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.basket !== this.state.basket) {
            localStorage.setItem("baskets", JSON.stringify(this.state.basket));
        }
    }

    onclick = (p) => {
        this.setState(prev => {
            return {basket: prev.basket.find(s => s.idMeal === p.idMeal)? prev.basket.filter(v => v.idMeal !== p.idMeal): [...prev.basket, p]}
        })
    }
    send = (p) => {
        axios.get('https://api.telegram.org/bot1993610975:AAEONHtD8R_21wiWHCd-rQtSoTz9RWhRSUE/sendPhoto',
            {
                params: {
                    chat_id: '@besoftteach',
                    photo: p.strMealThumb,

                },
            })
    }

    render() {
        return this.state.con? <Spinner className={'spiner'} animation="border" />:
            <div className={'d-flex  justify-content-around flex-wrap'}>
                {this.state.data.map(p =>
                    <Card  style={{width: '20rem'}} className={'m-lg-5 s flex-column'}>
                        <Card.Img className={'img'} variant="top" src={p.strMealThumb}/>
                        <Card.Body>
                            <Card.Title style={{textAlign: 'center'}}>{p.strMeal}</Card.Title>
                            <Button as={Link} to={`/MoreDetails/${p.idMeal}`} variant="primary" className={'mt-4'}>Подробнее</Button>
                            <Button className={'w-100 mt-4'} variant={this.state.basket.find(v => v.idMeal === p.idMeal)? 'danger' : 'secondary'}
                            onClick={() =>  this.onclick(p)}>{this.state.basket.find(v => v.idMeal === p.idMeal)? 'Remove Basket': 'Add Basket'} </Button>
                            <Button className={'w-100 mt-3'} onClick={() => this.send(p)}>Telegram</Button>
                        </Card.Body>
                    </Card>
                )}
            </div>

    }
}

export default About;