import React, { ReactElement } from 'react'

// Constants
import { CurrentViewOptions } from '../../common/constants/constants';

// Props for LoginForm
interface ILoginFormProps {
    setCurrentView: Function;
}

function LoginForm({ setCurrentView }: ILoginFormProps): ReactElement {
    return (
        <div className='auth-box'>
            <form className='form'>
                <h3>Log In</h3>
                <br></br>
                <div className="mb-3">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter username"
                    />
                </div>
                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                    />
                </div>
                <div className="d-grid">
                    <button className="btn btn-primary" onClick={() => setCurrentView(CurrentViewOptions.LOGIN_SUCCESS)}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
};

export default LoginForm;