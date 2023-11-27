type StyleSheet = Record<string, React.CSSProperties>;

export const mergeStyles = (...styles: React.CSSProperties[]) => styles.reduce((pre, cur) => ({ ...pre, ...cur }), {});
export const createStyleSheet = <T extends StyleSheet>(sheet: T) => ({
    styles: sheet,
    merge: (callback: (sheet: T) => React.CSSProperties[]) => {
        const styles = callback(sheet);
        return mergeStyles(...styles);
    }
});

export const commonStyles = createStyleSheet({
    flex: {
        display: 'flex'
    },

    align: {
        alignItems: 'center'
    },

    justify: {
        justifyContent: 'center'
    },

    row: {
        flexDirection: 'row'
    },

    column: {
        flexDirection: 'column'
    },

    wrap: {
        flexWrap: 'wrap'
    },

    textCenter: {
        textAlign: 'center'
    }
});

export default { mergeStyles, createStyleSheet, commonStyles };