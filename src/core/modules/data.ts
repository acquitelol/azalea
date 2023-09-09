import { ModuleRecord } from '@azalea/types';

const exfiltratedModules = {
    MediaQuery: {
        prop: 'useMediaQuery',
        filter: () => true
    },
    React: {
        prop: 'useRef',
        filter: r => 'createElement' in r
    },
    ReactDOM: {
        prop: 'findDOMNode',
        filter: r => 'createPortal' in r
    }
} satisfies ModuleRecord;

export { exfiltratedModules };