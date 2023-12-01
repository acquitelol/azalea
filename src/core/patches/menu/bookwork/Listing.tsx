import components from '@core/components';
import { common } from '@core/modules';
import { commonStyles } from '@core/stylesheet';
import { ListingProps } from '@azalea/bookwork';
import { styles } from './bookwork.styles';
import AnswerSection from './Section';

const { React } = common;
const { SectionBody } = components;

function sortCodes([a]: [string, any[]], [b]: [string, any[]]) {
    const numberA = Number(a.slice(0, -1));
    const numberB = Number(b.slice(0, -1));
    const letterA = a.slice(-1);
    const letterB = b.slice(-1);

    if (numberA !== numberB) {
        return numberA - numberB;
    }
    
    return letterA.localeCompare(letterB);
}

function Listing({ query, listing, forceRender }: ListingProps) {
    const entries = React.useMemo(
        () => Object.entries(listing).filter(([k]) => k.toLowerCase().includes(query.toLowerCase())), 
        [listing, query]
    );

    return entries.length > 0 ? entries.sort(sortCodes).map(([key, value]: [string, any[]]) => {
        return value.length > 0 && <AnswerSection 
            key={key}
            code={key}
            value={value}
            forceRender={forceRender}
        />;
    }) : <SectionBody style={styles.fallback}>
        <h2 style={commonStyles.merge(x => [x.flex, x.justify, x.align, x.textCenter])}>
            No bookwork codes found :(
        </h2>
    </SectionBody>;
}

export default Listing;