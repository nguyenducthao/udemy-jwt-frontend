import axios from "../setup/axios"

const createRoles = (roles) => {
    return axios.post("/api/v1/roles/create", [...roles])
}
const fetchAllRole = () => {
    return axios.get("/api/v1/roles/read")
}
const deleteRole = (role) => {
    return axios.delete("/api/v1/roles/delete", { data: { id: role.id } })
}
const fetchRoleByGroup = (groupId) => {
    return axios.get(`/api/v1/roles/by-group/${groupId}`)
}
export {
    createRoles,
    fetchAllRole,
    deleteRole,
    fetchRoleByGroup
}