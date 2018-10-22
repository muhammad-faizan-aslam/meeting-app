import React, { Component } from 'react';

class Form3 extends Component {
    constructor(props) {
        super(props);
        this.state  ={
        
            isCocktail :false ,
            isJuice : false ,
            isCoffee : false,

            ismin20 : false ,
            ismin60 : false ,
            ismin120 : false ,

            beveragesOBJ :{},
            timeduarationOBJ :{},
            userInfo :{}
        }

     
    }
    

    componentDidMount() {

        console.log('form3', this.props.history.location.state)        

        this.setState({
                userInfo : this.props.history.location.state || {} ,
               
        })
    }
    

    gotoMap(e){
        const { userInfo , beveragesOBJ , timeduarationOBJ , isCocktail , isCoffee , isJuice , ismin20 , ismin60 , ismin120 } = this.state;
       e.preventDefault()

        beveragesOBJ.coffee = isCoffee
        beveragesOBJ.juice = isJuice
        beveragesOBJ.cocktail = isCocktail

        userInfo.beverages = beveragesOBJ
        
        timeduarationOBJ.min20 = ismin20
        timeduarationOBJ.min60 = ismin60
        timeduarationOBJ.min120 = ismin120
        
        userInfo.timeduration = timeduarationOBJ
        
       this.setState({
       beveragesOBJ ,
       userInfo
       })

       


       this.props.history.push('/Map',{userInfo})
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
        const { userInfo , isCocktail , isCoffee , isJuice , ismin20 , ismin60 , ismin120 , beveragesOBJ } = this.state ;
        // console.log('min20 , 60 , 120 ',ismin20 , ismin60 , ismin120)
       console.log("bev obj",beveragesOBJ)
       console.log("userInfo obj",userInfo)
        return (
            <div>
                  <h2>FORM 3</h2>
                <form   width='50%' 
                    onSubmit={(e)=> this.gotoMap(e)}
                style={{width:'50%',margin:'auto'}}>
                          
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