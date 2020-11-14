import React from 'react'

const AuthInput = (props) => (
    <>
    <p>{props.placeholderString}</p>
    <input
    required
    type="text"
    name={`${props.inputName}`}
    value={props.inputName}
    placeholder={`Enter ${props.placeholderString}`}
    onChange={props.handleChange}
    />
    </>

)

export default AuthInput
