import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ScreensRoute from './routes'
// import swal from 'sweetalert'

import ReactDOM from 'react-dom';

// import ReactSwing from '../ReactSwing/react-ReactSwing.js';
import ReactSwing from '../node_modules/react-swing'

import './App.css';
import './mystyle.css' ;



class App extends Component {

  stackEl = React.createRef();

  constructor(props) {
    super(props);
    
    this.state = {
      stack : null
    }
  }
  
  throwCard() {
    // ReactSwing Card Directions
    console.log('ReactSwing.DIRECTION', ReactSwing.DIRECTION);

    console.log('this.state.stack', this.state.stack);
    console.log('this.state.stack.getConfig', this.state.stack.getConfig());
    console.log('this.stackEl', this.stackEl);

    // ReactSwing Component Childrens
    const targetEl = this.stackEl.current.childElements[1];
    console.log('targetEl', targetEl);

    if (targetEl && targetEl.current) {
      // stack.getCard
      const card = this.state.stack.getCard(targetEl.current);

      console.log('card', card);

      // throwOut method call
      card.throwOut(100, 200, ReactSwing.DIRECTION.RIGHT);
    }
  }


  render() {
    
    
    return (
      
      <div className="App">
      <h1>HELLLO REACT</h1>
         
      <div id="">
          {/*
            ReactSwing Element
          */}
          <ReactSwing
            className="stack"
            tagName="div"
            setStack={stack => this.setState({ stack })}
            ref={this.stackEl}
            throwout={e => console.log('throwout', e)}
          >
            {/*
                children elements is will be Card
            */}
            <div className="card clubs" ref="card1" throwout={e => console.log('card throwout', e)}>
              ♣
            </div>
            <div className="card diamonds" ref="card2">
              ♦
            </div>
            <div className="card hearts" ref="card3">
              ♥
            </div>
            <div className="card spades" ref="card4">
              ♠
            </div>
          </ReactSwing>
        </div>
        {/* <div className="control">
          <button type="button" onClick={this.throwCard.bind(this)}>
            throw Card
          </button>
        </div> */}
                  

            {/* <h1>HELLO REACT</h1> */}

            
          
          
            

<div>
           {/* <ScreensRoute/> */}
        </div>
      </div>
        

    );
  
  
  }
  

  
}
  




export default withRouter(App);
