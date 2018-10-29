import React from 'react';
import firebase from '../../config/firebase'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import APPLOGO from '../../Components/AppLogo/AppLogo'


//Styles
const styles = theme => ({
    form: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '50%',
        textAlign: 'center',
    },
    imagePlaceholder: {
        margin: theme.spacing.unit * 2
    }
})

class FormTwo extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {

            imagesArr:[],
            imagesUrlArr:[],
           

        }
    }
    

    componentDidUpdate() {
        const user = firebase.auth().currentUser;
        if(user){

        
        }
        else{
            
            this.props.history.push('/',{})
        }
        // console.log('CHOOSE IMAGES FORM PROPS RECEIVES ', this.props.history.location.state)
    };

    handlePics(e){
        e.preventDefault()
        const { imagesArr} = this.state;
         if(imagesArr.length < 3){
 
             imagesArr.push(e.target.files[0]);
            this.setState({
                imagesArr : imagesArr 
            })
         }else{
            alert("Not select images more than 3 ")
         }
        //  console.log("Imageholder",imagesArr)
     }

    handleSubmit = (e) => {
        e.preventDefault();
        const { imagesArr , imagesUrlArr } = this.state;
        const { state }= this.props.history.location ;
        // console.log('images choose =========>',state)
        e.preventDefault()
         if(imagesArr.length === 3 ){
            //  console.log("--------------------", imagesArr)
        
             imagesArr.map(img=>{
 
                //   console.log("singleimg", img.name)
                 let filename = img.name
             let StorageRef = firebase.storage().ref(`images/${filename}`) ;
                 StorageRef.put(img)
                 .then(res=>{
                     
                     return res.ref.getDownloadURL() ;
                 })
                 .then(imageURL=>{
                    //  alert("ok",imageURL)
 
                      imagesUrlArr.push(imageURL)
                      
                     this.setState({
                         imagesUrlArr ,
                     })
 
                   if(imagesUrlArr.length === 3 ){
                 
                     this.props.history.push('/BeveragesAndTime',{...state,imagesUrlArr})
                   }
                   
                    //  return console.log('image URL',imagesUrlArr)
                 })
 
                 return img
                 
             })
            
            //  alert("3 hen")
            
         }
         else{
            alert("Please Select All three images")
         }
    };

    render() {
        const {
            classes
        } = this.props;

        return (
            <form className={classes.form} onSubmit={(e)=>this.handleSubmit(e)}>
                <APPLOGO/>
                <Grid container>
                    <Grid item lg={12}>
                        <input type='file' className={classes.imagePlaceholder} name='pic1' required  onChange={(e)=>this.handlePics(e)} />
                    </Grid>
                    <Grid item lg={12}>
                        <input type='file' className={classes.imagePlaceholder} name='pic1' required  onChange={(e)=>this.handlePics(e)} />
                    </Grid>
                    <Grid item lg={12}>
                        <input type='file' className={classes.imagePlaceholder} name='pic1' required  onChange={(e)=>this.handlePics(e)} />
                    </Grid>
                    <Grid item lg={12}>
                       
                        
                        <button type="submit" class="btn btn-large btn-primary">NEXT</button>
                        
                    </Grid>
                </Grid>
            </form>
        );
    };
};

export default withStyles(styles)(FormTwo);