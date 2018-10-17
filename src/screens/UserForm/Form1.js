import React, { Component } from 'react';
import firebase from '../../config/firebase';

class Form1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName:'' ,
            nickname :'' ,
            phoneno : ''
        }
    }
    

    gotoForm2(){
        const { displayName , nickname ,phoneno } = this.state

       if(nickname && phoneno ){
        this.props.history.push('/Form2',{ displayName , nickname , phoneno })
       }
       else{
           alert("PLEASE FILL PROPER DETAILS")
       }
        
    }

componentDidMount(){

    console.log("form1",this.props.history.location.state)

    this.setState({
        displayName : this.props.history.location.state.displayName
    })
}

    render() {
        
        const { displayName , nickname ,phoneno } = this.state

        return (
            <div>
                <h3>{displayName}</h3>
                <h1>FORM1</h1>
                        
                        <form action="" method="" role="" width='50%' style={{width:'50%',margin:'auto'}}>
                          
                        
                            <div className="form-group">
                                <label htmlFor="">NICKNAME</label>
                                <input type="text" className="form-control" id="" placeholder="Enter your NickName" name='nickname' value={nickname}
                                onChange={(e)=> this.setState({ [e.target.name] : e.target.value  })}
                                required
                                />

                            </div>
                            <div className="form-group">
                                <label htmlFor="">Phone no</label>
                                <input type="text" className="form-control" id="" placeholder="Enter your Phone no" name='phoneno' value={phoneno}
                                 onChange={(e)=> this.setState({ [e.target.name] : e.target.value  })}
                                 required
                                />
                            </div>
                        
                            
                        
                            <button type="submit" className="btn btn-primary"
                            
                            onClick={()=>{this.gotoForm2()}}

                            >NEXT</button>
                        </form>
                        
              
            </div>
        );
    }
}

export default Form1;