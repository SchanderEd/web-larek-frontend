import { Form } from './common/Form';
import { IEvents } from './base/events';

export class FormOrder extends Form {
	protected _paymentsButtons: NodeList;
	protected _paymentMethod: string;
	protected _address: string;

	constructor(protected container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this._paymentsButtons = container.querySelectorAll('.button_alt');

		this._paymentsButtons.forEach((button: HTMLButtonElement) => {
			button.addEventListener('click', () => {
				this.events.emit('form:payment', {
					paymentMethod: button.dataset.payment,
				});
			});
		});
	}

	set paymentMethod(paymentMethod: string) {
		this._paymentMethod = paymentMethod;

		this._paymentsButtons.forEach((button: HTMLButtonElement) => {
			if (button.dataset.payment === paymentMethod) {
				button.classList.add('button_alt-active');
			} else {
				button.classList.remove('button_alt-active');
			}
		});
	}

	set address(address: string) {
		this._address = address;
	}

	validate() {
		if (!this._paymentMethod) {
			return (this._isValid = false);
		}

		super.validate();
	}
}
