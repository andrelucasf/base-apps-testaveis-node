import { Appointment } from "../entities/appointment";
import { AppointmentsRepository } from "../repositories/appointments-repository";
import { CreateAppointmentRequest } from "./dtos/create-appointment-request";
import { CreateAppointmentResponse } from "./dtos/create-appointment-response";

export class CreateAppointment {
  constructor(private appointmentsRepositoty: AppointmentsRepository) {}

  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlappingAppointment =
      await this.appointmentsRepositoty.findOverlappingAppointment(
        startsAt,
        endsAt
      );

    if (overlappingAppointment) {
      throw new Error("Another appointment overlaps this appointment dates");
    }

    const appointment = new Appointment({
      customer,
      startsAt,
      endsAt,
    });

    await this.appointmentsRepositoty.create(appointment);

    return appointment;
  }
}
