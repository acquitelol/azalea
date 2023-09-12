import menuButtons from './menuButtons';
import captureAnswers from './captureAnswers';
import bookworkBypass from './bookworkBypass';

const patches = Promise.allSettled([
    menuButtons(),
    captureAnswers(),
    bookworkBypass()
])

export default patches;