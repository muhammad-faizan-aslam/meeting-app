import React from 'react';
import firebase from '../../config/firebase'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
            userInfo : this.props.history.location.state || '' ,
            imagesArr:[],
            imagesUrlArr:[],
            i:0
           

        }
    }
    

    componentDidUpdate() {
        console.log('form2', this.props.history.location.state)        

        // this.setState({
        //         userInfo : this.props.history.location.state || '',
               
        // })
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
             alert("bas 3 pic kar bhai")
         }
         console.log("Imageholder",imagesArr)
     }

    handleSubmit = (e) => {
        e.preventDefault();
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

        //               this.setState({
        //         userInfo : this.props.history.location.state || '',
               
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
    };

    render() {
        const {
            classes
        } = this.props;

        return (
            <form className={classes.form} onSubmit={(e)=>this.handleSubmit(e)}>
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
                        <Button type='submit'>Next</Button>
                    </Grid>
                </Grid>
            </form>
        );
    };
};

export default withStyles(styles)(FormTwo);