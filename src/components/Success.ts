import { ISuccesOrder } from '../types';
import { Component } from './base/components';
import { IEvents } from './base/events';

export class Success extends Component<ISuccesOrder> {
	protected _amount: number;
	protected _amountEl: HTMLSpanElement;
	protected _succesCloseBtn: HTMLButtonElement
	events: IEvents

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);

		this.events = events
		this._amountEl = container.querySelector('.order-success__description');
		this._succesCloseBtn = container.querySelector('.order-success__close')

		this._succesCloseBtn.addEventListener('click', () => {
			this.events.emit('success:close')
		})
	}

	set amount(amount: number) {
		this._amountEl.textContent = `Списано ${String(amount)} синапсов`;
	}
}
