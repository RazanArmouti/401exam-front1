import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import FavFruitCard from './FavFruitCard';

class FavFruit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Favlist: []
    }
  }

  componentDidMount=async () =>{
    await axios.get(`${process.env.REACT_APP_SERVERURL}/getAll`).then(response =>{
      response.data?this.setState({
        Favlist: response.data
      }):this.setState({
        Favlist: []
      })
    })
    //console.log('Favlist'+this.state.Favlist)
  }

  render() {
    return (
      <>
        <h1>My Favorite Fruits</h1>
        <div className="row">
          {
            this.state.Favlist?this.state.Favlist.map((list,idx) =>{
            return <FavFruitCard key={idx} image={list.image} name={list.name} price={list.price} _id={list._id}/>
             }) :''
          }

        </div>
      </>
    )
  }
}

export default FavFruit;
