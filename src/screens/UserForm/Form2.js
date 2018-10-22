import React, { Component } from 'react';
import firebase from '../../config/firebase'

class Form2 extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            userInfo : {} ,
            imagesArr:[],
            imagesUrlArr:[],
            i:0
           

        }
    }
    
    componentDidMount() {

        console.log('form2', this.props.history.location.state)        

        this.setState({
                userInfo : this.props.history.location.state ,
               
        })
    }
    
    gotoForm3(e){
        const { imagesArr, userInfo , imagesUrlArr } = this.state;
      
       e.preventDefault()
        if(imagesArr.length === 3 ){
            console.log("--------------------", imagesArr)
       
            imagesArr.map(img=>{

                 console.log("singleimg", img.name)
                let filename = img.name
            let StorageRef = firebase.storage().ref(`images/${filename}`) ;
                StorageRef.put(img)
                .then(res=>{
                    
                    return res.ref.getDownloadURL() ;
                })
                .then(imageURL=>{
                    alert("ok",imageURL)

                     imagesUrlArr.push(imageURL)
                     
                    this.setState({
                        imagesUrlArr ,
                        // [userInfo.imgURL] : imagesUrlArr
                    })

                    // this.props.history.push('/Form3',{userInfo,imagesUrlArr})
                  if(imagesUrlArr.length === 3 ){
                
                    // userInfo.push(imagesUrlArr)
                    // this.setState({
                    //     [userInfo.img] : imagesUrlArr
                    // })
                    this.props.history.push('/Form3',{userInfo,imagesUrlArr})
                  }
                  
                    return console.log('image URL',imagesUrlArr)
                })

                return img
                
            })
           
            alert("3 hen")
           
        }
        else{
            alert("3 nahi hen")
        }
    }
   

    handlePics(e){
       const { imagesArr} = this.state;
        if(imagesArr.length < 3){

            imagesArr.push(e.target.files[0]);
           this.setState({
               imagesArr : imagesArr 
           })
        }else{
            alert("bas 3 pic kar bhai")
        }
        console.log("Imageholder",imagesArr)
    }

    render() {
       
        return (
            <div>
                <h2>FORM 2</h2>
                <form    width='50%' 
                    onSubmit={(e)=> this.gotoForm3(e)}
                style={{width:'50%',margin:'auto'}}>
                          
                        
                          <div className="">
                              <label htmlFor="">Upload an image</label>
                              <br/>
                              <input type="file" name="pic1"
                              onChange={(e)=>this.handlePics(e)}
                              />
                               <input type="file" name="pic1"
                              onChange={(e)=>this.handlePics(e)}
                              />
                               <br/>
                               <input type="file" name="pic1"
                              onChange={(e)=>this.handlePics(e)}
                              />
                               <br/>
                            
                          </div>
                         
                      
                          
                      
                          <button  className="btn btn-primary"
                        
                          >NEXT</button>
                      </form>
            </div>
        );
    }
}

export default Form2;