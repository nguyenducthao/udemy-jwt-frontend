import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useState } from "react"
import './Users.scss'
import { fetchAllUser } from "../../services/userService"

const Users = () => {
    const [listUsers, setListUsers] = useState([])
    useEffect(() => {
        fetchUsers()
    }, [])
    const fetchUsers = async () => {
        let response = await fetchAllUser()
        if (response && response.data && response.data.EC === 0) {
            setListUsers(response.data.DT)
        }
    }
    return (
        <div className="container">
            <div className="manage-users-container">
                <div className="user-header">
                    <div className="title">
                        <h3>Table users</h3>
                    </div>
                    <div className="action">
                        <button className="btn btn-success">Refresh</button>
                        <button className="btn btn-primary">Add new user</button>
                    </div>
                </div>
                <div className="user-body">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Id</th>
                                <th scope="col">Email</th>
                                <th scope="col">Username</th>
                                <th scope="col">Group</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listUsers && listUsers.length > 0 ?
                                    <>
                                        {listUsers.map((item, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <th scope="row">{index + 1}</th>
                                                    <th scope="row">{item.id}</th>
                                                    <th scope="row">{item.email}</th>
                                                    <th scope="row">{item.username}</th>
                                                    <th scope="row">{item.Group ? item.Group.name : ''}</th>
                                                </tr>
                                            )
                                        })}

                                    </>
                                    :
                                    <><span>Not found users</span></>
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
export default Users