export interface AppointmentProps {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

export class Appointment {
  private readonly props: AppointmentProps;

  get costumer() {
    return this.props.customer;
  }

  get startAt() {
    return this.props.startsAt;
  }

  get endsAt() {
    return this.props.endsAt;
  }

  constructor(props: AppointmentProps) {
    const { startsAt: startAt, endsAt } = props;

    if (endsAt <= startAt) {
      throw new Error("Invalid end date");
    }

    if (startAt <= new Date()) {
      throw new Error("Invalid start date");
    }

    this.props = props;
  }
}
