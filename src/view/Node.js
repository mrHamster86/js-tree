import AbstractView from "./AbstractView";
import NodeEditView from "./NodeEdit";
import NodeAddView from "./NodeAdd";

class Node extends AbstractView {
  constructor(models) {
    super();
    this._models = models;
    this.renderElements();
    this.renderNodes();
  }

  get models() {
    return this._models;
  }

  get template() {
    return `<li class="node-item" id="${this.models.id}">
        <div class="node-item__edit"></div>
        ${this.models.nodes.length ? `<ul class="node-item__list"></ul>` : ''}
        <div class="node-item__add"></div>
    </li>`
  }

  renderElements() {
    this.nodeEdit = new NodeEditView(this.models.name, this.models.id, true);
    this.nodeAdd = new NodeAddView();

    this.element.querySelector('.node-item__edit').appendChild(this.nodeEdit.element);
    this.element.querySelector('.node-item__add').appendChild(this.nodeAdd.element);
  }

  renderNodes() {
    this.models.nodes && this.models.nodes.forEach((node) => {
      this.element.querySelector('.node-item__list').appendChild(node.element);
    })
  }

  editOkClickHandler(name) {}

  addOkClickHandler(name) {}

  deleteClickHandler(id) {}

  bind() {
    this.nodeEdit.editOkClickHandler = (name) => this.editOkClickHandler(name);
    this.nodeEdit.deleteClickHandler = (id) => this.deleteClickHandler(id);
    this.nodeAdd.addOkClickHandler = (name) => this.addOkClickHandler(name);
  }
}

export default Node;