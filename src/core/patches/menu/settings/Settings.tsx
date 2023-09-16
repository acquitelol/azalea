import { common } from '@core/modules';

import Bookwork from './Bookwork';
import Logger from './Logger';
import NameInputs from './NameInputs';
import Buttons from './Buttons';

const { React } = common;

export default () => (
    <>
        <Bookwork />
        <Logger />
        <NameInputs />
        <Buttons />
    </>
);