import modules from '@modules';

const { React } = modules.common;

export const Arrows = {
    Right: () => {
        return <span key='primary'>
            <i className='button-icon-right fas fa-angle-right' />
        </span>
    }
}