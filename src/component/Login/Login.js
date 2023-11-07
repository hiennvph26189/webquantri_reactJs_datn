import { useEffect, useState } from 'react';
import './Login.scss';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import { LoginUser } from '../../services/userServices';
const Login = (props) => {
    let history = useHistory();

    const [ValueLogin, setValueLogin] = useState("");
    const [password, setpassword] = useState("");

    const defaultObjvalueInput = {
        isvalidValueLogin: true,
        isvalidVluePassword: true,

    }
    const [objValueInput, setObjvalueInput] = useState(defaultObjvalueInput)


    const handleCreateNewAccount = () => {
        history.push('/register');
    }
    const handleLogin = async() => {
        setObjvalueInput(defaultObjvalueInput);

        if(!ValueLogin){
            setObjvalueInput({...defaultObjvalueInput, isvalidValueLogin: false});
            toast.error("Please enter your email or phone number")
            return;
        }
        if(!password){
            setObjvalueInput({...defaultObjvalueInput, isvalidVluePassword: false});
            toast.error("Please enter your password")
            return;
        }
    let respone =  await LoginUser(ValueLogin,password);
    if(respone && respone.data && +respone.data.EC === 0){
        // success
        let data = {
            isAuthenticated: true,
            token: 'fake token'
        }
        sessionStorage.setItem("account", JSON.stringify(data));
        history.push('/users')
        window.location.reload();
    }
    if(respone && respone.data && +respone.data.EC !== 0){
        // error
        toast.error(respone.data.EM)
    }
      
    }
    const handlePressEnter = (event) => {
     if(event.charCode == 13 && event.code == "Enter"){
        handleLogin();
     }
    }

    useEffect(() => {
        let session = sessionStorage.getItem("account");
        if (session) {
            history.push("/")
            window.location.reload();
        }
    },[])
    return (
        <div className="login-container">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block ">
                        <div className='brand'>
                            Thế Nguyện
                        </div>
                        <div className='detail'>
                            Người Đẹp Trai Nhất Thế Giới Chỉ Có Một Trên Đời Thôi Nhé Anh Em Ơi.............
                        </div>
                    </div>
                    
                        <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
                        <div className='brand d-sm-none'>
                            Thế Nguyện
                        </div>
                            <input type='text'
                             className= {objValueInput.isvalidValueLogin ? 'form-control' : 'is-invalid form-control'}
                             placeholder='Email address or phone number' 
                            value={ValueLogin}
                            onChange={(event) => {setValueLogin(event.target.value)}}
                            />
                            <input type='password' 
                            className={objValueInput.isvalidVluePassword ? 'form-control' : 'is-invalid form-control'} 
                            placeholder='Password' 
                            value={password}
                            onChange={(event) => {setpassword(event.target.value)}}
                            onKeyPress ={(event)=> handlePressEnter(event)}
                            />
                            <button className='btn btn-primary' onClick={() => handleLogin()}>Login</button>
                            <span className='text-center'>
                                <a className='forgot-password' href='#'>
                                    Fogot your password ?
                                </a>
                            </span>
                            <hr />
                            <div className='text-center'>
                                <button className='btn btn-success' onClick={() => handleCreateNewAccount()}>
                                     Create new account
                                    </button>
                            </div>

                        
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;