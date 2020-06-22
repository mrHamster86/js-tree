import NodeController from '../controller/Node';

class Tree {
  constructor(name = 'Root') {
    this._name = name.trim();
    this.nodes = [];
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name.trim() || 'Unnamed tree';
  }

  get json() {
    return JSON.stringify(this.jsonObject)
  }

  get jsonObject() {
    return {
      name: this.name,
      nodes: this.nodes.map((node) => node.model.jsonObject),
    };
  }

  upload(jsonTree) {
    const tree = JSON.parse(jsonTree);
    this.name = tree.name;
    this.nodes = [];

    tree.nodes.forEach((node) => {
      const Node = new NodeController({...node, parent: this});
      this.nodes.push(Node);
    })
  }

  addNode(name) {
    this.nodes.push(new NodeController({name, parent: this}))
  }

  deleteElementByIndex(index) {}
}

export default Tree;