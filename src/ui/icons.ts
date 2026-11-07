import { svgEl } from './dom';

function icon(paths: SVGElement[], viewBox = '0 0 24 24', size = '32'): SVGSVGElement {
    return svgEl('svg', { viewBox, width: size, height: size, 'aria-hidden': 'true' }, ...paths);
}

export function bullIcon(): SVGSVGElement {
    return svgEl(
        'svg',
        { class: 'brand-icon', viewBox: '0 0 150 135', 'aria-hidden': 'true' },
        svgEl('path', {
            d: 'M26 67 12 48 17 17 27 8 27 35 49 42h51l22-7V8l11 9 5 31-14 19-10-1-6 39-16 19H57l-14-19-5-39Z',
            fill: '#101f30',
            stroke: 'currentColor',
            'stroke-width': '5',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
        }),
        svgEl('path', {
            d: 'm27 8-10 9-3 28 15 5 17-5-20-10Zm95 0 11 9 3 28-14 5-18-5 20-10Z',
            fill: 'currentColor',
        }),
        svgEl('path', { d: 'm49 72 19 6-8 10-10-4Zm50 0-19 6 7 10 11-4Z', fill: '#f5f7fb' })
    );
}

export function mascotIllustration(): SVGSVGElement {
    const ground = svgEl(
        'linearGradient',
        { id: 'ground', x1: '0', y1: '0', x2: '0', y2: '1' },
        svgEl('stop', { offset: '0', 'stop-color': '#35465f' }),
        svgEl('stop', { offset: '1', 'stop-color': '#13253b', 'stop-opacity': '0' })
    );
    const bull = svgEl(
        'g',
        { transform: 'translate(105 9) scale(1.09)' },
        svgEl('path', {
            d: 'M26 67 12 48 17 17 27 8 27 35 49 42h51l22-7V8l11 9 5 31-14 19-10-1-6 39-16 19H57l-14-19-5-39Z',
            fill: '#101f30',
            stroke: '#b9fa43',
            'stroke-width': '5',
            'stroke-linejoin': 'round',
            'stroke-linecap': 'round',
        }),
        svgEl('path', { d: 'm27 8-10 9-3 28 15 5 17-5-20-10Zm95 0 11 9 3 28-14 5-18-5 20-10Z', fill: '#b9fa43' }),
        svgEl('path', { d: 'm49 72 19 6-8 10-10-4Zm50 0-19 6 7 10 11-4Z', fill: '#f6f8fc' })
    );
    const cow = svgEl(
        'g',
        { transform: 'translate(253 51) scale(.78)' },
        svgEl('path', {
            d: 'M29 39 20 18Q21 4 31 10l16 21 35-5L93 8q11-5 10 11l-1 23 14 10-1 40q-9 28-40 39l-37-11Q15 105 14 81V54Z',
            fill: '#f5f7fa',
            stroke: '#d5dfef',
            'stroke-width': '3',
            'stroke-linejoin': 'round',
        }),
        svgEl('path', {
            d: 'M18 55 3 42Q-7 48 5 67l22 3Zm89-1 21-10q14 4 4 22l-19 4Z',
            fill: '#f3a12e',
            stroke: '#f5f7fa',
            'stroke-width': '3',
        }),
        svgEl('path', { d: 'm65 31 22-2 13 16-8 20-18-3-9-13Z', fill: '#f3a12e' }),
        svgEl('path', { d: 'M35 80Q55 67 82 80q19 11 8 27-25 19-55 2-14-10 0-29', fill: '#f6c5bd' }),
        svgEl('circle', { cx: '46', cy: '63', r: '5', fill: '#122031' }),
        svgEl('circle', { cx: '85', cy: '63', r: '5', fill: '#122031' }),
        svgEl('circle', { cx: '48', cy: '96', r: '4', fill: '#9a5857' }),
        svgEl('circle', { cx: '77', cy: '96', r: '4', fill: '#9a5857' })
    );

    return svgEl(
        'svg',
        { class: 'mascots', viewBox: '0 0 420 180', focusable: 'false', 'aria-hidden': 'true' },
        svgEl('defs', {}, ground),
        svgEl('path', { d: 'M15 180Q205 54 405 180Z', fill: 'url(#ground)' }),
        svgEl('path', { d: 'M102 179Q224 111 335 180Z', fill: '#24452d', opacity: '.78' }),
        svgEl('path', {
            d: 'm71 49 18 19M57 87l21 7m274-42-18 18m27 25-22 7',
            stroke: '#b9fa43',
            'stroke-width': '5',
            'stroke-linecap': 'round',
        }),
        bull,
        cow
    );
}

export function layersIcon(): SVGSVGElement {
    return icon(
        [
            svgEl('path', {
                d: 'M4 15 22 6 40 15 22 24Z M4 26 22 35 40 26',
                fill: 'none',
                stroke: 'currentColor',
                'stroke-width': '3.5',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
            }),
        ],
        '0 0 44 44',
        '44'
    );
}

export function refreshIcon(): SVGSVGElement {
    return icon([
        svgEl('path', {
            d: 'M20 6v5h-5M20 11a8 8 0 1 0 1 5',
            fill: 'none',
            stroke: 'currentColor',
            'stroke-width': '2.5',
            'stroke-linecap': 'round',
            'stroke-linejoin': 'round',
        }),
    ]);
}

export function checkIcon(): SVGSVGElement {
    return icon(
        [
            svgEl('path', {
                d: 'm4 12.5 5.5 5.5L20 6',
                fill: 'none',
                stroke: 'currentColor',
                'stroke-width': '3.5',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
            }),
        ],
        '0 0 24 24',
        '37'
    );
}

export function clockIcon(): SVGSVGElement {
    return icon(
        [
            svgEl('circle', { cx: '12', cy: '12', r: '9', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }),
            svgEl('path', {
                d: 'M12 6v7l4 2',
                fill: 'none',
                stroke: 'currentColor',
                'stroke-width': '2',
                'stroke-linecap': 'round',
            }),
        ],
        '0 0 24 24',
        '28'
    );
}

export function targetIcon(): SVGSVGElement {
    return icon(
        [
            svgEl('circle', { cx: '12', cy: '12', r: '9', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }),
            svgEl('circle', { cx: '12', cy: '12', r: '4', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }),
            svgEl('circle', { cx: '12', cy: '12', r: '1', fill: 'currentColor' }),
        ],
        '0 0 24 24',
        '28'
    );
}

export function historyIcon(): SVGSVGElement {
    return icon(
        [
            svgEl('path', {
                d: 'M3 4v6h6M3 10a9 9 0 1 1 1 5M12 6v6l4 2',
                fill: 'none',
                stroke: 'currentColor',
                'stroke-width': '2',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
            }),
        ],
        '0 0 24 24',
        '34'
    );
}

export function trophyIcon(): SVGSVGElement {
    return icon(
        [
            svgEl('path', {
                d: 'M6 4h12v6c0 5-2.8 8-6 8s-6-3-6-8V4ZM6 7H3v3c0 3 2 4 4 4m11-7h3v3c0 3-2 4-4 4M12 18v3M8 21h8',
                fill: 'none',
                stroke: 'currentColor',
                'stroke-width': '2',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
            }),
        ],
        '0 0 24 24',
        '34'
    );
}
