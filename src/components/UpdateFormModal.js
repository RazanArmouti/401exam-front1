import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

class UpdateFormModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updatedImage: this.props.image,
            updatedName:  this.props.name,
            updatedPrice: this.props.price,
            updatedEmail: this.props.auth0.user.email,
            updatedFavlist:[]

        }
    }

    handleUpdate = async () => {
        let recordId= this.props.recordId
        let config={
            method:'PUT',
            baseURL:`${process.env.REACT_APP_SERVERURL}`,
            url:`/updateFruit/${recordId}`,
            data:{
                image:this.state.updatedImage,
                name:this.state.updatedName,
                price:this.state.updatedPrice,
                email:this.state.updatedEmail

            }
        }
        await axios(config).then(response=>{
         this.setState({
            updatedFavlist: response.data

         })   
            
        })

    }
    handleImage = (e) => {
        this.setState({
            updatedImage: e.target.value
        })
    }
    handlePrice = (e) => {
        this.setState({
            updatedPrice: e.target.value
        })

    }
    handleName = (e) => {
        this.setState({
            updatedName:e.target.value
        })

    }
    handleEmail = (e) => {
        this.setState({
            updatedEmail:e.target.value
        })

    }

    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.handleClose}>
                <Modal.Header >
                    <Modal.Title>Update Fruit Information</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form>
                        <label>image_url</label><br />
                        <input type="text" style={{ width: "450px" }} value={this.state.updatedImage} onChange={this.handleImage} /><br />
                        <label > name</label><br />
                        <input type="text" style={{ width: "450px" }} value={this.state.updatedName} onChange={this.handleName} /><br />
                        <label >price</label><br />
                        <input type="text" style={{ width: "450px" }} value={this.state.updatedPrice} onChange={this.handlePrice} /><br />
                        <label >email </label><br />
                        <input type="text" style={{ width: "450px" }} value={this.state.updatedEmail} onChange={this.handleEmail} /><br />

                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>Close</Button>
                    <Button variant="primary" onClick={this.handleUpdate}>Save changes</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default withAuth0(UpdateFormModal)
