import bookworkBypass from './bookworkBypass';
import captureAnswers from './captureAnswers';
import menuButtons from './menuButtons';

const patches = (async function () {
    return [
        // await bookworkBypass(),
        // await captureAnswers(),
        await menuButtons()
    ]
})()

export default patches;