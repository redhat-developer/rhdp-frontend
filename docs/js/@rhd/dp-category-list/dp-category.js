var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import PFElement from '../../@patternfly/pfelement/pfelement.js';
export default class DPCategory extends PFElement {
    constructor() {
        super(DPCategory, { delayRender: true });
        this._visible = false;
        this._index = -1;
        this._showList = this._showList.bind(this);
    }
    get html() {
        return `
<style>
:host { 
    grid-column: span 1;
    border-top: 1px solid var(--rhd-blue);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 15px;
    align-items: center;
    background-color: var(--rhd-white, #ffffff);
    position: relative;
    z-index: 1;
}

img, svg { 
    flex: 0 0 60px; 
    padding-right: 24px; 
    height: 60px;   
}

h4 {
    flex: 1 0 auto;
    color: #0066CC;
    font-family: "Overpass", "Open Sans", Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: normal;
    line-height: 21px;
    margin: 0 0 5px 0;
}

:host(:hover), :host([visible]) {
    cursor: pointer;
    color: var(--rhd-blue);
    fill: var(--rhd-blue);
    border-top: 5px solid var(--rhd-blue);
    border-bottom: 5px solid var(--rhd-blue);
}

@media (min-width: 500px) {
    :host, :host(:hover), :host([visible]) {
        flex-direction: column;
        text-align: center; 
        border-top: none;
        border-bottom: none;
        background-color: transparent;
        margin-bottom:30px;
    }

    :host([visible]):after, :host([visible]):before {
        top: 100%;
        left: 50%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
    }
    
    :host([visible]):before {
        border-bottom-color: #CCCCCC;
        border-width: 15px;
        margin-left: -15px;
    }
    :host([visible]):after {
        border-bottom-color: #FFFFFF;
        border-width: 16px;
        margin-left: -16px;
    }
    

    img, svg { flex: 0 0 150px; height: 150px; padding-right: 0; padding-bottom: 15px; }
}

@media (min-width: 800px) {
    :host {
        
    }
}

@media (min-width: 1200px) {
    :host {
        
    }
}
</style>
${this.image && this.image.indexOf('svg') < 0 ? `<img src="${this.image}">` : this.image}
<h4>${this.name}</h4>
<slot></slot>
`;
    }
    static get tag() { return 'dp-category'; }
    get name() { return this._name; }
    set name(val) {
        if (this._name === val)
            return;
        this._name = val;
    }
    get image() { return this._image; }
    set image(val) {
        if (this._image === val)
            return;
        if (!val.match(/\.svg$/)) {
            this._image = val;
        }
        else {
            this._getSVG(val);
        }
    }
    get visible() { return this._visible; }
    set visible(val) {
        val = val !== null && val !== false ? true : false;
        if (this._visible === val)
            return;
        this._visible = val;
        let evt = {
            detail: {
                index: this._getIndex(this)
            },
            bubbles: true,
            composed: true
        };
        this.dispatchEvent(new CustomEvent('dp-category-selected', evt));
        if (this._visible) {
            this.setAttribute('visible', '');
        }
        else {
            this.removeAttribute('visible');
        }
    }
    get index() {
        return this._index;
    }
    set index(val) {
        if (this._index === val)
            return;
        this._index = val;
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', e => {
            e.preventDefault();
            this.visible = !this.visible;
            return false;
        });
        super.render();
    }
    static get observedAttributes() {
        return ['name', 'image', 'visible'];
    }
    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }
    _showList() {
        this.visible = !this.visible;
    }
    _getIndex(node) {
        if (this.index < 0) {
            let i = 1;
            while (node = node.previousElementSibling) {
                if (node.nodeName === 'DP-CATEGORY') {
                    ++i;
                }
            }
            return i;
        }
        else {
            return this.index;
        }
    }
    _getSVG(path) {
        const _super = Object.create(null, {
            render: { get: () => super.render }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield fetch(path);
            const svg = yield resp.text();
            this.image = svg.substring(svg.indexOf('<svg'));
            _super.render.call(this);
        });
    }
}
PFElement.create(DPCategory);
