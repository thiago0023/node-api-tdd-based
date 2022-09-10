import { describe, expect, it } from 'vitest'
import { Appointment } from '../entities/appointment/appointment'
import { LocalAppointmentRepository } from '../repositories/appointments/local-appointment-repo'
import { getFutureDate } from '../tests/utils/get-future-date'
import { CreateAppointment } from './create-appointment'

describe('CreateAppointment', () => {
    it('should be able to create an appointment', async () => {
        
        const appointmentsRepository = new LocalAppointmentRepository();
        const createAppointment = new CreateAppointment(appointmentsRepository);
        
        const startAt = getFutureDate('2022-09-10', 1)
        const endsAt = getFutureDate('2022-09-10', 2)
        
        expect(
            createAppointment.execute({
                customer: 'John Doe',
                startAt,
                endsAt,
            })
        ).resolves
            .toBeInstanceOf(Appointment)
    })

    it('should not be able to create an appointment with ovellaping dates', async () => {
        
        const appointmentsRepository = new LocalAppointmentRepository();
        const createAppointment = new CreateAppointment(appointmentsRepository);
        
        const startAt = getFutureDate('2022-09-10', 1)
        const endsAt = getFutureDate('2022-09-13', 1)

        await createAppointment.execute({
            customer: 'John Doe',
            startAt,
            endsAt,
        })
        
        //starts in middle, ends after
        expect(
            createAppointment.execute({
                customer: 'John Doe',
                startAt: getFutureDate('2022-09-11', 1),
                endsAt: getFutureDate('2022-09-15', 1),
            })
        ).rejects
            .toBeInstanceOf(Error)
        
        //starts earlier, ends in middle
        expect(
            createAppointment.execute({
                customer: 'John Doe',
                startAt: getFutureDate('2022-09-08', 1),
                endsAt: getFutureDate('2022-09-11', 1),
            })
        ).rejects
            .toBeInstanceOf(Error)

        //starts earlier, ends after
        expect(
            createAppointment.execute({
                customer: 'John Doe',
                startAt: getFutureDate('2022-09-08', 1),
                endsAt: getFutureDate('2022-09-15', 1),
            })
        ).rejects
            .toBeInstanceOf(Error)
    })
})