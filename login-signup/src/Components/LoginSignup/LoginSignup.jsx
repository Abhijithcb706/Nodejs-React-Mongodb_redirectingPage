import React, { useEffect, useState } from 'react'
import './LoginSignup.css'
import axios from 'axios';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import Home from '../dashboard/Home';

import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const navigate = useNavigate();
  const homePage = () => {
    navigate('/home');
  }
    const [action,setAction] = useState("Sign Up");
    

    
    let errorsObj = { email:'', password:'' };
    const [errors,setErrors] = useState(errorsObj)

    const [formData, setFormData] = useState({
      name:'',
        email: '',
        password : ''
      });
      

    useEffect(()=>{
        console.log("Form data changed");
        },[formData])
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });
        };



    function onSignup(e){
        e.preventDefault();
        if(action==="Login"){
            axios.post('http://localhost:5000/login', formData)
    .then(response => {
      alert("Login Successful")
      homePage()
      console.log(response.data);
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
        }
        else{
            axios.post('http://localhost:5000/signup', formData)
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.error('There was an error!', error);
            }); 
        }
        let error = false;
        const errorObj = {...errorsObj};
        if(formData.email === ''){
            errorObj.email ='Email is required';
            error = true;
        }
        if(formData.password === ''){
            errorObj.password = 'Password is required'
            error = true;
        }
        setErrors(errorObj);
        if(!error){
            console.log('Form submit');
        }
    }

  return (
    <div className='container'>
        <div className="header">
            <div className="text">
                {action}
            </div>
            <div className="underline">

            </div>
        </div>
        <form onSubmit={onSignup}>
        <div className="inputs">
            {action==="Login"?<div></div>:<div className="input">
                <img src={user_icon} alt="" />
                <input type="text" placeholder='Name' name="name"
                value={formData.name}
                onChange={handleChange}/>
            </div>}
            

            <div className="input">
                <img src={email_icon} alt="" />
                <input type="email" name='email' placeholder='Email Id' value={formData.email}
                onChange={handleChange}/>
            </div>
            {errors.email && <div className='m-auto'>{errors.email}</div>}

            <div className="input">
                <img src={password_icon} alt="" />
                <input type="password" name='password' placeholder='Password' value={formData.password}
                onChange={handleChange}/>
            </div>
            {errors.password && <div className='m-auto'>{errors.password}</div>}

        </div>
        {action==="Sign Up"?<div></div>:<div className="forgot-password">Forgot Password? <span>Click here!</span></div>}
        <div className="submit-container">
            <div  onClick={()=>{setTimeout(() => {setAction("Sign Up")}, 400)}}><button type={action === "Sign Up"?'submit':'button'} className={action==="Login"?"submit gray":"submit"}>Sign Up</button></div>
              <div   onClick={()=>{setTimeout(() => {setAction("Login")}, 400)}}><button type={action === "Login"?'submit':'button'} className={action==="Sign Up"?"submit gray":"submit"}>Login</button></div>
        </div>




        </form>
    </div>
  )
}

export default LoginSignup