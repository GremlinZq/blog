import React, { useCallback } from 'react';
import * as yup from 'yup';
import { useForm, Controller, useFieldArray, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CustomField } from '../common/CustomField';
import { ConditionalInput } from '../common/ConditionalInput';
import { createArticleCard, editArticleCard } from '../../redux/reducers/article-reducer';
import { getSuccessfulArticleCreation, getUserAuthorization } from '../../redux/selectors/selectors';
import './ArticleForm.scss';

const schema = yup.object().shape({
  tags: yup.array().of(yup.string().min(1)),
  title: yup.string().min(3).max(20),
  description: yup.string().min(3).max(20),
  text: yup.string().required(),
});

const CustomInput = CustomField('input');
const CustomTextArea = CustomField('textarea');

export const ArticleForm = (props) => {
  const { slug, tagList, title, description, body } = props;
  const successfulArticleCreation = useSelector(getSuccessfulArticleCreation);
  const isLoggedIn = useSelector(getUserAuthorization)
  const history = useHistory();
  const heading = history.location.pathname === '/new-article' ? 'Create new article' : 'Edit article';
  const buttonText = history.location.pathname === '/new-article' ? 'Send' : 'Edit';
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors }, setError, control, watch } = useForm({
    defaultValues: {
      tags: tagList || [],
    },
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const { isValid } = useFormState({
    control
  });

  const onSubmit = useCallback((values) => {
    if (history.location.pathname === '/new-article') {
      dispatch(createArticleCard(values, setError));
    } else {
      dispatch(editArticleCard(slug, values, setError));
    }
  }, [slug, history, dispatch, setError]);

  const watchFieldArray = watch('tags');

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  if (successfulArticleCreation || !isLoggedIn) {
    return <Redirect to='/' />;
  }

  return (
    <div className='article__form d-flex justify-content-center align-items-center'>
      <div className='article__form_content container'>
        <div className='article__form_content-heading'>{heading}</div>
        <form id='article__form_edit' onSubmit={handleSubmit(onSubmit)}>
          <CustomInput register={register} errors={errors} title='Title' placeholder='Title' defaultValue={title} name='title' />
          <CustomInput register={register} errors={errors} title='Short description' defaultValue={description} placeholder='Title' name='description' />
          <CustomTextArea register={register} defaultValue={body} errors={errors} title='Text' placeholder='Text' name='text' />
          <span>Tags</span>
          <div className='article__form_content_tags_list' onSubmit={handleSubmit(onSubmit)}>
            <ul>
              {controlledFields.map((field, index) => {
                  return (
                    <li className='article__form_content_tags_list-item  d-flex flex-wrap' key={field.id}>
                      <Controller name={`tags[${index}]`} control={control} render={({ field }) =>
                          <ConditionalInput
                            {...field}
                            name={`tags[${index}]`}
                            index={index}
                            placeholder='Tag'
                            errors={errors}
                          />
                        }
                      />
                      <button className='btn btn-outline-danger' type='button' onClick={() => remove(index)}>Delete</button>
                    </li>
                  );
                },
              )}
            </ul>
            <div className='d-flex align-items-end'>
              <button className=' btn btn-outline-info' type='button' onClick={() => append({})}>Add tag</button>
            </div>
          </div>
          <button className='article__form_content_send_btn btn btn-primary' disabled={!isValid} type='submit'>{buttonText}</button>
        </form>
      </div>
    </div>
  );
};

ArticleForm.defaultProps = {
  slug: '',
  title: '',
  tagList: [],
  description: '',
  body: '',
};

ArticleForm.propTypes = {
  slug: PropTypes.string,
  tagList: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  description: PropTypes.string,
  body: PropTypes.string,
};