import React, {Component} from 'react';
import axios from "axios";
import {Card, Spinner} from "react-bootstrap";
class Country extends Component {
    state = {
        data: [],
        con: true

}

componentDidMount() {
        this.rgbi();
}

    componentDidUpdate(prevProps) {
    if ( this.props.match.params.f !== prevProps.match.params.f) {
       this.rgbi();
    }
}

   rgbi = () => {
    const y = axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.props.match.params.f}`);
    y.then((e) => {
        console.log(e)
        this.setState({data: e.data.meals,con: false})
    });
}
    render() {
        return this.state.con? <Spinner className={'spiner'} animation="border" />:
            <div className={'d-flex  justify-content-around flex-wrap'}>
                {this.state.data.map(c =>
                    <Card  style={{width: '20rem'}} className={'m-lg-5 s flex-column'}>
                        <Card.Img className={'img'} variant="top" src={c.strMealThumb}/>

                        <Card.Body>
                            <Card.Title style={{textAlign: 'center'}}>{c.strMeal}</Card.Title>
                        </Card.Body>
                    </Card>
                )}
            </div>

    }
}

export default Country;