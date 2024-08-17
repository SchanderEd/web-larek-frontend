import { Form } from "./common/Form"
import { IEvents } from "./base/events"

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
}