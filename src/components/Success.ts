import { ISuccesOrder } from "../types";
import { Component } from "./base/components";
import { IEvents } from "./base/events";

export class Success extends Component<ISuccesOrder> {
  _amount: number
  amountEl: HTMLSpanElement

  constructor(protected container: HTMLElement, events: IEvents) {
    super(container)

    this.amountEl = container.querySelector('.order-success__description')
  }

  set amount(amount: number) {
    this.amountEl.textContent = `Списано ${String(amount)} синапсов`
  }
}