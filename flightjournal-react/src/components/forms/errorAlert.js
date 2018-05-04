import React from 'react';

const ErrorAlert = (props) => {
    return (
        <p className="formular__validation">
            {props.children}
        </p>
    );
};

export default ErrorAlert;