import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { useState, useEffect } from 'react'
import { fetchGroup, createNewUser, updateCurrentUser } from '../../services/userService'
import { toast } from 'react-toastify'
import _ from 'lodash'

const ModalUser = (props) => {
    const [userGroups, setUserGroups] = useState([])
    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        groupId: ''
    }
    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        groupId: true
    }
    const [userData, setUserData] = useState(defaultUserData)
    const [validInputs, setValidInputs] = useState(validInputsDefault)
    const { action, dataModalUser } = props
    useEffect(() => {
        getGroups()
    }, [])
    useEffect(() => {
        if (action === 'UPDATE') {
            setUserData({ ...dataModalUser, groupId: dataModalUser.Group ? dataModalUser.Group.id : '' })
        }
    }, [dataModalUser])
    useEffect(() => {
        if (action === 'CREATE') {
            if (userGroups && userGroups.length > 0) {
                setUserData({ ...userData, groupId: userGroups[0].id })
            }
        }
    }, [action])
    const getGroups = async () => {
        let response = await fetchGroup()
        if (response && response.EC === 0) {
            setUserGroups(response.DT)
            if (response.DT && response.DT.length > 0) {
                let groups = response.DT
                setUserData({ ...userData, groupId: groups[0].id, sex: 'Male' })
            }
        } else {
            toast.error(response.EM)
        }
    }
    const handleOnChangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData)
        _userData[name] = value
        setUserData(_userData)
    }
    const checkValidateInputs = () => {
        if (action === 'UPDATE') {
            return true
        }
        setValidInputs(validInputsDefault)
        let arr = ['email', 'phone', 'password', 'groupId']
        let check = true
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault)
                _validInputs[arr[i]] = false
                setValidInputs(_validInputs)
                toast.error(`Empty input ${arr[i]}`)
                check = false
                break
            }
        }
        return check
    }
    const handleConfirmUser = async () => {
        let check = checkValidateInputs()
        if (check) {
            let response = action === 'CREATE' ?
                await createNewUser(userData)
                : await updateCurrentUser(userData)
            if (response && response.EC === 0) {
                toast.success(response.EM)
                props.onHide()
                setUserData({ ...defaultUserData, groupId: userGroups[0].id })
                props.fetchUsers()
            } else {
                toast.error(response.EM)
                let _validInputs = _.cloneDeep(validInputsDefault)
                _validInputs[response.DT] = false
                setValidInputs(_validInputs)
            }
        }
    }
    const handleCloseModalUser = () => {
        props.onHide()
        setUserData(defaultUserData)
        setValidInputs(validInputsDefault)
    }
    return (
        <>
            <Modal size="lg" show={props.show} onHide={() => handleCloseModalUser()} className='modal-user'>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{action === 'CREATE' ? 'Create new user' : 'Edit a user'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email address (<span className='red'>*</span>):</label>
                            <input
                                disabled={action === 'CREATE' ? false : true}
                                className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
                                type='email'
                                value={userData.email}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'email')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Phone number (<span className='red'>*</span>):</label>
                            <input
                                disabled={action === 'CREATE' ? false : true}
                                className={validInputs.phone ? 'form-control' : 'form-control is-invalid'}
                                type='text'
                                value={userData.phone}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'phone')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Username:</label>
                            <input
                                className='form-control'
                                type='text'
                                value={userData.username}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'username')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            {action === 'CREATE' &&
                                <>
                                    <label>Password (<span className='red'>*</span>):</label>
                                    <input
                                        className={validInputs.password ? 'form-control' : 'form-control is-invalid'}
                                        type='password'
                                        value={userData.password}
                                        onChange={(event) => handleOnChangeInput(event.target.value, 'password')}
                                    />
                                </>
                            }
                        </div>
                        <div className='col-12 col-sm-12 form-group'>
                            <label>Address:</label>
                            <input
                                className='form-control'
                                type='text'
                                value={userData.address}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'address')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Gender:</label>
                            <select
                                className='form-select'
                                onChange={(event) => handleOnChangeInput(event.target.value, 'sex')}
                                value={userData.sex}
                            >
                                <option defaultValue={'Male'}>Male</option>
                                <option value='Female'>Female</option>
                                <option value='Other'>Other</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Group (<span className='red'>*</span>): </label>
                            <select
                                className={validInputs.groupId ? 'form-select' : 'form-select is-invalid'}
                                // className='form-select'
                                onChange={(event) => handleOnChangeInput(event.target.value, 'groupId')}
                                value={userData.groupId}
                            >
                                {userGroups && userGroups.length > 0 &&
                                    userGroups.map((item, index) => {
                                        return (
                                            <option key={item.id} value={item.id}>{item.description}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModalUser()}>Close</Button>
                    <Button variant="primary" onClick={() => handleConfirmUser()}>
                        {action === 'CREATE' ? 'Save' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalUser