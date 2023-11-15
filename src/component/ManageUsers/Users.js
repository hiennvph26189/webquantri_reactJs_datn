import { useEffect, useState } from "react";
import { fetchAllUser } from "../../services/userServices";
import ReactPaginate from 'react-paginate';
const Users = (props) => {
    const [listUser, setListUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        fetchUsers();
    }, [currentPage])

    const fetchUsers = async () => {
        let respone = await fetchAllUser(currentPage, currentLimit);
        console.log(respone.data)
        if (respone && respone.data && respone.data.EC === '0') {
            setTotalPages(respone.data.DT.totalPages);
            setListUsers(respone.data.DT.users);
        }
    }
    const handlePageClick = async(event) => {
        setCurrentPage(+event.selected +1 )
        // await fetchUsers(+event.selected +1 );
    };

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
                                                <td>
                                                    <button className="btn btn-warning">Edit</button>
                                                    <button className="btn btn-danger">Delete</button>
                                                </td>
                                            </tr>
                                        )

                                    })}
                                </>
                                :
                                <><tr><td>Nots found user</td></tr></>
                            }
                        </tbody>
                    </table>

                </div>
                {totalPages > 0 &&
                <div className="user-footer">
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={totalPages}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>
                }
            </div>
        </div>
    )
}
export default Users;