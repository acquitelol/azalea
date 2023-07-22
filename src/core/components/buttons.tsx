import modules from "@modules"

const { React, Redux } = modules.common;

export const Button = ({ text, trailing = null, className, onClick, ...props }) => {
    return <div
        className={`alert-button btn ${className}`}
        onClick={onClick}
        {...props}
    >
        {text}
        {trailing && " "}
        {trailing}
    </div>
}

export const EndAlertButton = ({ text, trailing = null, className, onClick, ...props }) => {
    return <Button 
        text={text}
        trailing={trailing}
        className={className}
        onClick={() => {
            Redux.dispatch({
                type: "END_ALERT"
            })

            onClick();
        }}
        {...props}
    />
}