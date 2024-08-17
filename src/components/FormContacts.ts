import { Form } from './common/Form';
import { IEvents } from './base/events';

export class FormContacts extends Form {
	protected _phone: string;
	protected _email: string;
	submitButton: HTMLButtonElement;

	constructor(protected container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this.submitButton = container.querySelector('button[type="submit"]');

		this.submitButton.addEventListener('click', () => {
			this.events.emit('form:complete');
		});
	}

	set phone(phone: string) {
		this._phone = phone;
	}

	set email(email: string) {
		this._email = email;
	}
}
