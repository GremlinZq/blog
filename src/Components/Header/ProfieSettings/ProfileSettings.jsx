import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useFormState } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { ErrorMessage } from '@hookform/error-message';
import { Redirect } from 'react-router-dom';
import { CustomField } from '../../common/CustomField';
import { getUpdatedProfile } from '../../../redux/reducers/auth-reducer';
import { getProfileEdit, getUserAuthorization } from '../../../redux/selectors/selectors';
import './ProfileSettings.scss';

const Input = CustomField('input');

export const ProfileSettingsForm = ({username, email,  image}) => {
  const profileEdited = useSelector(getProfileEdit);
  const isLoggedIn = useSelector(getUserAuthorization)
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    username: yup.string().min(3).max(20).required(),
    email: yup.string().email(),
    password: yup.string().nullable().min(3).max(20),
    image: yup.string().url(),
  });

  const { register, formState: { errors }, control, handleSubmit, setError } = useForm({
    resolver: yupResolver(schema),
    mode: 'onTouched',
    defaultValues: {
      password: null,
    }
  });

  const {  isValid } = useFormState({ control });

  const onSubmit = values => dispatch(getUpdatedProfile(values, setError));

  if (profileEdited || !isLoggedIn) {
    return <Redirect to='/' />;
  }

  return (
      <div className='profile_settings d-flex justify-content-center align-items-center'>
      <div className='profile_settings_form'>
        <div className='d-flex justify-content-center mb-3'>Edit Profile</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input register={register} title='Username' name='username' errors={errors} defaultValue={username} />
          <Input register={register} title='Email' name='email' errors={errors} defaultValue={email} />
          <Input register={register} title='Password' name='password' errors={errors} placeholder='New password' />
          <Input register={register} title='Avatar' defaultValue={image} name='image' errors={errors} placeholder='Avatar URL' />
          <button className='btn btn-primary' disabled={!isValid} type='submit'>Save</button>
        </form>
        <div className='mt-4'><ErrorMessage errors={errors} name='form' /></div>
      </div>
    </div>
  )
};

ProfileSettingsForm.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}