import React, {useCallback} from 'react';
import * as yup from "yup";
import {useForm, Controller, useFieldArray} from 'react-hook-form';
import {yupResolver} from "@hookform/resolvers/yup";
import ConditionalInput from "../common/ConditionalInput";
import {useDispatch, useSelector} from "react-redux";
import CustomField from './../common/CustomField';
import {createArticleCard, editArticleCard} from "../../redux/reducers/article-reducer";
import './ArticleForm.scss';
import {Redirect, useHistory} from "react-router-dom";

const schema = yup.object().shape({
    tags: yup.array().of(yup.string().min(1)).required(),
    title: yup.string().min(3).max(20).required(),
    description: yup.string().min(3).max(20).required(),
    text: yup.string().required()
})

const CustomInput = CustomField('input');
const CustomTextArea = CustomField('textarea');

export const ArticleForm = (props) => {
    const {slug, tagList, title, description, body} = props;
    const successfulArticleCreation = useSelector(state => state.articles.successfulArticleCreation);
    const history = useHistory()
    const heading = history.location.pathname === "/new-article" ? 'Create new article' : 'Edit article';
    const buttonText = history.location.pathname === '/new-article' ? 'Send' : 'Edit';
    const ref = React.createRef();
    const dispatch = useDispatch();

    const {register, handleSubmit, formState: {errors}, setError, control, watch} = useForm({
        defaultValues: {
            tags: tagList || [''],
        },
        resolver: yupResolver(schema),
        mode: 'onTouched'
    })

    const {fields, append, remove} = useFieldArray({
        control,
        name: "tags"
    });

    const onSubmit = useCallback((values) => {
        if (history.location.pathname === '/new-article') {
            dispatch(createArticleCard(values, setError))
        } else {
            dispatch(editArticleCard(slug, values, setError))
        }
    }, [slug, history, dispatch, setError])

    const watchFieldArray = watch("tags");

    const controlledFields = fields.map((field, index) => {
        return {
            ...field,
            ...watchFieldArray[index]
        };
    });

    if (successfulArticleCreation) {
        return <Redirect to='/'/>
    }

    return (
        <div className='article__form d-flex justify-content-center align-items-center'>
            <div className='article__form_content container'>
                <div className='article__form_content-heading'>{heading}</div>
                <form id='article__form_edit' onSubmit={handleSubmit(onSubmit)}>
                    <CustomInput register={register} errors={errors} title={'Title'} placeholder='Title'
                           defaultValue={title} name={'title'}/>
                    <CustomInput register={register} errors={errors} title={'Short description'}
                           defaultValue={description} placeholder='Title'
                           name={'description'}/>
                    <CustomTextArea register={register} defaultValue={body}
                              errors={errors} title={'Text'} placeholder='Text' name={'text'}/>
                    <span>Tags</span>
                    <div className='article__form_content_tags_list' onSubmit={handleSubmit(onSubmit)}>
                        <ul>
                            {controlledFields.map((field, index) => {
                                    return (
                                        <li className='article__form_content_tags_list-item  d-flex flex-wrap'
                                            key={field.id}>
                                            <Controller
                                                name={`tags[${index}]`}
                                                control={control}
                                                render={({field}) =>
                                                    <ConditionalInput
                                                        {...field}
                                                        name={`tags[${index}]`}
                                                        index={index}
                                                        ref={ref}
                                                        placeholder="Tag"
                                                        errors={errors}
                                                    />
                                                }
                                            />
                                            <button style={{height: 40}} className='btn btn-outline-danger' type="button"
                                                    onClick={() => remove(index)}>Delete
                                            </button>
                                        </li>
                                    )
                                }
                            )}
                        </ul>

                        <div className='d-flex align-items-end'>
                            <button className=' btn btn-outline-info' type="button" onClick={() => append({})}>
                                Add tag
                            </button>
                        </div>
                    </div>
                    <button className='article__form_content_send_btn btn btn-primary' type="submit">
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    )
}