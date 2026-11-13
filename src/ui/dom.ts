export type HtmlOptions = {
    className?: string;
    text?: string;
    attributes?: Record<string, string>;
};

export function el<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    options: HtmlOptions = {},
    ...children: Node[]
): HTMLElementTagNameMap[K] {
    const node = document.createElement(tag);

    if (options.className) node.className = options.className;
    if (options.text !== undefined) node.textContent = options.text;

    for (const [name, value] of Object.entries(options.attributes ?? {})) {
        node.setAttribute(name, value);
    }

    node.append(...children);
    return node;
}

const SVG_NS = 'http://www.w3.org/2000/svg';

export function svgEl<K extends keyof SVGElementTagNameMap>(
    tag: K,
    attributes: Record<string, string> = {},
    ...children: Node[]
): SVGElementTagNameMap[K] {
    const node = document.createElementNS(SVG_NS, tag);

    for (const [name, value] of Object.entries(attributes)) {
        node.setAttribute(name, value);
    }

    node.append(...children);
    return node;
}

export function text(value: string): Text {
    return document.createTextNode(value);
}
