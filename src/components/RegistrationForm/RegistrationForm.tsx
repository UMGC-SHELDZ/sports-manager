import React, { ReactElement } from 'react'

// Constants
import { CurrentViewOptions } from '../../common/constants/constants';

// Props for RegistrationForm
interface IRegistrationFormProps {
    setCurrentView: Function;
}

function RegistrationForm({ setCurrentView }: IRegistrationFormProps): ReactElement {
    return (
        <div className='auth-box'>
            <form className='form'>
                <h3>Sign Up</h3>
                <br></br>
                <div className="mb-3">
                    <label>First name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="First name"
                    />
                </div>
                <div className="mb-3">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>
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
                    <button className="btn btn-primary" onClick={() => setCurrentView(CurrentViewOptions.REGISTRATION_SUCCESS)}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
};

export default RegistrationForm;