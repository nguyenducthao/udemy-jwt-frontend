import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Register.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Register = (props) => {
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    let history = useHistory()
    const handleLogin = () => {
        history.push('/login')
    }
    const isValidInput = () => {
        if (!email) {
            toast.error("Email is required!");
            return false;
        }
        if (!phone) {
            toast.error("Phone is required!");
            return false;
        }
        if (!username) {
            toast.error("Username is required!");
            return false;
        }
        if (!password) {
            toast.error("Password is required!");
            return false;
        }
        if (!confirmPassword) {
            toast.error("Re-enter password is required!");
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Password and Re-enter password must be the same!");
            return false;
        }
        let regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!regx.test(email)) {
            toast.error("Please enter a valid email address!");
            return false;
        }
    }
    const handleRegister = () => {
        let check = isValidInput()
        let userData = {
            email, phone, username, password
        }
        console.log(userData)
    }
    useEffect(() => {
        // axios.get("http://localhost:8080/api/test-api").then(data => {
        //     console.log('>>> check data axios: ', data)
        // })
    }, [])
    return (
        <div className="register-container">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left col-12 d-none col-sm-7 d-sm-block">
                        <div className='brand'>
                            PC3-INVEST
                        </div>
                        <div className='detail'>
                            Programming...
                        </div>
                    </div>
                    <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
                        <div className='brand d-sm-none'>
                            PC3-INVEST
                        </div>
                        <div className='form-group'>
                            <label>Email:</label>
                            <input type='text' className='form-control' placeholder='Email address'
                                value={email} onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input type='text' className='form-control' placeholder='Phone number'
                                value={phone} onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Username:</label>
                            <input type='text' className='form-control' placeholder='Username'
                                value={username} onChange={(event) => setUserName(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input type='password' className='form-control' placeholder='Password'
                                value={password} onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Re-enter password:</label>
                            <input type='password' className='form-control' placeholder='Re-enter password'
                                value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>
                        <button className='btn btn-primary' type='button'
                            onClick={() => handleRegister()}
                        >Register</button>
                        <hr />
                        <div className='text-center'>
                            <button className='btn btn-success'
                                onClick={() => handleLogin()}>
                                Already've an account? Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register