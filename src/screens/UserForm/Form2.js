import React, { Component } from 'react';
import firebase from '../../config/firebase'

class Form2 extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            userInfo : {} ,
          

        }
    }
    
    componentDidMount() {

        console.log('form2', this.props.history.location.state)        

        this.setState({
                userInfo : this.props.history.location.state ,
               
        })
    }
    

    gotoForm3(e){
        const { pic , userInfo } = this.state;
       e.preventDefault()
        if(pic){
           
            let filename = pic.name
            let StorageRef = firebase.storage().ref(`images/${filename}`) ;
                StorageRef.put(pic)
                .then(res=>{
                    
                    return res.ref.getDownloadURL() ;
                })
                .then(imageURL=>{
                    alert("ok",imageURL)
                    
                  
                    this.props.history.push('/Form3',{userInfo,imageURL})
                    return console.log('image URL',imageURL)
                })
           
        }
    }

    render() {

        const { pic } = this.state ;
        console.log("pic ", pic)
       
        return (
            <div>
                <h2>FORM 2</h2>
                <form   href="javascript:void(0)" width='50%' 
                    onSubmit={(e)=> this.gotoForm3(e)}
                style={{width:'50%',margin:'auto'}}>
                          
                        
                          <div className="">
                              <label htmlFor="">Upload an image</label>
                              <br/>
                              <input type="file" name="pic" 
                              onChange={(e)=>this.setState({[e.target.name] : e.target.files[0]})}
                              />
                              <br/>
                              {/* <input type="file" name="pic" accept="image/*" />
                              <br/>
                              <input type="file" name="pic" accept="image/*" /> */}
                          </div>
                         
                      
                          
                      
                          <button  className="btn btn-primary"
                        
                          >NEXT</button>
                      </form>
            </div>
        );
    }
}

export default Form2;