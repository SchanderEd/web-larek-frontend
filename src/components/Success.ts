import { ISuccesOrder } from '../types';
import { Component } from './base/components';

export class Success extends Component<ISuccesOrder> {
	_amount: number;
	amountEl: HTMLSpanElement;

	constructor(protected container: HTMLElement) {
		super(container);

		this.amountEl = container.querySelector('.order-success__description');
	}

	set amount(amount: number) {
		this.amountEl.textContent = `Списано ${String(amount)} синапсов`;
	}
}
