import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ErrorMessage } from '@hookform/error-message';
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

  const formatTags = tagList => {
    return tagList.reduce(
      (acc, tag) => {
        acc.push({ name: tag });
        return acc;
      },
      []
    );
  }

  const formatTagsFromText = (value) => {
    return {
      ...value,
      tagList: value.tagList.map(tag => tag.name)
    }
  }

  const defValue = formatTags(tagList);

  const {  handleSubmit, register, formState: { errors, isDirty, isValid }, setError, control, watch } = useForm({
    defaultValues: {
      tagList: defValue,
      title,
      description,
      body
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const {fields, append, remove} = useFieldArray({
    control,
    name: "tagList",
  });

  const onSubmit = values => {
    const formatValue = formatTagsFromText(values);
    if (history.location.pathname === '/new-article') {
      dispatch(createArticleCard(formatValue, setError))
    } else {
      dispatch(editArticleCard(slug, formatValue, setError));
    }
  }

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
            <span>Tags</span>
            <ul>
              {!fields.length &&
              <button className='btn btn-outline-info' onClick={() => append({})} type="button">Add tag</button>}
              {fields.map((field, index) => {
                  return (
                    <li className='article__form_content_tags_list-item  d-flex flex-wrap' key={field.id}>
                      <ConditionalInput control={control} name={`tagList.${index}.name`} />
                      <button className='btn btn-outline-danger mx-3' type="button" onClick={() => remove(index)}>Delete</button>
                      {index === fields.length - 1 &&
                      <button className='btn btn-outline-info' onClick={() => append({name: ''})} type="button">Add tag</button>}
                    </li>
                  );
                },
              )}
            </ul>
          </div>

          <button className='article__form_content_send_btn btn btn-primary mt-4' disabled={!isDirty || !isValid} type='submit'>{buttonText}</button>
        </form>
        <div className='errors mt-2'>
          <ErrorMessage errors={errors} name='unique??ard' />
        </div>
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
