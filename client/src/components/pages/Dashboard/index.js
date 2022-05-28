import React,{useEffect,useState} from 'react';
import { useNavigate} from 'react-router-dom';

const Dashboard = () => {
    const user = localStorage.getItem('user');
    const [allUsers,setallUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        if(user == undefined)
        {
            navigate('/login');
        }
        

        fetch('http://localhost:3001/allUsers',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        })
        .then(res => res.json())
        .then(data=>{
            setallUsers(data.users);
        });

    },[])
    return (
        <div className='row'>
            <div className='col-5 mt-3 offset-1'>
                <h4>Users List</h4>
            </div>
            <div className='col-5 mt-3' style={{textAlign:"right"}}>
                <a className="btn btn-success" href="javascript:void(0)" style={{width:"100px"}}
                    onClick={()=>{
                        localStorage.clear()
                        navigate('/')
                    }}>Log out</a>
            </div>
            <div className='col-10 offset-1 mt-3'>
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            allUsers.map(item=>{
                                return (
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.mobile}</td>
                                        
                                        <td><img src={require("../../assets/Images/"+item.pic)} style={{width: "30px"}}/></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
        
    )
}

export default Dashboard;