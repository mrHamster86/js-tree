import AbstractView from "./AbstractView";

class NodeEdit extends AbstractView {
  constructor(name, id, isDeleteBtn = false) {
    super();
    this._name = name;
    this._id = id;
    this.isDeleteBtn = isDeleteBtn;
  }

  get template() {
    return `<div class="edit-node">
        <div class="edit-node__content">
            <span class="edit-node__name">${this._name}</span>
            <button type="button" class="edit-node__btn">Rename</button>
            ${this.isDeleteBtn ? `<button type="button" class="edit-node__btn-delete">Delete</button>` : ''}
        </div>
        <div class="edit-node__edit-content hidden">
            <input type="text" class="edit-node__edit-input" value="${this._name}">
            <button type="button" class="edit-node__btn-ok">Ok</button>
            <button type="button" class="edit-node__btn-cancel">Cancel</button>
        </div>
    </div>`
  }

  nodeEditToggle() {
    const content = this.element.querySelector('.edit-node__content');
    const editContent = this.element.querySelector('.edit-node__edit-content');

    content.classList.toggle('hidden');
    editContent.classList.toggle('hidden');
  }

  editClickHandler() {
    this.nodeEditToggle();
  }

  editOkClickHandler(name) { }

  editCancelClickHandler() {
    const input = this.element.querySelector('.edit-node__edit-input');

    input.value = this._name;
    this.nodeEditToggle();
  }

  deleteClickHandler(id) {}

  bind() {
    const btn = this.element.querySelector('.edit-node__btn');
    const btnOk = this.element.querySelector('.edit-node__btn-ok');
    const btnCancel = this.element.querySelector('.edit-node__btn-cancel');
    const btnDelete = this.element.querySelector('.edit-node__btn-delete');

    btn.addEventListener('click', () => this.editClickHandler());
    btnOk.addEventListener('click', () => {
      const name = this.element.querySelector('.edit-node__edit-input').value;
      this.editOkClickHandler(name)
    });
    btnCancel.addEventListener('click', () => this.editCancelClickHandler());
    btnDelete && btnDelete.addEventListener('click', () => {
      this.deleteClickHandler(this._id);
    });
  }
}

export default NodeEdit;