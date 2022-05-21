import axios from "../setup/axios"

const createRoles = (roles) => {
    return axios.post("/api/v1/roles/create", [...roles])
}
export {
    createRoles
}