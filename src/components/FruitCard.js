import React, { Component } from 'react'
import { Col, Card, Button } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

class FruitCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addedFruite: []

        }
    }

    handleFav = async () => {
       //console.log(this.props.auth0.user.email)
        let config = {
            method: 'POST',
            baseURL: `${process.env.REACT_APP_SERVERURL}`,
            url: '/addFruit',
            data: {
                image: this.props.image,
                name: this.props.name,
                price: this.props.price,
                email: this.props.auth0.user.email
            }
        }
        await axios(config).then(response => {
            response.data ? this.setState({
                addedFruite: response.data
            }) : this.setState({
                addedFruite: []
            })
        })
        //window.location.reload(true);
        //console.log("added item " + this.state.addedFruite)
    }

    render() {
        return (
            <Col>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.image} />
                    <Card.Body>
                        <Card.Title>{this.props.name}</Card.Title>
                        <Card.Text>
                            Price: {this.props.price}
                        </Card.Text>
                        <Button variant="primary" onClick={this.handleFav}>Add to Favoritios</Button>
                    </Card.Body>
                </Card>
            </Col>
        )
    }
}

export default withAuth0(FruitCard)
