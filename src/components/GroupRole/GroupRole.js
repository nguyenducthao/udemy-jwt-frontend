import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { fetchGroup } from '../../services/userService'
import { fetchAllRole, fetchRoleByGroup, assignRolesToGroup } from '../../services/roleService'
import './GroupRole.scss'
import _ from 'lodash'

const GroupRole = () => {
    const [userGroups, setUserGroups] = useState([])
    const [selectGroup, setSelectGroup] = useState('')
    const [listRoles, setListRoles] = useState([])
    const [assignRolesByGroup, setAssignRolesByGroup] = useState([])

    useEffect(() => {
        getGroups()
        getAllRoles()
    }, [])
    const getGroups = async () => {
        let response = await fetchGroup()
        if (response && response.EC === 0) {
            setUserGroups(response.DT)
        } else {
            toast.error(response.EM)
        }
    }
    const getAllRoles = async () => {
        let data = await fetchAllRole()
        if (data && +data.EC === 0) {
            setListRoles(data.DT)
        }
    }
    const handleOnChangeGroup = async (value) => {
        setSelectGroup(value)
        if (value) {
            let data = await fetchRoleByGroup(value)
            if (data && +data.EC === 0) {
                let result = buildDataRolesByGoup(data.DT.Roles, listRoles)
                setAssignRolesByGroup(result)
            }
        }
    }
    const buildDataRolesByGoup = (groupRoles, allRoles) => {
        let result = []
        if (allRoles && allRoles.length > 0) {
            allRoles.map(role => {
                let object = {}
                object.url = role.url
                object.id = role.id
                object.description = role.description
                object.isAssign = false
                if (groupRoles && groupRoles.length > 0) {
                    object.isAssign = groupRoles.some(item => item.url === object.url)
                }
                result.push(object)
            })
        }
        return result
    }
    const handleSelectRole = (value) => {
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup)
        let foundIndex = _assignRolesByGroup.findIndex(item => +item.id === +value)
        if (foundIndex > -1) {
            _assignRolesByGroup[foundIndex].isAssign = !_assignRolesByGroup[foundIndex].isAssign
            setAssignRolesByGroup(_assignRolesByGroup)
        }
    }
    const buildDataToSave = () => {
        let result = {}
        const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup)
        result.groupId = selectGroup
        let groupRolesFilter = _assignRolesByGroup.filter(item => item.isAssign === true)
        let finalGroupRoles = groupRolesFilter.map(item => {
            let data = { groupId: +selectGroup, roleId: +item.id }
            return data
        })
        result.groupRoles = finalGroupRoles
        return result
    }
    const handleSave = async () => {
        let data = buildDataToSave()
        let res = await assignRolesToGroup(data)
        if (res && +res.EC === 0) {
            toast.success(res.EM)
        } else {
            toast.error(res.EM)
        }
    }
    return (
        <div className='group-role-container'>
            <div className='container'>
                <div className='mt-3'>
                    <h4>Group Role:</h4>
                    <div className='assign-group-role'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Select group: (<span className='red'>*</span>): </label>
                            <select
                                className={'form-select'}
                                onChange={(event) => handleOnChangeGroup(event.target.value)}
                            >
                                <option value={''}>Please select your group</option>
                                {userGroups && userGroups.length > 0 &&
                                    userGroups.map((item, index) => {
                                        return (
                                            <option key={item.id} value={item.id}>{item.description}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <hr />
                        {selectGroup &&
                            <div className='roles'>
                                <h5>Assign Roles:</h5>
                                {assignRolesByGroup && assignRolesByGroup.length > 0
                                    && assignRolesByGroup.map((item, index) => {
                                        return (
                                            <div className="form-check" key={`list-role-${index}`}>
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    value={item.id}
                                                    id={`list-role-${index}`}
                                                    checked={item.isAssign}
                                                    onChange={(event) => handleSelectRole(event.target.value)}
                                                />
                                                <label className="form-check-label" htmlFor={`list-role-${index}`}>
                                                    {item.url}
                                                </label>
                                            </div>
                                        )
                                    })
                                }
                                <div className='mt-3'>
                                    <button className='btn btn-warning' onClick={() => handleSave()}>Save</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default GroupRole