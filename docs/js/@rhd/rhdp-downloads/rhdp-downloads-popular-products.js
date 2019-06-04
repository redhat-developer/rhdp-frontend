import RHDPDownloadsPopularProduct from './rhdp-downloads-popular-product';
export default class RHDPDownloadsPopularProducts extends HTMLElement {
    constructor() {
        super();
    }
    get productList() {
        return this._productList;
    }
    set productList(value) {
        if (this._productList === value)
            return;
        this._productList = value;
    }
    addProduct(product) {
        var productNode = new RHDPDownloadsPopularProduct();
        productNode.name = product.productName;
        productNode.productId = product.productCode;
        productNode.dataFallbackUrl = product.dataFallbackUrl;
        productNode.downloadUrl = product.downloadLink;
        this.appendChild(productNode);
    }
    renderProductList() {
        if (this.productList.products) {
            let products = this.productList.products;
            let len = products.length;
            for (let i = 0; i < len; i++) {
                if (products[i].featured) {
                    this.addProduct(products[i]);
                }
            }
        }
    }
    connectedCallback() {
        this.renderProductList();
    }
    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
    }
}
window.customElements.define('rhdp-downloads-popular-products', RHDPDownloadsPopularProducts);
