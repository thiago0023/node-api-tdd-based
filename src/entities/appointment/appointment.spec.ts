import { expect, test } from 'vitest'
import { getFutureDate } from '../../tests/utils/get-future-date'
import { Appointment } from './appointment'

test('create an appointment', () => {
    const startAt = getFutureDate('2022-09-10', 1)
    const endsAt = getFutureDate('2022-09-10', 2)
    
    const appointment = new Appointment({
        customer: 'John Doe',
        startAt,
        endsAt,
    })

    expect(appointment).toBeInstanceOf(Appointment)
    expect(appointment.customer).toBe('John Doe')
    expect(appointment.startAt).toBeInstanceOf(Date)
    expect(appointment.endsAt).toBeInstanceOf(Date)
})

test('cannot create an appointment with end date before start date', () => {
    const startAt = getFutureDate('2022-09-10', 2);
    const endsAt = getFutureDate('2022-09-10', 1);

    expect(() => new Appointment({
        customer: 'John Doe',
        startAt,
        endsAt,
    })).toThrow()
})

test('cannot create an appointment with start date before now', () => {
    const startAt = getFutureDate('2022-09-10', -1);
    const endsAt =getFutureDate('2022-09-10', 1);

    expect(() => new Appointment({
        customer: 'John Doe',
        startAt,
        endsAt,
    })).toThrow()
})