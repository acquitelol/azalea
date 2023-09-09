import modules from '@modules'

const { React } = modules.common;

export const Button = ({ text, trailing = null, className, onClick, ...props }) => {
    return <div
        className={className}
        onClick={onClick}
        {...props}
    >
        {text}
        {trailing && ' '}
        {trailing}
    </div>
}