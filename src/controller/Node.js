import NodeModel from '../models/Node';
import NodeView from '../view/Node';

class Node {
  constructor(node) {
    this.model = new NodeModel(node);
    this.view = new NodeView(this.model);
    this.bind();
  }

  get element() {
    return this.view.element;
  }

  get id() {
    return this.model.id;
  }

  update() {
    const view = new NodeView(this.model);
    const parent = this.view.element.parentNode;
    parent.replaceChild(view.element, this.view.element);
    this.view = view;
    this.bind();
  }

  updateNameHandler(name) {
    this.model.name = name;
    this.update();
  }

  addNodeHandler(name) {
    this.model.addNode(name);
    this.update();
  }

  deleteElementHandler(id) {
    const index = this.model.parent.nodes.findIndex((node) => node.id === id);
    this.model.parent.deleteElementByIndex(index);
  }

  deleteElementByIndex(index) {
    this.model.nodes.splice(index, 1);
    this.update();
  }

  bind() {
    this.view.editOkClickHandler = (name) => this.updateNameHandler(name);
    this.view.addOkClickHandler = (name) => this.addNodeHandler(name);
    this.view.deleteClickHandler = (id) => this.deleteElementHandler(id);
    this.model.deleteElementByIndex = (index) => this.deleteElementByIndex(index)
  }
}

export default Node;