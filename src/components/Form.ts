import { IFormOrder } from "../types";
import { Component } from "./base/components";
import { IEvents } from "./base/events";

export class Form extends Component<IFormOrder> {
  form: HTMLFormElement
  inputs: NodeList
  submitButton: HTMLButtonElement
  events: IEvents
  errors: string[]

  constructor(protected container: HTMLFormElement, events: IEvents) {
    super(container)

    this.errors = []
    this.events = events
    this.form = container
    this.inputs = container.querySelectorAll('input')
    this.submitButton = container.querySelector('button[type="submit"]')

    this.form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      events.emit('form:submit')
    })

    this.inputs.forEach((input: HTMLInputElement) => {
      input.addEventListener('change', () => {
        this.events.emit('form:input', ({ name: input.name, value: input.value }))
      })
    })
  }

  validate() {
    this.inputs.forEach((input: HTMLInputElement) => {
      if (!input.value.length) {
        if (this.errors.length) {
          return
        }
        this.errors.push(`Поле не может быть пустым`)
      } else {
        this.errors = []
      }
    })

    if (this.errors.length > 0) {
      this.submitButton.disabled = true
    } else {
      this.submitButton.disabled = false
    }

    console.log(this.errors)
  }
}

export class FormOrder extends Form {
  protected _paymentsButtons: NodeList
  protected _paymentMethod: string
  protected _address: string

  constructor(protected container: HTMLFormElement, events: IEvents) {
    super(container, events)

    this._paymentsButtons = container.querySelectorAll('.button_alt')

    this._paymentsButtons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', () => {
        this.events.emit('form:payment', ({ paymentMethod: button.dataset.payment }))
      })
    })
  }

  set paymentMethod(paymentMethod: string) {
    this._paymentMethod = paymentMethod

    this._paymentsButtons.forEach((button: HTMLButtonElement) => {
      if (button.dataset.payment === paymentMethod) {
        button.classList.add('button_alt-active')
      } else {
        button.classList.remove('button_alt-active')
      }
    })
  }

  set address(address: string) {
    this._address = address
  }

  validate() {
    super.validate()

    if (!this._paymentMethod) {
      this.errors.push(`Не выбран способ оплаты`)
    }
  }
}

export class FormContacts extends Form {
  protected _phone: string
  protected _email: string

  constructor(protected container: HTMLFormElement, events: IEvents) {
    super(container, events)
  }

  set phone(phone: string) {
    this._phone = phone
  }

  set email(email: string) {
    this._email = email
  }

  /* checkValidate() {
     if (this._phone && this._email) {
       this.submitButton.disabled = false
     } else {
       this.submitButton.disabled = true
     }
   } */
}