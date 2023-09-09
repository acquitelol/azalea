import Theming from '@core/handlers/theming'
import { common } from '@core/modules'

import { SelectThemeProps } from '@azalea/themes'

const { React } = common;

export default ({ label, selected, setSelected }: SelectThemeProps) => {
    React.useEffect(() => {
        Theming.setTheme();
        Theming.applyLabel(label);
    }, [selected]);

    return <select 
        value={selected}
        onChange={e => {
            const index = Number(e.target.value);
            setSelected(Theming.themes[index] ? index : 0);
        }}
    >
        {Theming.themes.map((theme, i) => (
            <option value={i}>
                {theme.name}
            </option>
        ))}
    </select>
}