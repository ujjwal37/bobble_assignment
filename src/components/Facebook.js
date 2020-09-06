import React, {Component} from 'react';
import FacebookLogin from 'react-facebook-login';
import './FacebookLogin.css';
import fb from './facebook.png'
import Modal from 'react-modal'

export default class Facebook extends Component {
//auth will tell if user log in or not name and picture will hold the data of name and picture form fb
    state = {
        auth: false,
        name: '',
        picture: '',
        stat : true
    };

    //it will gather all the required data from the facebook
    responseFacebook = response => {
        console.log(response);
        if(response.status !== 'unknown')
        this.setState({
            auth: true,
            name: response.name,
            picture: response.picture.data.url
        });
        
    }

    //when close button of modal is pressed it will help to disable auth status , name and picture so that fb button will be visible if we dont do that button will dissappear after pressing button
    statechange = () =>{
        this.setState({
            stat : false,
            auth:false,
            name : '',
            picture: ' '
        })
    }

    //just check part button is working or not
    componentClicked = () => {
        console.log('Facebook btn clicked');
    }

    render(){
        let facebookData;


        //if the state is auth then return button else return the modal
        this.state.auth ?
        facebookData = (
            <div className  = "mod">
                <Modal isOpen={this.state.stat}
                style = {
                    {
                        overlay : {
                            width : '70%',
                            height : '70%',
                            margin : '10%'
                        },
                        content :{
                            margin : '8%',
                            marginleft : '20%'
                        }
                        
                    }
                }>
                <div style={{
                    width: '100%',
                    margin: '10px',
                    background: '#f4f4f4',
                    padding: '20px',
                    color: 'black'
                }}>
                    <img className = "dp" src={this.state.picture} alt={this.state.name} />
                    <h4 className = "text-center">Welcome {this.state.name}, you are successfully Registered!</h4>
                </div>
                <button className = "btn btn-primary" onClick = {this.statechange}>Close</button>
                </Modal>
                </div>
            ) : 
            //it contains appid which i created on sdk
            facebookData = (<FacebookLogin
                appId="602842563743685"
                autoLoad={true}
                fields="name,picture"
                textButton = "Sign up with Facebook"   
                cssClass="btnFacebook"
                icon={<img className = "fb" src = {fb} />}
                onClick={this.componentClicked}
                callback={this.responseFacebook} />);

        return (
            <>
                {facebookData}
            </>
        );
    }
}