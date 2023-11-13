import axios from "axios"

const registerNewUser = (firtsname,lastname,email,password,phone,address) => {
    return   axios.post('http://localhost:8000/api/v1/register',{
        firtsname,lastname,email,password,phone,address
    })
}
const LoginUser = (ValueLogin, password) => {
    return   axios.post('http://localhost:8000/api/v1/login',{
        ValueLogin,password
    })
}
const fetchAllUser = () => {
    return axios.get('http://localhost:8000/api/v1/user/list',{
    })
}

export {registerNewUser, LoginUser, fetchAllUser};