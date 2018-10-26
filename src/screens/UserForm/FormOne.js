import React from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

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
    constructor() {
        super();

        this.state = {
            displayName:'' ,
            nickname :'' ,
            phoneno : '',
            userId :'' ,
            email :'',
        };
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { displayName , nickname ,phoneno , userId , email} = this.state

        
        

        this.props.history.push('/Form2',{ displayName , nickname , phoneno , userId , email })
    };
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
        const {
            nickname,
            phoneno
        } = this.state;

        const {
            classes
        } = this.props;

        return (
            <ValidatorForm
                className={classes.form}
                ref="form"
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}
            >
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
        )
    }
}

export default withStyles(styles)(FormOne);