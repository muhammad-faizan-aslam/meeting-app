import React from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import firebase from '../../config/firebase'
import APPLOGO from '../../Components/AppLogo/AppLogo'

// JSS
const styles = theme => ({
    textField: {
        width: '100%',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    form: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '40%'
    },
    button: {
        color: 'white',
        marginTop: 10,
        float: 'right'
    }
});

class FormOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    };

    componentDidMount(){
        const user = firebase.auth().currentUser;
        if(user){

        
        }
        else{
            
            this.props.history.push('/',{})
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {

        e.preventDefault();
        const { state }= this.props.history.location ;
        const { nickname ,phoneno } = this.state ;

        // console.log('nickname =========>',state)
        // console.log("nickname form",this.props.history.location.state)

        this.props.history.push('/Images',{ ...state , nickname , phoneno  })
        

       
    };
    

    render() {
        const {
            nickname,
            phoneno
        } = this.state;

        const {
            classes
        } = this.props;

        return (
            <div>
                            
            
            <ValidatorForm
                className={classes.form}
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
                    <APPLOGO/>
                <TextValidator
                    label="Nick Name"
                    name="nickname"
                    className={classes.textField}
                    onChange={this.handleChange}
                    value={nickname}
                    validators={['matchRegexp:[a-z,A-Z]{1}', 'required']}
                    errorMessages={['Type Mismatch']}
                    margin='normal'
                />
                <TextValidator
                    label="Phone No."
                    name="phoneno"
                    className={classes.textField}
                    onChange={this.handleChange}
                    value={phoneno}
                    validators={['matchRegexp:[0]{1}[3]{1}[0-9]{2}[-]{1}[0-9]{7}', 'required']}
                    errorMessages={['Type Mismatch']}
                    margin='normal'
                />
                <Button
                    type='submit'
                    variant="contained"
                    className={classes.button}
                    color="primary"
                >
                    Next
                </Button>
            </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(FormOne);