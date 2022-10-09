export class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(itemList) {
    itemList.forEach((item) => {
      this._renderer(item);
    });
  }

  /** for 1 card */
  addToBegin(element) {
    this._container.prepend(element);
  }

  /** for list of cards */
  addToEnd(element) {
    this._container.append(element);
  }
}
