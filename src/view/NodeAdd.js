import AbstractView from "./AbstractView";

class NodeAdd extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<div class="add-node">
        <button type="button" class="add-node__btn">Add node</button>
        <div class="add-node__add hidden">
            <input type="text" class="add-node__input" value="" placeholder="Node name">
            <button type="button" class="add-node__btn-ok">Ok</button>
            <button type="button" class="add-node__btn-cancel">Cancel</button>
        </div>
    </div>`
  }

  nodeAddToggle() {
    const btn = this.element.querySelector('.add-node__btn');
    const addNode = this.element.querySelector('.add-node__add');

    btn.classList.toggle('hidden');
    addNode.classList.toggle('hidden');
  }

  addClickHandler() {
    this.nodeAddToggle();
  }

  addCancelClickHandler() {
    const input = this.element.querySelector('.add-node__input');
    input.value = '';
    this.nodeAddToggle();
  }

  addOkClickHandler(name) {}

  bind() {
    const btnAdd = this.element.querySelector('.add-node__btn');
    const btnAddOk = this.element.querySelector('.add-node__btn-ok');
    const btnAddCancel = this.element.querySelector('.add-node__btn-cancel');

    btnAdd.addEventListener('click', () => this.addClickHandler());
    btnAddCancel.addEventListener('click', () => this.addCancelClickHandler());
    btnAddOk.addEventListener('click', () => {
      const name = this.element.querySelector('.add-node__input').value;
      this.addOkClickHandler(name);
    });
  }
}

export default NodeAdd;