import { Component } from "./base/components"

interface ICatalogContainer {
  catalog: HTMLElement[]
}

export class CatalogContainer extends Component<ICatalogContainer> {
  protected _catalog: HTMLElement

  constructor(protected container: HTMLElement) {
    super(container)
  }

  set catalog(items: HTMLElement[]) {
    this.container.replaceChildren(...items)
  }
}