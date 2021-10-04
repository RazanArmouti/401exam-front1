import axios from 'axios';
import React, { Component } from 'react';
import { Col,Card,Button } from 'react-bootstrap';
import UpdateFormModal from './UpdateFormModal';

 class FavFruitCard extends Component {
    constructor(props){
        super(props);
        this.state={
            showModal:false
        }
    }
    handleDelete= async () =>{
        let recordId= this.props._id;
        let config={
            method:'DELETE',
            baseURL:`${process.env.REACT_APP_SERVERURL}`,
            url:`/deleteFruit/${recordId}`
        }
         axios(config).then(response=>{
         
            response.status(200).json(response.data)
        })
        window.location.reload(true);

    }

    handleClose=()=>{
        this.setState({
            showModal:false
        })
    }    
  
    handleOpenModal= ()=>{
        this.setState({
            showModal:true
        })
        console.log(this.state.showModal);
    }
    render() {
        return (
            <Col>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={this.props.image}/>
                <Card.Body>
                    <Card.Title>{this.props.name}</Card.Title>
                    <Card.Text>
                       Price: {this.props.price}
                    </Card.Text>
                    <Button variant="success" onClick={this.handleOpenModal}>Update</Button>{' '}
                    {this.state.showModal? <UpdateFormModal handleClose={this.handleClose} showModal={this.state.showModal } 
                    name={this.props.name} image={this.props.image} price={this.props.price} recordId={this.props._id}/> :''}
                    <Button variant="danger" onClick={this.handleDelete}>Delete</Button> 
                </Card.Body>
            </Card>
        </Col>
        )
    }
}

export default FavFruitCard
