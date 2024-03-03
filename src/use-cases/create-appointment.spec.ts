import { describe, expect, it } from "vitest";
import { CreateAppointment } from "./create-appointment";
import { Appointment } from "../entities/appointment";
import { getFutureDate } from "../tests/utils/get-future-date";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";

describe("Create appointment", () => {
  it("should be able to create an appointment", () => {
    const startsAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-11");

    const appointmentsRepositoty = new InMemoryAppointmentsRepository();
    const sut = new CreateAppointment(appointmentsRepositoty);

    expect(
      sut.execute({ customer: "Dedé", startsAt, endsAt })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it("should not be able to create an appointment with overlapping dates", async () => {
    const startsAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-15");

    const appointmentsRepositoty = new InMemoryAppointmentsRepository();
    const sut = new CreateAppointment(appointmentsRepositoty);

    await sut.execute({
      customer: "João Doe",
      startsAt,
      endsAt,
    });

    expect(
      sut.execute({
        customer: "Dedé",
        startsAt: getFutureDate("2022-08-14"),
        endsAt: getFutureDate("2022-08-18"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      sut.execute({
        customer: "Dedé",
        startsAt: getFutureDate("2022-08-08"),
        endsAt: getFutureDate("2022-08-12"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      sut.execute({
        customer: "Dedé",
        startsAt: getFutureDate("2022-08-08"),
        endsAt: getFutureDate("2022-08-17"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      sut.execute({
        customer: "Dedé",
        startsAt: getFutureDate("2022-08-11"),
        endsAt: getFutureDate("2022-08-12"),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
