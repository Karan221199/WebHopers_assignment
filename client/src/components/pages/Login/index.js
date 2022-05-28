import './login.css';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const Login = () => {
    const[email,setEmail] = useState('');
    const[password, setPassword] = useState('');
    const navigate = useNavigate();
    const loginHandler = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            alert('Invalid email');
            return 
        }

        fetch('http://localhost:3001/login',{
            method:"post",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,
                password
            })
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error)
            {
                alert(data.error)
            }
            else{
                localStorage.setItem('jwt',data.token);
                localStorage.setItem('user',JSON.stringify(data.user));
                navigate('/dashboard');
            }
        })
    }
    return (
        <section>
            <div className="container-fluid loginBg">
                <div className='row'>
                   <div className='col-12 col-md-6 offset-md-3'>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Log in</h5>
                                <div className='row'>
                                    <div className='col-12'>
                                        <label htmlFor='email'>Email address</label>
                                        <input type="email" value={email} className='form-control' id='email' onChange={(e)=>setEmail(e.target.value)}/>
                                    </div>
                                    <div className='col-12'>
                                        <label htmlFor='password'>Password</label>
                                        <input type="password" value={password} className='form-control' id='password' onChange={(e)=>setPassword(e.target.value)}/>
                                    </div>

                                    <div className='col-12 mt-3' style={{textAlign:"center"}}>
                                        <button type='button' className='btn' onClick={loginHandler}>Log in</button>
                                    </div>
                                    <div className='col-12 mt-3' style={{textAlign:"center"}}>
                                        <a className={"nav-link Text"} href="/signup" style={{fontSize: "1.64rem",lineHeight: "110%",color: "black"}}>Don't Have An Account?</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </section>
    )
}

export default Login;
