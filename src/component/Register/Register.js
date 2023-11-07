import { useEffect, useState } from 'react';
import './Register.scss';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { registerNewUser } from '../../services/userServices';

const Register = (props) => {
    const [firtsname, setfirtsname] = useState('');
    const [lastname, setlastname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [address, setaddress] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const defaultValidInput = {
        isValidFirstname: true,
        isValidLastname: true,
        isValidEmail: true,
        isValidPhone: true,
        isValidAddress: true,
        isValidPassword: true,
        isValidConfirmPassword: true,
    }
    const [ObjcheckValid, setObjcheckValid] = useState(defaultValidInput);
    
    let history = useHistory();
    const handleLogin = () => {
        history.push('/login');
    }
    const handleRegister = async() => {
        let check  = isValidInput();
        if(check == true){
        let response = await registerNewUser(firtsname,lastname,email,password,phone,address);
          let serverData = response.data;
          if(+serverData.EC==0){
            toast.success(serverData.EM);
            history.push('/login');
          }else{
            toast.error(serverData.EM)
          }
        }
        
    }
    useEffect(() => {
        // axios.get('http://localhost:8000/api/v1/test-api').then(data => {
        //     console.log("data>>>>>>>>..",data)
           

    }, []);
    const isValidInput = () => {
        setObjcheckValid(defaultValidInput)
        if (!firtsname) {
            toast.error("First Name cannot be blank !");
            setObjcheckValid({...defaultValidInput, isValidFirstname: false});
            return false;
        }
        if (!lastname) {
            toast.error("Last Name cannot be blank !");
            setObjcheckValid({...defaultValidInput, isValidLastname: false});
            return false;
        }
        if (!email) {
            toast.error("Email cannot be blank !");
            setObjcheckValid({...defaultValidInput, isValidEmail: false});
            return false;
        }
        let regx = /\S+@\S+\.\S+/;
        if(!regx.test(email)){
            toast.error("Email enter valid addresss !");
            setObjcheckValid({...defaultValidInput, isValidEmail: false});
            return false;
        }
        if (!phone) {
            toast.error("PhoneNumber cannot be blank !");
            setObjcheckValid({...defaultValidInput, isValidPhone: false});
            return false;
        }
        if (!address) {
            toast.error("Address cannot be blank !");
            setObjcheckValid({...defaultValidInput, isValidAddress: false});
            return false;
        }
        if (!password) {
            toast.error("Password cannot be blank !");
            setObjcheckValid({...defaultValidInput, isValidPassword: false});
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Your Password is not same !");
            setObjcheckValid({...defaultValidInput, isValidConfirmPassword: false});
            return false;
        }
        
        return true;
    }
    return (
        <div className="login-container">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block ">
                        <div className='brand'>
                            Đăng Ký
                        </div>
                        <div className='detail'>
                            Đăng Ký để trở thành những đàn em của Thế Nguyện cùng nhau kề vai sát cánh trong tương lai ........
                        </div>
                    </div>

                    <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
                        <div className='brand d-sm-none'>
                            Thế Nguyện
                        </div>
                        <div className='form-group'>
                            <label>First Name :</label>
                            <input className={ObjcheckValid.isValidFirstname ? 'form-control' : 'form-control is-invalid' } type='text'  placeholder='First Name'
                                value={firtsname} onChange={(event) => setfirtsname(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Last Name :</label>
                            <input type='text' className={ObjcheckValid.isValidLastname ? 'form-control' : 'form-control is-invalid' } placeholder='Last Name'
                                value={lastname} onChange={(event) => setlastname(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label> Email :</label>
                            <input type='email' className={ObjcheckValid.isValidEmail ? 'form-control' : 'form-control is-invalid' } placeholder='Email address'
                                value={email} onChange={(event) => setemail(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label> PhoneNumber :</label>
                            <input type='number' className={ObjcheckValid.isValidPhone ? 'form-control' : 'form-control is-invalid' } placeholder='PhoneNumber'
                                value={phone} onChange={(event) => setphone(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label> Address :</label>
                            <input type='text' className={ObjcheckValid.isValidAddress ? 'form-control' : 'form-control is-invalid' } placeholder='Address'
                                value={address} onChange={(event) => setaddress(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label> Password :</label>
                            <input type='password' className={ObjcheckValid.isValidPassword ? 'form-control' : 'form-control is-invalid' } placeholder='Password'
                                value={password} onChange={(event) => setpassword(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label> RePassword :</label>
                            <input type='password' className={ObjcheckValid.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid' } placeholder='RePassWord'
                                value={confirmPassword} onChange={(event) => setconfirmPassword(event.target.value)}
                            />
                        </div>

                        <button className='btn btn-primary' onClick={() => handleRegister()}>Register</button>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success' onClick={() => handleLogin()}>
                                Already've an account? Login
                            </button>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;