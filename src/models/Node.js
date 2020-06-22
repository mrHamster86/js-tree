import NodeController from "../controller/Node";

class Node {
  constructor({id, name, parent, nodes}) {
    this._id = id || Node.getId();
    this._name = name.trim() || 'Unnamed node';
    this.parent = parent;
    this.nodes = nodes ? this.upload(nodes) : [];
  }

  static getId() {
    return 'xxxx-xxxx-xxxx-xxxx'.replace( /[xy]/g, function ( c ) {
      const r = Math.random() * 16 | 0;
      return ( c == 'x' ? r : ( r & 0x3 | 0x8 ) ).toString( 16 );
    });
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  set name(name) {
    this._name = name.trim() || 'Unnamed node';
  }

  get jsonObject() {
    return {
      id: this.id,
      name: this.name,
      parent: this.parent.id || 'Tree',
      nodes: this.nodes ? this.nodes.map((node) => node.model.jsonObject) : [],
    };
  }

  upload(nodes) {
    return nodes.map(({name, nodes}) => {
      return new NodeController({name, nodes, parent: this});
    });
  }

  addNode(name) {
    this.nodes.push(new NodeController({name, parent: this}))
  }

  deleteElementByIndex(index) {}
}

export default Node;