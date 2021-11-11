import React from 'react';
import { useController } from 'react-hook-form';

export const ConditionalInput = ((props) => {
  const {
    field: { ref, ...inputProps },
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields }
  } = useController({
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    name: props.name,
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    control: props.control,
    rules: { required: true },
    defaultValue:  '',
  });
  return (
    <div className="group" >
      <input {...inputProps} />
    </div>
  )
})
