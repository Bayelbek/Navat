import React, {Component} from 'react';
import axios from "axios";
import {Card, Spinner} from "react-bootstrap";

class Search extends Component {
    state={
        data: [],
        con: true
    }

    componentDidMount() {
        this.search();
    }

    componentDidUpdate(prevProps) {

    }

    search = () => {
        const q = axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${this.props.match.params.f}`);
        q.then((d) => {
            console.log(d)
            this.setState({data: d.data.meals,con: false})
        });
    }
    render() {
        return this.state.con? <Spinner className={'spiner'} animation="border" />:
            <div className={'d-flex  justify-content-around flex-wrap'}>
                {this.state.data.map(l =>
                    <Card  style={{width: '20rem'}} className={'m-lg-5 s flex-column'}>
                        <Card.Img className={'img'} variant="top" src={l.strMealThumb}/>

                        <Card.Body>
                            <Card.Title style={{textAlign: 'center'}}>{l.strMeal}</Card.Title>
                        </Card.Body>
                    </Card>
                )}
            </div>

    }
}

export default Search;