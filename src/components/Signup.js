import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
    const navigate = useNavigate();
    const HandleSubmit=async(e)=>{
        e.preventDefault();
        const {name,email,password}=credentials;
        const response = await fetch("http://localhost:5000/api/auth.js/createuser",{
            method:"POST",
            headers:new Headers({
                "Content-type": "application/json"
            }),
            body:JSON.stringify({name,email,password})
        });
        const json = await response.json();
        if(json.success){
            //save the authtoken and redirect
            localStorage.setItem('token',json.authToken);
            props.showAlert("Account Created Successfully","success")
            navigate('/')
        }
        else{
            props.showAlert("Invalid credentials","danger");
        }
        console.log(json);
    }
    
    const onChange = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

  return (
    <div className='container'>
      <h2 className='my-3'>Create an account to use iNotebook</h2>
      <form onSubmit={HandleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" onChange={onChange} name="name" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email"  onChange={onChange}name="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" onChange={onChange} name="password" minLength={5} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword" minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  )
}

export default Signup
