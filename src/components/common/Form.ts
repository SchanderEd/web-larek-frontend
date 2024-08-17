import { IFormOrder } from '../../types';
import { Component } from '../base/components';
import { IEvents } from '../base/events';

export class Form extends Component<IFormOrder> {
	protected _form: HTMLFormElement;
	protected _inputs: NodeList;
	protected _submitButton: HTMLButtonElement;
	protected _emptyElements: HTMLElement[];
	protected _errorField: HTMLSpanElement;
	protected _isValid: boolean;
	events: IEvents;

	constructor(protected container: HTMLFormElement, events: IEvents) {
		super(container);

		this._emptyElements = [];
		this.events = events;
		this._form = container;
		this._inputs = container.querySelectorAll('input');
		this._submitButton = container.querySelector('button[type="submit"]');
		this._errorField = container.querySelector('.form__errors');

		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			events.emit('form:submit');
		});

		this._inputs.forEach((input: HTMLInputElement) => {
			input.addEventListener('input', () => {
				this.events.emit('form:input', {
					name: input.name,
					value: input.value,
				});
			});
		});
	}

	validate() {
		this._inputs.forEach((input: HTMLInputElement) => {
			if (!input.value.length && !this._emptyElements.includes(input)) {
				this._emptyElements.push(input);
				input.classList.add('form__input--invalid');
			}

			if (input.value.length && this._emptyElements.includes(input)) {
				const index = this._emptyElements.indexOf(input);
				this._emptyElements.splice(index, 1);
				input.classList.remove('form__input--invalid');
			}
		});

		if (this._emptyElements.length) {
			this._submitButton.disabled = true;
			this._errorField.textContent = 'Пожалуйста, заполните все поля';
		} else {
			this._submitButton.disabled = false;
			this._errorField.textContent = '';
		}
	}
}
