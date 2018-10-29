import React, { Component } from 'react';
import firebase from '../../config/firebase'
import APPLOGO from '../../Components/AppLogo/AppLogo'


class Form3 extends Component {
    constructor(props) {
        super(props);
        this.state  = {
        
            isCocktail :false ,
            isJuice : false ,
            isCoffee : false,

            ismin20 : false ,
            ismin60 : false ,
            ismin120 : false ,
      
            beveragesArr:[],
            timedurationArr : []
        }

     
    }
    

    componentDidMount() {
      const user = firebase.auth().currentUser;
      if(user){

      
      }
      else{
          
          this.props.history.push('/',{})
      }
      //  const { state }= this.props.history.location ;
        // console.log('beverages select =========>',state)
      
    }
    

    gotoMap(e){

      e.preventDefault()

     const {  beveragesArr , timedurationArr  , isCocktail , isCoffee , isJuice , ismin20 , ismin60 , ismin120 } = this.state;
     const { state } = this.props.history.location ;

          if(isCoffee){
            beveragesArr.push('coffee')
          }
          if(isCocktail){
            beveragesArr.push('cocktail')
          }
          if(isJuice){
            beveragesArr.push('juice')
          }
  
  
  
          if(ismin20){
            timedurationArr.push('min20')
          }
          if(ismin60){
            timedurationArr.push('min60')
          }
          if(ismin120){
            timedurationArr.push('min120')
          }
  
          let beverages = beveragesArr
  
          let timeduration = timedurationArr
        
        if(beveragesArr.length && timedurationArr.length ){
         
          this.props.history.push('/Location',{...state,beverages,timeduration})
        }
        
      
        else{
          alert('Please select atleast one beverages and duration')
        }
       
    }

   
    // SELECT BEVERAGES FUNCTIONS
    
      toggleChangeCocktail = () => {
        this.setState(prevState => ({
            isCocktail: !prevState.isCocktail,
        }));
      }

      toggleChangeCoffee = () => {
      this.setState(prevState => ({
        isCoffee : !prevState.isCoffee ,
      }));
    }

    toggleChangeJuice = () => {
      this.setState(prevState => ({
        isJuice : !prevState.isJuice ,
      }));

    }

     // SELECT TIME DURATION FUNCTIONS
         
      toggleChangemin20 = () => {
      this.setState(prevState => ({
        ismin20 : !prevState.ismin20 ,
      }));
    }

    toggleChangemin60 = () => {
        this.setState(prevState => ({
          ismin60 : !prevState.ismin60 ,
        }));
      }

      toggleChangemin120 = () => {
        this.setState(prevState => ({
          ismin120 : !prevState.ismin120 ,
        }));
      }
    
    
    

  
    render() {
        const { isCocktail , isCoffee , isJuice , ismin20 , ismin60 , ismin120  } = this.state ;
      
        return (
            <div>
                  <h2>FORM 3</h2>
                <form   width='50%' 
                    onSubmit={(e)=> this.gotoMap(e)}
                style={{width:'50%',margin:'auto'}}>
                <APPLOGO/>
                          
                        {/* SELECT BEVERAGES CHECKBOX */}
                          <div className="">
                          <div className="checkbox">
                          <p> Select Beverages</p>
                            <label><input type="checkbox" name='Coffee' 
                            checked={isCoffee}
                            onChange={this.toggleChangeCoffee}
                             value="Coffee"/>Coffee</label>
                            </div>
                            <div className="checkbox">
                            <label><input type="checkbox" name='Juice' 
                            checked={isJuice}
                            onChange={this.toggleChangeJuice}
                            value="Juice"/>Juice</label>
                            </div>
                            <div className="checkbox">
                            <label><input type="checkbox" name='Cocktail'
                            checked={isCocktail}
                            onChange={this.toggleChangeCocktail}
                             />Cocktail</label>
                            </div>
                          </div>

                          {/* SELECT TIME DURATION CHECKBOX */}
                         
                          <div className="">
                          <div className="checkbox">
                          <p> Select Time Duration</p>
                            <label><input type="checkbox" name='20 min' 
                            checked={ismin20}
                            onChange={this.toggleChangemin20}
                             value="Coffee"/>20 min</label>
                            </div>
                            <div className="checkbox">
                            <label><input type="checkbox" name='60 min' 
                            checked={ismin60}
                            onChange={this.toggleChangemin60}
                            value="Juice"/>60 min</label>
                            </div>
                            <div className="checkbox">
                            <label><input type="checkbox" name='120 min'
                            checked={ismin120}
                            onChange={this.toggleChangemin120}
                             />120 min</label>
                            </div>
                          </div>
                          
                      
                          <button  className="btn btn-primary"
                        
                          >NEXT</button>
                      </form>
            </div>
        );
    }
}

export default Form3;