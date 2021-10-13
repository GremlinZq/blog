import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Link} from "react-router-dom";
import './AuthorizationForm.scss'

let Registration = props => {
    const {handleSubmit} = props;

    return (
        <form onSubmit={handleSubmit}>
            <span>Username</span>
            <Field name='username' component='input' placeholder='Username'/>

            <span>Email address</span>
            <Field name='email' component='input' placeholder='Email address'/>

            <span>Password</span>
            <Field name='password' component='input' placeholder='Password'/>

            <span>Repeat Password</span>
            <Field name='repeatPassword' component='input' placeholder='Password'/>

            <hr />

            <label>
                <Field name='date' component='input' type='checkbox'/>
                <span>I agree to the processing of my personal information</span>
            </label>
            <div className='create_account'>
                <button type="submit" className="btn btn-primary">Create</button>
                    <div className='create_account-text'>Already have an account?
                        <span>
                            <Link to='/signin'>Sign In</Link>
                        </span>
                    </div>
            </div>
        </form>
    )
}

let Authorization = (props) => {
    const {handleSubmit} = props;

    return (
        <form onSubmit={handleSubmit}>
            <span>Username</span>
            <Field name='username' component='input' placeholder='Username'/>

            <span>Email address</span>
            <Field name='email' component='input' placeholder='Email address'/>

            <div className='create_account'>
                <button type="submit" className="btn btn-primary">Login</button>
                <div className='create_account-text'>Don’t have an account?
                    <span>
                            <Link to='/signup'>Sign Up.</Link>
                        </span>
                </div>
            </div>
        </form>
    )
}

Registration = reduxForm({form: 'registration'})(Registration)
Authorization = reduxForm({form: 'authorization'})(Authorization)

const Login = props => {
    const { location } = props;
    const descriptionText = location.pathname === '/signin' ? 'Sign In' : 'Sign Up';

    const onSubmit = values => {
        console.log(values)
    }

    return (
        <div className='login d-flex justify-content-center align-items-center'>
            <div className='row'>
                <div className='f'>
                    <div className='description'>{descriptionText}</div>
                    {location.pathname === '/signin'
                     ? <Authorization onSubmit={onSubmit} />
                     : <Registration onSubmit={onSubmit} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Login;

