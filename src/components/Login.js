import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const [credentials,setCredentials] = useState({email:"",password:""});
    const navigate = useNavigate();
    const HandleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth.js/login",{
            method:"POST",
            headers:new Headers({
                "Content-type": "application/json"
            }),
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json = await response.json();
        if(json.success){
            //save the authToken and redirect
            localStorage.setItem('token',json.authToken);
            props.showAlert("Loged in successfully","success");
            navigate('/');
        }
        else{
           props.showAlert("Invalid credentials","danger")
        }
        console.log(json);
    }
    
    const onChange = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <div>
            <h2 className='my-3'>Login to continue with iNotebook</h2>
            <form  onSubmit={HandleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} id="password" onChange={onChange} name="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login
