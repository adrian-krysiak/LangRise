import React, { useState } from "react"
import axios from "axios"
import Popup from "reactjs-popup"


export default function RegisterButton() {
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setError("Passwords do not match. Please try again.")
            return
        }

        try {
            const response = await axios.post("http://localhost:8000/api/register/", {
                username,
                password,
                email
            })
            console.log(response)
            setSuccessMessage("Registration successful. You can now log in.")
            alert("Registration successful. You can now log in.")
            setIsPopupOpen(false)
            // setView('wordsLists')
            setError('')
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    setError("Registration failed. Username may already exist.")
                } else if (error.response?.status === 500) {
                    setError("A server error occurred. Please try again later.")
                } else {
                    setError("Registration failed. Please try again.")
                }
            } else {
                setError("An unexpected error occurred. Please try again.")
            }
        }
    }

    return (
        <>
            <button onClick={() => setIsPopupOpen(true)}>
                Register
            </button>
            <Popup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} modal nested>
                {/* @ts-ignore} */}
                {(close) => (
                    <div className="modal">
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                        <div className="header">Register</div>
                        <form onSubmit={handleRegister} className="content">
                            <div>
                                <label htmlFor="username">Username:</label>
                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    style={{marginLeft: '16px', width: '200px', height: '40px', fontSize: '16px'}}
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label><div></div>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={{marginLeft: '16px', width: '200px', height: '40px', fontSize: '16px'}}
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password:</label>
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    minLength={8}
                                    pattern="^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$"
                                    title="Password must be at least 8 characters long and include at least one letter,
                                    one digit, and one special character."
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    style={{marginLeft: '16px', width: '200px', height: '40px', fontSize: '16px'}}
                                />
                                <div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            onChange={() => setShowPassword(!showPassword)}
                                            style={{ height: '20px', width: '20px'}}
                                        />
                                        Show
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Confirm Password:</label>
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    style={{marginLeft: '16px', width: '200px', height: '40px', fontSize: '16px'}}
                                />
                                <div>
                                    <label>
                                        <input
                                            type="checkbox"
                                            onChange={() => setShowConfirmPassword(!showConfirmPassword)}
                                            style={{ height: '20px', width: '20px'}}
                                        />
                                        Show
                                    </label>
                                </div>
                            </div>
                            <div className="actions">
                                <button type="button" onClick={close} style={{width: 'auto'}}>
                                    Cancel
                                </button>
                                <button type="submit" style={{width: 'auto'}}>
                                    Register
                                </button>
                            </div>
                            {error &&
                                <div style={{color: 'orangered', textAlign: 'center', marginTop: '20px'}}>{error}</div>}
                            {successMessage && <div
                                style={{color: 'green', textAlign: 'center', marginTop: '20px'}}>{successMessage}</div>}
                        </form>
                    </div>
                )}
            </Popup>
        </>
    )
}
