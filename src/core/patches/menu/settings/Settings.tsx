import { common } from '@core/modules';
import utilities from '@core/utilities';

import { Section } from '@core/components/section';
import Dividers from '@core/components/dividers';

import About from './About';
import Toggles from './Toggles';
import Title from './Title';
import Themes from './themes';

const { React } = common;
const { navigate } = utilities;

function handleButtonClick() {
    const path = '/azalea/settings';
    navigate(path);
}

const buttonId = 'azaleaAddonButton';

function createButton() {
    const button = document.createElement('button');
    button.id = buttonId;
    button.className = '_NavButton_ux884_13 _FocusTarget_1nxry_1';
    button.addEventListener('click', handleButtonClick);

    const iconSpan = document.createElement('span');
    iconSpan.className = '_NavButtonIcon_ux884_76';
    iconSpan.style.marginBottom = '3px';

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('height', '24');
    svg.setAttribute('width', '24');

    svg.innerHTML = `
        <path d="M12 2V22" stroke="var(--colours-interactable)" stroke-width="2" stroke-linecap="round"/>
        <path d="M2 12H22" stroke="var(--colours-interactable)" stroke-width="2" stroke-linecap="round"/>
    `;

    iconSpan.appendChild(svg);

    button.appendChild(iconSpan);

    const label = document.createElement('span');
    label.className = '_NavButtonLabel_ux884_81';
    label.textContent = 'Settings';

    button.appendChild(label);

    return button;
}

function isButtonPresent() {
    return !!document.getElementById(buttonId);
}

function observeAndAppendButtonToSidebar() {
    const sidebarObserver = new MutationObserver(() => {
        if (!isButtonPresent()) {
            const sidebar = document.querySelector('._Sidebar_ux884_142');
            if (sidebar) {
                const button = createButton();
                sidebar.appendChild(button);
            }
        }
    });

    // body exists before observing
    if (document.body) {
        sidebarObserver.observe(document.body, { childList: true, subtree: true });
    } else {
        console.error("document.body does not exist yet. retry");
    }
}

observeAndAppendButtonToSidebar();

export default () => (
    <>
        <Title />

        <Dividers.Large />

        <Section
            title='Preferences'
            style={{ marginTop: '1em' }}
        >
            <Toggles />
        </Section>

        <Section title='Themes'>
            <Themes />
        </Section>

        <Section title='About'>
            <About />
        </Section>
    </>
);
