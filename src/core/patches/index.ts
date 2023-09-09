import bookworkBypass from './bookworkBypass';
import captureAnswers from './captureAnswers';
import menuButtons from './menuButtons';

const patches = Promise.allSettled([
    // await bookworkBypass(),
    // await captureAnswers(),
    menuButtons()
])

export default patches;