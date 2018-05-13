import React from 'react';

const FormErrorAlert = (props) => {
    return (
        <p className="formular__validation">
            {props.children}
        </p>
    );
};

export default FormErrorAlert; 