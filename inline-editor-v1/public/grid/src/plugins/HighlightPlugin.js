import { Plugin } from "./Plugin.js";

export class HighlightPlugin extends Plugin {
  init(grid) {
    super.init(grid);

    grid.container.addEventListener("click", e => {
      if (!e.target.classList.contains("cell")) return;
      this.clear();
      e.target.classList.add("highlight");
    });
  }

  clear() {
    document
      .querySelectorAll(".cell.highlight")
      .forEach(c => c.classList.remove("highlight"));
  }
}
