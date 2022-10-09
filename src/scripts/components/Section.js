export class Section {
  constructor({ items, renderer }, containerSelector) {
    this.itemList = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this.itemList.forEach((item) => {
      this._renderer(item);
    });
  }

  /** for 1 card */
  addNewItem(element) {
    this._container.prepend(element);
  }

  /** for list of cards */
  addItem(element) {
    this._container.append(element);
  }
}
