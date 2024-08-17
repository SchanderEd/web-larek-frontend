import { IFormOrder } from '../../types';
import { Component } from '../base/components';
import { IEvents } from '../base/events';

export class Form extends Component<IFormOrder> {
	form: HTMLFormElement;
	inputs: NodeList;
	submitButton: HTMLButtonElement;
	events: IEvents;
	emptyElements: HTMLElement[];
	errorField: HTMLSpanElement;
	_isValid: boolean;

	constructor(protected container: HTMLFormElement, events: IEvents) {
		super(container);

		this.emptyElements = [];
		this.events = events;
		this.form = container;
		this.inputs = container.querySelectorAll('input');
		this.submitButton = container.querySelector('button[type="submit"]');
		this.errorField = container.querySelector('.form__errors');

		this.form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			events.emit('form:submit');
		});

		this.inputs.forEach((input: HTMLInputElement) => {
			input.addEventListener('input', () => {
				this.events.emit('form:input', {
					name: input.name,
					value: input.value,
				});
			});
		});
	}

	validate() {
		this.inputs.forEach((input: HTMLInputElement) => {
			if (!input.value.length && !this.emptyElements.includes(input)) {
				this.emptyElements.push(input);
				input.classList.add('form__input--invalid');
			}

			if (input.value.length && this.emptyElements.includes(input)) {
				const index = this.emptyElements.indexOf(input);
				this.emptyElements.splice(index, 1);
				input.classList.remove('form__input--invalid');
			}
		});

		if (this.emptyElements.length) {
			this.submitButton.disabled = true;
			this.errorField.textContent = 'Пожалуйста, заполните все поля';
		} else {
			this.submitButton.disabled = false;
			this.errorField.textContent = '';
		}
	}
}
