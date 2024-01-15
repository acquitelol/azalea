import modules from '@modules';

import { BaseButtonProps } from '@azalea/buttons';
import { mergeStyles } from '@core/stylesheet';

const { React } = modules.common;

export function BaseButton({ text, trailing = null, className = '', onClick, ...props }: BaseButtonProps) {
    return <div
        className={className}
        onClick={onClick}
        {...props}
    >
        {text}
        {trailing && ' '}
        {trailing}
    </div>;
}

export function SolidButton({ style, ...props }: Arguments<typeof BaseButton>[0]) {
    return <BaseButton 
        {...props}
        style={mergeStyles({ userSelect: 'none' }, style ?? {})}
        className={`_ButtonBase_19fx3_1 _FocusTarget_1nxry_1 
            _ButtonMd_19fx3_27 _ButtonBlue_19fx3_90 
            _ButtonContained_19fx3_122` + (props.className ?? '')}
    />;
}

export function DropdownButton(props: Arguments<typeof BaseButton>[0]) {
    return <BaseButton 
        {...props}
        className={'_DropdownMenuItem_tgmt4_59' + ' ' + (props.className ?? '')}
    />;
}