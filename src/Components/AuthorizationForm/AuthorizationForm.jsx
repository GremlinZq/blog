import React from 'react';
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import CustomField from "../common/CustomField";
import {Link, Redirect} from "react-router-dom";
import {requestLogin, requestUserRegister} from "../../redux/reducers/auth-reducer";
import {ARTICLE_LIST_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";
import './AuthorizationForm.scss'
import {ErrorMessage} from "@hookform/error-message";

const schema = yup.object().shape({
    username: yup.string().min(3).max(20),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(40),
    repeatPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    processingPersonalData: yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
})

const CustomInput = CustomField('input');

const Registration = ({requestUserRegister}) => {
    const {register, formState: {errors}, setError, handleSubmit} = useForm({
        mode: 'onTouched',
        resolver: yupResolver(schema)
    });

    const onSubmit = ({username, email, password}) => requestUserRegister(username, email, password, setError);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInput register={register} title='Username' name='username' errors={errors} placeholder='Username'/>
                <CustomInput register={register} title='Email address' name='email' errors={errors}
                       placeholder='Email address'/>
                <CustomInput register={register} title='Password' name='password' errors={errors} placeholder='Password'/>
                <CustomInput register={register} title='Repeat Password' name='repeatPassword' errors={errors}
                       placeholder='Password'/>
                <hr/>

                <label>
                    <input {...register('processingPersonalData')} type='checkbox'/>
                    <span>I agree to the processing of my personal information</span>
                </label>

                <div className='errors mb-2'>
                    <ErrorMessage errors={errors} name='processingPersonalData'/>
                </div>

                <div className='create_account'>
                    <button type="submit" className="btn btn-primary">Create</button>
                    <div className='create_account-text'>Already have an account?
                        <span>
                            <Link to={LOGIN_ROUTE}>Sign In</Link>
                        </span>
                    </div>
                </div>
            </form>
        </>
    )
}

let Authorization = ({requestLogin}) => {
    const {register, formState: {errors}, setError, handleSubmit} = useForm({
        mode: 'onTouched',
        resolver: yupResolver(schema)
    });

    const onSubmit = ({email, password}) => requestLogin(email, password, setError);

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CustomInput register={register} title='Email address' name='email' errors={errors}
                       placeholder='Email address'/>
                <CustomInput register={register} title='Password' name='password' errors={errors} placeholder='Password'/>

                <div className='create_account'>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <div className='create_account-text'>Don’t have an account?
                        <span>
                        <Link to={REGISTRATION_ROUTE}>Sign Up.</Link>
                    </span>
                    </div>
                </div>
            </form>
            <ErrorMessage errors={errors} name='form'/>
        </>
    )
}

const Login = ({location, requestUserRegister, requestLogin, isLoggedIn}) => {
    const descriptionText = location.pathname === LOGIN_ROUTE ? 'Sign In' : 'Sign Up';

    if (isLoggedIn) {
        return <Redirect to={ARTICLE_LIST_ROUTE}/>
    }

    return (
        <div className='login d-flex justify-content-center align-items-center'>
            <div className='row'>
                <div className='f'>
                    <div className='description'>{descriptionText}</div>
                    {location.pathname === LOGIN_ROUTE
                        ? <Authorization requestLogin={requestLogin}/>
                        : <Registration requestUserRegister={requestUserRegister}/>
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({isLoggedIn: state.auth.isLoggedIn})

export default connect(mapStateToProps, {requestUserRegister, requestLogin})(Login);