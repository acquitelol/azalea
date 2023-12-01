import { createStyleSheet } from '@core/stylesheet';

export const { merge, styles } = createStyleSheet({
    common: {
        marginLeft: '1em'
    },

    input: {
        borderRadius: '10em',
        height: 'auto'
    },

    message: {
        marginInline: '2em',
        background: 'var(--palette-light-blue-20)'
    },

    navigation: {
        marginBlock: '1em'
    },

    collapsable: {
        overflow: 'hidden',
        transition: 'max-height 300ms ease, opacity 300ms ease'
    },

    answers: {
        fontSize: '1.25rem',
        justifyContent: 'end',
        marginRight: '2em'
    },

    actions: {
        justifyContent: 'start',
        marginInline: '2em',
        gap: '0.5em',
        flexGrow: 1
    },

    paragraph: {
        marginBlock: 0,
        marginRight: '0.25em'
    },

    delete: {
        width: 'fit-content',
        height: 'fit-content',
        aspectRatio: 1,
        borderRadius: '100000px',
        transform: 'scale(0.5)',
        marginTop: '0.125em',
        marginRight: '-0.25em',
        fontSize: '1.5rem'
    },

    fallback: {
        marginInline: '2em',
        paddingBlock: '1em',
        background: 'var(--palette-light-blue-20)',
    },

    images: {
        maxWidth: '20%',
        gap: '1em',
        marginBlock: '0.5em'
    }
});