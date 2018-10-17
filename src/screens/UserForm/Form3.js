import React, { Component } from 'react';

class Form3 extends Component {

    constructor(props) {
        super(props);
        
    }

    componentDidMount() {

        console.log('form3', this.props.history.location.state)        

        this.setState({
                userInfo : this.props.history.location.state ,
               
        })
    }
    

    gotoDashboard(e){
        const { userInfo } = this.state;
       e.preventDefault()
       
    }
    render() {
      
        return (
            <div>
                  <h2>FORM 3</h2>
                <form   href="javascript:void(0)" width='50%' 
                    onSubmit={(e)=> this.gotoDashboard(e)}
                style={{width:'50%',margin:'auto'}}>
                          
                        
                          <div className="">
                          <div class="checkbox">
                          <p> Select Beverages</p>
                            <label><input type="checkbox" value="Coffee"/>Coffee</label>
                            </div>
                            <div class="checkbox">
                            <label><input type="checkbox" value="Juice"/>Juice</label>
                            </div>
                            <div class="checkbox">
                            <label><input type="checkbox" value="Cocktail"/>Cocktail</label>
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