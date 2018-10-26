import React, { Component } from 'react';

class Form1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName:'' ,
            nickname :'' ,
            phoneno : '',
            userId :'' ,
            email :'',

        }
    }
    

    gotoForm2(){
        const { displayName , nickname ,phoneno , userId , email} = this.state

       if(nickname && phoneno ){
        this.props.history.push('/Form2',{ displayName , nickname , phoneno , userId , email })
       }
       else{
           alert("PLEASE FILL PROPER DETAILS")
       }
        
    }

componentDidMount(){
        const { displayName }= this.state;
    console.log("form1",this.props.history.location.state)
    let getDisplayname = this.props.history.location.state.displayName || ''
    let getEmail = this.props.history.location.state.email || ''
    let getUid = this.props.history.location.state.userId || ''
    this.setState({
        displayName : getDisplayname ,
        email : getEmail ,
        userId : getUid
    })
}

    render() {
        
        const { displayName , nickname ,phoneno } = this.state

        return (
            <div>
                <h3>{displayName}</h3>
                <h1>FORM1</h1>
                        
                        <form width='50%' style={{width:'50%',margin:'auto'}}>
                          
                        
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