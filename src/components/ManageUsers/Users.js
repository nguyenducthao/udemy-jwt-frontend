import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useState } from "react"
import './Users.scss'
import { fetchAllUser, deleteUser } from "../../services/userService"
import ReactPaginate from 'react-paginate'
import { toast } from "react-toastify"
import ModalDelete from "./ModalDelete"
import ModalUser from "./ModalUser"

const Users = () => {
    const [listUsers, setListUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurrentLimit] = useState(2)
    const [totalPages, setTotalPages] = useState(0)
    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [dataModal, setDataModal] = useState({})
    const [isShowModalUser, setIsShowModalUser] = useState(false)
    const [actionModalUser, setActionModalUser] = useState('CREATE')
    const [dataModalUser, setDataModalUser] = useState({})
    useEffect(() => {
        fetchUsers()
    }, [currentPage])
    const fetchUsers = async () => {
        let response = await fetchAllUser(currentPage, currentLimit)
        if (response && response.data && response.data.EC === 0) {
            setTotalPages(response.data.DT.totalPages)
            setListUsers(response.data.DT.users)
        }
    }
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
        await fetchUsers()
    }
    const handleDeleteUser = (user) => {
        setDataModal(user)
        setIsShowModalDelete(true)
    }
    const handleClose = () => {
        setDataModal({})
        setIsShowModalDelete(false)
    }
    const confirmDeleteUser = async () => {
        let respone = await deleteUser(dataModal)
        if (respone && respone.data.EC === 0) {
            toast.success(respone.data.EM)
            await fetchUsers()
            setIsShowModalDelete(false)
        } else {
            toast.error(respone.data.EM)
        }
    }
    const onHideModalUser = async () => {
        setIsShowModalUser(false)
        setDataModalUser({})
        // await fetchUsers()
    }
    const handleEditUser = (user) => {
        setActionModalUser('UPDATE')
        setDataModalUser(user)
        setIsShowModalUser(true)
    }
    return (
        <>
            <div className="container">
                <div className="manage-users-container">
                    <div className="user-header">
                        <div className="title">
                            <h3>Table users</h3>
                        </div>
                        <div className="action">
                            <button className="btn btn-success">Refresh</button>
                            <button className="btn btn-primary"
                                onClick={() => {
                                    setIsShowModalUser(true);
                                    setActionModalUser("CREATE")
                                }
                                }
                            >Add new user</button>
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
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    listUsers && listUsers.length > 0 ?
                                        <>
                                            {listUsers.map((item, index) => {
                                                return (
                                                    <tr key={`row-${index}`}>
                                                        <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                        <td>{item.id}</td>
                                                        <td>{item.email}</td>
                                                        <td>{item.username}</td>
                                                        <td>{item.Group ? item.Group.name : ''}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-warning mx-3"
                                                                onClick={() => handleEditUser(item)}
                                                            >Edit</button>
                                                            <button
                                                                className="btn btn-danger"
                                                                onClick={() => handleDeleteUser(item)}
                                                            >Delete</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })}

                                        </>
                                        :
                                        <><tr>
                                            <td>
                                                Not found users
                                            </td>
                                        </tr>
                                        </>
                                }

                            </tbody>
                        </table>
                    </div>
                    {
                        totalPages > 0 &&
                        < div className="user-footer">
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
            </div >
            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confirmDeleteUser={confirmDeleteUser}
                dataModal={dataModal}
            />
            <ModalUser
                show={isShowModalUser}
                onHide={onHideModalUser}
                fetchUsers={fetchUsers}
                action={actionModalUser}
                dataModalUser={dataModalUser}
            />
        </>
    )
}
export default Users