import { test, expect } from "vitest";
import { Appointment } from "./appointment";
import { getFutureDate } from "./../tests/utils/get-future-date";

test("create an appointment", () => {
  const startsAt = getFutureDate("2022-08-10");
  const endsAt = getFutureDate("2022-08-11");

  const appointment = new Appointment({
    customer: "João Silva",
    startsAt: startsAt,
    endsAt,
  });

  expect(appointment).toBeInstanceOf(Appointment);
  expect(appointment.costumer).toEqual("João Silva");
});

test("cannot create an appointment with end date before start date", () => {
  const startsAt = getFutureDate("2022-08-10");
  const endsAt = getFutureDate("2022-08-09");

  expect(() => {
    return new Appointment({
      customer: "André Lucas",
      startsAt: startsAt,
      endsAt,
    });
  }).toThrow();
});

test("cannot create an appointment with start date before now", () => {
  const startsAt = new Date();
  const endsAt = new Date();

  endsAt.setDate(endsAt.getDate() - 1);
  startsAt.setDate(startsAt.getDate() + 3);

  expect(() => {
    return new Appointment({
      customer: "André Lucas",
      startsAt: startsAt,
      endsAt,
    });
  }).toThrow();
});
