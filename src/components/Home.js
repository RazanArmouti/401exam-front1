import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import FruitCard from './FruitCard';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruitsList: []
    }
  }
  componentDidMount = async () => {
    await axios.get(`${process.env.REACT_APP_SERVERURL}/getAPI`).then(results => {
      results.data ? this.setState({
        fruitsList:Object.values( results.data)
      }) : this.setState({
        fruitsList: []
      })
    });
    //console.log(this.state.fruitsList)
  }
 
  render() {
    return (
      <>
        <h1>API Fruits</h1>
        <h3>Select your favorites :)</h3>
        <div className="row">
          {
            //console.log(this.state.fruitsList.length,this.state.fruitsList)
            this.state.fruitsList.length !== 0 ? this.state.fruitsList.map((list) => { 
              return list.map((item,idx)=>{
                return <FruitCard key={idx} name={item.name} image={item.image} price={item.price} />
              })             
            }) : ''
          }
        </div>
      </>
    )
  }
}

export default Home;
