import TreeModels from "../models/Tree";
import TreeView from "../view/Tree";

class Tree {
  constructor(root) {
    this.model = new TreeModels();
    this.view = new TreeView(this.model);
    this.root = root;
    this.bind();
  }

  get element() {
    return this.view.element;
  }

  update() {
    const view = new TreeView(this.model);
    this.root.replaceChild(view.element, this.view.element);
    this.view = view;
    this.bind();
  }

  loadendFileHandler(jsonTree) {
    this.model.upload(jsonTree);
    this.update();
  }

  updateNameHandler(name) {
    this.model.name = name;
    this.update();
  }

  addNodeHandler(name) {
    this.model.addNode(name);
    this.update();
  }

  deleteElementByIndex(index) {
    this.model.nodes.splice(index, 1);
    this.update();
  }

  downloadHandler() {
    const link = document.createElement('a');
    const blob = new Blob([this.model.json], {type : 'application/json'});

    link.download = 'tree.json';
    link.href = URL.createObjectURL(blob);
    link.click();
  }

  bind() {
    this.view.editOkClickHandler = (name) => this.updateNameHandler(name);
    this.view.addOkClickHandler = (name) => this.addNodeHandler(name);
    this.view.loadendFileHandler = (jsonTree) => this.loadendFileHandler(jsonTree);
    this.view.downloadClickHandler = () => this.downloadHandler();
    this.model.deleteElementByIndex = (index) => this.deleteElementByIndex(index);
  }
}

export default Tree;