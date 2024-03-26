import React from 'react'
import "./Login.css"
import "./Style.css"

const Login = () => {
    return (
        <div className="login-container">
            <form className='login-form'>
                <h2 className='title'>LOG IN</h2>
                    <div className="username-input">
                        <label htmlFor='username'>Username*</label>
                        <div className='form-input'>
                            <input
                                className='input-box'
                                type="username"
                                id="username"
                                name="username"
                                required
                            />
                        </div>
                    </div>
                    <div className="password-input">
                        <label htmlFor='password'>Password*</label>
                        <div className='form-input'>
                            <input
                                className='input-box'
                                type="password"
                                id="password"
                                name="password"
                                required
                            />
                        </div>
                    </div>
                    <div className="flex-center">
                        <button className="btn-login">
                            Log in
                        </button>
                    </div>
            </form>
        </div>

    )
}
export default Login