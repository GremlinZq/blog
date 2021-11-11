import React from 'react';
import { useForm, Controller, useFieldArray, } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import  { ConditionalInput } from '../common/ConditionalInput';
import { CustomField } from '../common/CustomField';
import { createArticleCard, editArticleCard } from '../../redux/reducers/article-reducer';
import { getSuccessfulArticleCreation, getUserAuthorization } from '../../redux/selectors/selectors';
import './ArticleForm.scss';


const CustomInput = CustomField('input')
const CustomTextArea = CustomField('textarea');

export const ArticleForm = (props) => {
  const schema = yup.object().shape({
    tagList: yup.array().of(yup.string().min(1)),
    title: yup.string().min(3).max(20),
    description: yup.string().min(3).max(20),
    body: yup.string().required(),
  });

  const { slug, tagList, title, description, body } = props;
  const successfulArticleCreation = useSelector(getSuccessfulArticleCreation);
  const isLoggedIn = useSelector(getUserAuthorization)
  const history = useHistory();
  const heading = history.location.pathname === '/new-article' ? 'Create new article' : 'Edit article';
  const buttonText = history.location.pathname === '/new-article' ? 'Send' : 'Edit';
  const dispatch = useDispatch();

  const {  handleSubmit, register, formState: { errors, }, setError, control, watch } = useForm({
    defaultValues: {
      tagList,
      title,
      description,
      body,
    },
    resolver: yupResolver(schema),
    mode: 'onTouched',
  });

  const {fields, append, remove} = useFieldArray({
    control,
    name: "tag",
  });

  const watchFieldArray = watch('tag');

  const onSubmit = (values) => {
    console.log(values);
    // if ( history.location.pathname === '/new-article') {
    //   dispatch(createArticleCard(values, setError))
    // } else {
    //   dispatch(editArticleCard(slug, values, setError));
    // }
  }

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
          <CustomInput register={register} errors={errors} title='Title' placeholder='Title' value={watch("title")} name='title' />
          <CustomInput register={register} errors={errors} title='Short description' value={watch("description")} placeholder='Title' name='description' />
          <CustomTextArea register={register} value={watch("body")} errors={errors} title='Text' placeholder='Text' name='body' />
          <div className="tags">
            <ul>
              {controlledFields.map((field, index) => {
                  return (
                    <li className='article__form_content_tags_list-item  d-flex flex-wrap' key={field.id}>
                      <Controller name={`tagList.${index}`} control={control} render={({ field }) => {
                        // console.log(field);
                        return <ConditionalInput
                          {...field}
                          name={`tagList.${index}.tagInput`}
                          placeholder='Tag'
                          error={errors[`tagList.${index}.tagInput`]}
                        />
                      }}
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

          <button className='article__form_content_send_btn btn btn-primary' type='submit'>{buttonText}</button>
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
