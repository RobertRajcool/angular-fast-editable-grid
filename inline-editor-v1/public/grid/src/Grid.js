import { Viewport } from './Viewport.js';
import { Renderer } from './Renderer.js';
import { HeaderRenderer } from './HeaderRenderer.js';

export class Grid {
  constructor(container, { columns, data, rowHeight = 32 }) {
    this.container = container;
    this.columns = columns;
    this.data = data;

    container.className = 'grid-container';
    container.innerHTML = '';

    this.inner = document.createElement('div');
    this.inner.className = 'grid-inner';

    container.appendChild(this.inner);

    this.viewport = new Viewport(container, columns, rowHeight);
    this.header = new HeaderRenderer(this.inner, columns, this.viewport);
    this.renderer = new Renderer(this.inner, columns, data, this.viewport);

    this._bind();
    this.render();
  }

  _bind() {
    this.container.addEventListener('scroll', () =>
      requestAnimationFrame(() => this.render())
    );
  }

  render() {
    this.header.render();
    this.renderer.render();
  }
}
