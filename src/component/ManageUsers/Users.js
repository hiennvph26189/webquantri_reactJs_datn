import { useEffect, useState } from "react";
import { fetchAllUser } from "../../services/userServices";
const Users = (props) => {
    const [listUser, setListUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = async () => {
        let respone = await fetchAllUser();
        console.log(respone.data)
        if (respone && respone.data && respone.data.EC === '0') {
            setListUsers(respone.data.DT);

            console.log(respone.data.DT)
        }
    }

    return (
        <div className="container">
            <div className="manage-users-container">
                <div className="users-header">
                    <div className="title">
                        <h3>Table Users</h3>
                    </div>
                    <div className="actions">
                        <button className="btn btn-success">Refesh</button>
                        <button className="btn btn-primary">Add New User</button>
                    </div>

                </div>
                <div className="user-body">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">AddRess</th>
                                <th scope="col">Sex</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUser && listUser.length > 0 ?
                                <>
                                    {listUser.map((item, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                <td>{index + 1}</td>
                                                <td>{item.firstName}</td>
                                                <td>{item.lastName}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td>{item.address}</td>
                                                <td>{item.roleID}</td>
                                            </tr>
                                        )

                                    })}
                                </>
                                :
                                <><span>Nots found user</span></>
                            }
                        </tbody>
                    </table>

                </div>
                <div className="user-footer">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                            <li class="page-item"><a class="page-link" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                            <li class="page-item"><a class="page-link" href="#">Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}
export default Users;