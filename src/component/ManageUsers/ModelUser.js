import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { addUser } from '../../services/userServices';
import _ from 'lodash';
const ModelUser = (props) => {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setemail] = useState("");
    const [phoneNumber, setphoneNumber] = useState("");
    const [address, setaddress] = useState("");
    const [password, setpassword] = useState("");

    const defaultuserData = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        password: ''
    }
    const validInputsDefault = {
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        address: true,
        password: true
    }
    const [userData, setUserData] = useState(defaultuserData);
    const [validInputs, setValidInputs] = useState(validInputsDefault);
    const handleOnchangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    }
    const CheckvalidInputUser = () => {
        setValidInputs(validInputsDefault);

        let arr = ['email', 'phoneNumber', 'address', 'password'];
        let check = true;
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValidInputs(_validInputs);

                toast.error(`Khong de trong ${arr[i]}`);
                check = false;
                break;
            }
        }
        return check;
    }
    const handleConfirmUser = async () => {
        let check = CheckvalidInputUser();
        if (check == true) {
            let res = await addUser({...userData});
            if (res.data && res.data.EC === 0) {
                props.onHide();
                setUserData(defaultuserData);
            } else {
                toast.error(`Err create user`);
            }
        }
    }

    return (
        <>
            <Modal size="lg" show={props.show} className='model-user' onHide={props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{props.title}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>First Name  :</label>
                            <input className='form-control '
                                type='text' value={userData.firstName}
                                onChange={(event) => handleOnchangeInput(event.target.value, "firstName")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Last Name :</label>
                            <input className='form-control ' type='text' value={userData.lastName}
                                onChange={(event) => handleOnchangeInput(event.target.value, "lastName")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label> Email (<span className='red'>*</span>) :</label>
                            <input className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
                                type='email' value={userData.email}
                                onChange={(event) => handleOnchangeInput(event.target.value, "email")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>phoneNumber Number (<span className='red'>*</span>) :</label>
                            <input className={validInputs.phoneNumber ? 'form-control' : 'form-control is-invalid'}
                                type='number' value={userData.phoneNumber}
                                onChange={(event) => handleOnchangeInput(event.target.value, "phoneNumber")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>AddRess (<span className='red'>*</span>) :</label>
                            <input className={validInputs.address ? 'form-control' : 'form-control is-invalid'}
                                type='text' value={userData.address}
                                onChange={(event) => handleOnchangeInput(event.target.value, "address")}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Password (<span className='red'>*</span>) :</label>
                            <input className={validInputs.password ? 'form-control' : 'form-control is-invalid'}
                                type='password' value={userData.password}
                                onChange={(event) => handleOnchangeInput(event.target.value, "password")}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                    <Button variant="primary" onClick={() => handleConfirmUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default ModelUser;