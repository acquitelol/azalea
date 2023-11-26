import modules from '@modules';

import { BaseButtonProps } from '@azalea/buttons';
import { mergeStyles } from '@core/stylesheet';

const { React } = modules.common;

export const BaseButton = ({ text, trailing = null, className = '', onClick, ...props }: BaseButtonProps) => {
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

export const SolidButton = ({ style, ...props }: Arguments<typeof BaseButton>[0]) => {
    return <BaseButton 
        {...props}
        style={mergeStyles({ userSelect: 'none' }, style ?? {})}
        className={'_ButtonBase_10evl_1 ' + '_FocusTarget_1nxry_1 '
        + '_ButtonMd_10evl_27 ' + '_ButtonBlue_10evl_51 '
        + '_ButtonContained_10evl_81 ' + (props.className ?? '')}
    />
}

export const DropdownButton = (props: Arguments<typeof BaseButton>[0]) => {
    return <BaseButton 
        {...props}
        className={'_DropdownMenuItem_tgmt4_59' + ' ' + (props.className ?? '')}
    />
}