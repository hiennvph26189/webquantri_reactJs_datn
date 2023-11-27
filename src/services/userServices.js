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
const fetchAllUser = (page, limit) => {
    return axios.get(`http://localhost:8000/api/v1/user/list?page=${page}&limit=${limit}`);
}

const deleteUser = (user) => {
    return axios.delete("http://localhost:8000/api/v1/user/delete",  {data: {id: user.id}})
}
const addUser = (userData) => {
    return axios.post("http://localhost:8000/api/v1/user/add",  {...userData})
}
const updateUser = (user) => {
    return axios.delete("http://localhost:8000/api/v1/user/edit",  {data: {id: user.id}})
}

export {registerNewUser, LoginUser, fetchAllUser, deleteUser,addUser,updateUser};