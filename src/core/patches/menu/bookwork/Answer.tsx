import components from '@core/components';
import Row from '@core/components/row';
import { common } from '@core/modules';
import { storages } from '@core/handlers/state';
import { commonStyles } from '@core/stylesheet';
import { AnswerProps } from '@azalea/bookwork';
import { styles } from './bookwork.styles';

const { React } = common;
const { bookwork } = storages;

export default function Answer({ index, store, array, code, plural, answers, forceRender }: AnswerProps) {
    const { textAnswers, imageAnswers } = answers;

    return <React.Fragment key={index}>
        <Row 
            label={'Question:'}
            sublabel={store.id}
            trailing={<div style={commonStyles.merge(x => [x.flex, x.row])}>
                <div 
                    style={{ 
                        marginTop: '0.5em', 
                        marginRight: '0.5em'
                    }}
                >
                    <h6 style={{ color: 'var(--palette-dark-blue-90)'}}>Date stored:</h6>
                    <h4 style={{ fontWeight: 'normal' }}>
                        {new Date(store.date).toLocaleString()}
                    </h4>
                </div>
                <components.SolidButton 
                    text={'✖'}
                    style={styles.delete}
                    onClick={() => {
                        bookwork.set(code, bookwork.get(code).filter(item => item.id !== store.id));
                        forceRender({});
                    }}
                />
            </div>}
            centerTrailing={false}
        />
        <components.Dividers.Small />
        <Row 
            label={`Answer${plural}:`}
            sublabel={<div>
                {imageAnswers.length > 0 && (
                    <div style={commonStyles.merge(x => [x.flex, x.row, styles.images])}>
                        {imageAnswers.map((answer, idx) => <img src={answer} key={idx} />)}
                    </div>
                )}
                {textAnswers.length > 0 && <components.TextWithMaths 
                    text={textAnswers.join('$,\\;\\;$')}
                    style={{ margin: 0, padding: 0 }}
                />}
            </div>}
        />
        {index !== array.length - 1 && <components.Dividers.Large />}
    </React.Fragment>;
}
