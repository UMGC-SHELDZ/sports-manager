import React, { ReactElement, useContext } from 'react'

// Constants
import { CurrentViewOptions } from '../../common/constants/constants';
import { UserContext } from '../../providers/UserProvider';

// Props for LoginForm
interface ILoginFormProps {
    setCurrentView: Function;
}

function LoginForm({ setCurrentView }: ILoginFormProps): ReactElement {
    // Import dispatch from global state
    const { dispatch } = useContext(UserContext);

    // MOCK login function to set authentication status
    /**
     * Handler to login to the application.
     */
    const handleLogin = (): void => {
        const userId: string = 'fakeUserId';
        const authToken: string = 'fakeAuthToken';

        dispatch({
            type: 'STORE_AUTHENTICATION',
            userId: userId,
            authToken: authToken
        });

        setCurrentView(CurrentViewOptions.LOGIN_SUCCESS);
    };

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
                    <button className="btn btn-primary" onClick={() => handleLogin()}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
};

export default LoginForm;