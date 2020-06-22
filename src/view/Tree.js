import AbstractView from "./AbstractView";
import NodeEditView from "./NodeEdit";
import NodeAddView from "./NodeAdd";

class Tree extends AbstractView {
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
    return `<div class="tree">
        <div class="tree__node-edit"></div>
        ${this.models.nodes.length ? `<ul class="tree__node-list"></ul>` : ''}
        <div class="tree__node-add"></div>
        <div class="tree__file">
            <span>Tree: </span>
            <input type="file" class="tree__file-input hidden" accept=".json">
            <button type="button" class="tree__btn-download">Download</button>
            <button type="button" class="tree__btn-upload">Upload</button>
        </div>
    </div>`;
  }

  renderElements() {
    this.nodeEdit = new NodeEditView(this.models.name);
    this.nodeAdd = new NodeAddView();

    this.element.querySelector('.tree__node-edit').appendChild(this.nodeEdit.element);
    this.element.querySelector('.tree__node-add').appendChild(this.nodeAdd.element);
  }

  renderNodes() {
    this.models.nodes && this.models.nodes.forEach((node) => {
      this.element.querySelector('.tree__node-list').appendChild(node.element);
    })
  }

  uploadClickHandler() {
    const input = this.element.querySelector('.tree__file-input');
    input.click();
  }

  editOkClickHandler(name) {}

  addOkClickHandler(name) {}

  loadendFileHandler(jsonTree) {}

  downloadClickHandler() {}

  inputFileChangeHandler(event) {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    if (file && fileReader) {
      fileReader.addEventListener("loadend", (e) => {
        const jsonTree = e.target.result;
        this.loadendFileHandler(jsonTree);
      });
      fileReader.readAsText(file);
    } else {
      console.error('Upload file error');
    }
  }

  bind() {
    this.nodeEdit.editOkClickHandler = (name) => this.editOkClickHandler(name);
    this.nodeAdd.addOkClickHandler = (name) => this.addOkClickHandler(name);

    const btnDownload = this.element.querySelector('.tree__btn-download');
    const btnUpload = this.element.querySelector('.tree__btn-upload');
    const inputFile = this.element.querySelector('.tree__file-input');

    btnDownload.addEventListener('click', () => this.downloadClickHandler());
    btnUpload.addEventListener('click', () => this.uploadClickHandler());
    inputFile.addEventListener('change', (event) => this.inputFileChangeHandler(event));
  }
}

export default Tree;