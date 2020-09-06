import React,{Component} from 'react';
import './App.css';
import Facebook from './components/Facebook';
import googleimg from './googl.png'
import {Route , NavLink} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';
import logo from './logo.jpg'
import axios from 'axios';

class App extends Component {

  //state which hold the data of the form.
     state ={
       FirstName : null,
       LastName : null,
       Email : null,
       Password : null,
       status : null
     }

     handelChange = this.handelChange.bind(this);
     User  = this.User.bind(this);
     
 //if there is any change in form value it will help to update the form
     handelChange(e){
       e.preventDefault();
       this.setState({
       [e.target.name] : e.target.value
        })
       }
//when submit button is click user will trigger and help to send data to reqres
      User(e){
        if(this.state.FirstName === null || this.state.LastName === null || this.state.Email === null || this.state.Password === null){
          this.setState({
            status : "Sorry due to missing field you are not able to sign up. Try again"
          })
        }else{
        const user = {
          FirstName :this.state.FirstName,
          LastName : this.state.LastName,
          email : this.state.Email,
          password : this.state.Password
        }
        const reg = {
          email : this.state.Email,
          password : this.state.Password
        }

//this well send data to the reqres i have read there documentation they dont save our data so the register will work only on there dataset.
        axios.put("https://reqres.in/api/users" , user)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
//this will help to get the data store in reqres
        axios.get("https://reqres.in/api/users?page=2")
        .then(response => {
          console.log(response);
        })
        .catch(error =>{
          console.log(error)
        })

  //this will help to get the register status
        axios.post("https://reqres.in/api/register",reg)
        .then(response => {
          console.log(response);
        })
        .catch(error =>{
          console.log(error)
        })

        this.setState({
          status : this.state.FirstName + " you are succesfully registered"
        })
      }
      }

  render(){
  return (
    <div className="App">
     <div className = "contain">
        <img className = "logo" src = {logo} alt ="logo"  width = "100%"></img>
        </div>
     

      <div className = "container">
        <h4 className = "text-center sign">Sign Up</h4>

        <h1 className = "text-center acc">Create your account</h1>
        <h3 className = "text-center lore">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
        <div className = "row">
          <div className = "col-md-6">
        <button class="button button4"> <img className= "goog" src = {googleimg}/> Sign up with Google </button>
        </div>
        <div className = "col-md-6">
      <Facebook />
      </div>
      </div>
      <div class="separator">or</div>

      <form>
      <div className = "form-group row">
        <input type="text" className="form-control"  name = "FirstName" onChange={this.handelChange} value = {this.state.FirstName} aria-describedby="emailHelp" placeholder="First Name"/>
        </div>
      <div className = "form-group row">
        <input type="text" class="form-control"name = "LastName" onChange={this.handelChange} value = {this.state.LastName}  placeholder="Last Name"/>
        </div>
        <div className = "form-group row">
        <input type="email" class="form-control" name = "Email" onChange={this.handelChange} value = {this.state.Email} placeholder="Enter email"/>
        </div>
        <div className = "form-group row">
        <input type="password" class="form-control"name = "Password" onChange={this.handelChange} value = {this.state.Password}   placeholder="Password"/>
        </div>
      </form>

      <p>By clicking Sign Up, you agree to our <a href = "ad">Terms of Use</a> and our <a href ="ad">Privacy Policy</a></p>


      <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Register Status</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        {this.state.status}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
      <button type="button" class="btn btn-primary btn-lg btn-block" onClick = {this.User} data-toggle="modal" data-target="#exampleModalCenter">
 Sign Up
</button>
      </div>
       
    </div>
  );
  }
}

export default App;
