// -> def
const TITLE = document.querySelector('h1');
const RESET_BTN = document.querySelector('#reset');
const CT_RULERS = document.querySelector('#rulers');
const RULERS = [
    {
        id: 'wght',
        title: 'Weight', // -> Dicke der Schrift
        min: 100,
        max: 1000,
        step: 1,
        def: 400
    },
    {
        id: 'wdth',
        title: 'Width', // -> Weite der Schrift
        min: 25,
        max: 151,
        step: 0.1,
        def: 100
    },
    {
        id: 'opsz',
        title: 'Optical Width', // -> verändert die Grösse
        min: 8,
        max: 144,
        step: 0.1,
        def: 14
    },
    {
        id: 'slnt',
        title: 'Slant', // -> Kippt die Schrift
        min: -10,
        max: 0,
        step: 1,
        def: 0
    },
    {
        id: 'GRAD',
        title: 'Grade', // -> Macht Schrift fetter, ohne sonstige impacts auf breite und so
        min: -200,
        max: 150,
        step: 1,
        def: 0
    },
    {
        id: 'XTRA',
        title: 'Counter Width', // -> Verbreitert alle Buchstaben
        min: 323,
        max: 603,
        step: 1,
        def: 468
    },
    {
        id: 'YOPQ',
        title: 'Thin Stroke', // -> Verbreitert / Schmälert dünne Linien
        min: 25,
        max: 135,
        step: 1,
        def: 79
    },
    {
        id: 'YTAS',
        title: 'Ascender Height', // -> Erhöht / Verringert die Höhe der oberen Buchstabenteile (z.B. h)
        min: 649,
        max: 854,
        step: 1,
        def: 750
    },
    {
        id: 'YTDE',
        title: 'Descender Depth', // -> Erhöht / Verringert die Höhe der unteren Buchstabenteile (z.B. y)
        min: -305	,
        max: -98,
        step: 1,
        def: -203
    },
    {
        id: 'YTFI',
        title: 'Figure Height', // -> Check ich nicht...
        min: 560,
        max: 788,
        step: 1,
        def: 738
    },
    {
        id: 'YTLC',
        title: 'Lowercase Height', // -> Erhöht / Verringert die Höhe von Kleinbuchstaben
        min: 416,
        max: 570,
        step: 1,
        def: 514
    },
    {
        id: 'YTUC',
        title: 'Uppercase Height', // -> Erhöht / Verringert die Höhe von Grossbuchstaben
        min: 528,
        max: 760,
        step: 1,
        def: 712
    }
]

RESET_BTN.addEventListener('click', () => {
    reset()
})

// -> rulers
const initRuler = ({id, title, min, max, step, def}) => {
    // -> create container
    const CT_RULER = document.createElement('div')
    CT_RULER.classList.add('ruler')
    CT_RULER.setAttribute('id', `ruler-${id}`)
    // -> create label
    const LABEL = document.createElement('label')
    LABEL.setAttribute('for', id);
    LABEL.innerHTML = title
    // -> create ruler
    const RULER = document.createElement('input')
    RULER.setAttribute('type', 'range');
    RULER.setAttribute('min', min);
    RULER.setAttribute('max', max);
    RULER.setAttribute('step', step);
    RULER.setAttribute('value', def);
    RULER.setAttribute('id', id);
    // -> create value
    const VALUE = document.createElement('p')
    VALUE.innerHTML = def
    // -> events
    RULER.addEventListener('input', () => updateRuler(id))
    // -> compose
    CT_RULER.appendChild(LABEL)
    CT_RULER.appendChild(RULER)
    CT_RULER.appendChild(VALUE)
    CT_RULERS.appendChild(CT_RULER)
}
const updateRuler = (ruler_id) => {
    const CT_RULER = CT_RULERS.querySelector(`#ruler-${ruler_id}`)
    const VALUE = CT_RULER.querySelector('p')
    const RULER = CT_RULER.querySelector('input')
    VALUE.innerText = RULER.value;
    updateStyling(ruler_id, RULER.value);
}

// -> style
const initStyling = () => {
    let settings = ''
    RULERS.forEach((ruler, index) => {
        settings += `"${ruler.id}" ${ruler.def}`
        if (index + 1 !== RULERS.length) settings += ', '
        TITLE.style.fontVariationSettings = settings;
    })
}
const updateStyling = (id, value) => {
    const SETTINGS = TITLE.style.fontVariationSettings.split(', ');
    let new_settings = ''
    SETTINGS.forEach((setting, index) => {
        new_settings += setting.includes(`"${id}"`) ? `"${id}" ${value}` : setting
        new_settings += index + 1 !== RULERS.length ? ',' : ''
    })
    TITLE.style.fontVariationSettings = new_settings
}

// -> reset
const reset = () => {
    CT_RULERS.innerHTML = '';
    init();
}

// -> init
const init = () => {
    RULERS.forEach(ruler=> initRuler(ruler))
    initStyling();
}
init();
