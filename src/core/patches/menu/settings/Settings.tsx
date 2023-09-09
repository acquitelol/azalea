import { common } from '@core/modules';

import ToggleBookwork from './ToggleBookwork';
import NameInputs from './NameInputs';
import Buttons from './Buttons';

const { React } = common;

export default () => (
    <>
        <ToggleBookwork />
        <NameInputs />
        <Buttons />
    </>
);