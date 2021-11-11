import React from 'react';

export const ConditionalInput = React.forwardRef((props, ref) => {
  // eslint-disable-next-line react/prop-types
    const {value} = props;

    const inputValue = typeof value === 'string' ? value : '';

    return (
      <div className="group" >
        <input  {...props} value={inputValue} ref={ref} />
      </div>
    )
})
