import './signup.css';
import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [mobile,setMobile] = useState('');
    const [password,setPassword] = useState('');
    const [image,setImage]=useState("");
    const navigate = useNavigate();
    // const submitHandler = () => {

    //     if(name == "" || email == "" || mobile=="" || password == "" )
    //     {
    //         alert("Please fill all the fields");
    //         return ;
    //     }
    //     if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
    //         alert('Invalid email');
    //         return ;
    //     }
    //     if (!/^[5-9][0-9]{9}$/.test(mobile)) {
    //         alert("Your mobile number is Invalid");
    //         return;
    //     }


    //     fetch('http://localhost:3001/signup',{
    //         method:"post",
    //         headers:{
    //             "Content-Type":"application/json"
    //         },
    //         body:JSON.stringify({
    //             name,
    //             email,
    //             password,
    //             mobile
    //         })
    //     }).then(res => res.json())
    //     .then(data => {
    //         if(data.error)
    //         {
    //             alert(data.error);
    //         }
    //         else{
    //             alert("Signed up successfully");
    //             navigate('/login');
    //         }
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // }

    const submitHandler = (e) => {
        e.preventDefault();
        if(name == "" || email == "" || mobile=="" || password == "" || image=="")
        {
            alert("Please fill all the fields");
            return ;
        }
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            alert('Invalid email');
            return ;
        }
        if (!/^[5-9][0-9]{9}$/.test(mobile)) {
            alert("Your mobile number is Invalid");
            return;
        }
        const formData = new FormData();
        formData.append('pic', image);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('password', password);
        axios.post("http://localhost:3001/signup",formData)
        .then(data => {
            if(data.error)
            {
                alert(data.error);
            }
            else{
                alert("Signed up successfully");
                navigate('/login');
            }
        }).catch(err => {
            if(err.response.data.error)
            {
                alert(err.response.data.error);
            }
            console.log(err);
        })
        
    }

    return (
        <section>
            <div className="container-fluid signupBg">
                <div className='row'>
                   <div className='col-12 col-md-6 offset-md-3'>
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={submitHandler} encType="multipart/form-data">
                                <h5 className="card-title">INTRODUCE YOURSELF</h5>
                                <div className='row'>
                                    <div className='col-12'>
                                        <label htmlFor='name'>Name</label>
                                        <input type="text" className='form-control' id='name' value={name} onChange={(e)=>setName(e.target.value)}/>
                                    </div>
                                    <div className='col-12 mt-2'>
                                        <label htmlFor='email'>Email address</label>
                                        <input type="email" className='form-control' id='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                    </div>
                                    <div className='col-12 mt-2'>
                                        <label htmlFor='mobile'>Mobile</label>
                                        <input type="tel" className='form-control' id='mobile' value={mobile} onChange={(e)=>setMobile(e.target.value)}/>
                                    </div>
                                    <div className='col-12 mt-2'>
                                        <label htmlFor='password'>Password</label>
                                        <input type="password" className='form-control' id='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                                    </div>
                                    
                                    <div className='col-12 mt-2'>
                                        <label htmlFor='profilePic'>Upload Profile Pic</label>
                                        <input type="file" id='profilePic' className='form-control' onChange={(e)=>setImage(e.target.files[0])}/>
                                    </div>

                                    <div className='col-12 mt-3' style={{textAlign:"center"}}>
                                        <button type='submit' className='btn'>Sign up!</button>
                                    </div>
                                    <div className='col-12 mt-3' style={{textAlign:"center"}}>
                                        <a className={"nav-link Text"} href="/" style={{fontSize: "1.64rem",lineHeight: "110%",color: "black"}}>Already Have An Account?</a>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </section>
    );
}
export default Signup;
