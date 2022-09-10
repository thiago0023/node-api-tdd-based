import { Appointment } from "../entities/appointment/appointment";
import { AppointmentRepository } from "../repositories/appointments/appointment-repo";

interface CreateAppointmentRequest {
    customer: string;
    startAt: Date;
    endsAt: Date;
}

type CreateAppointmentResponse = Appointment;

export class CreateAppointment {

    constructor (
        private appointmentRepository: AppointmentRepository
    ) {}

    async execute({
        customer,
        startAt,
        endsAt,
    }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
        const overlappingAppointment = await this.appointmentRepository.findOverlappingAppointments(startAt, endsAt);

        if (overlappingAppointment) throw new Error('There is already an appointment at this time');
        
        const appointment = new Appointment({
            customer,
            startAt,
            endsAt,
        });

        await this.appointmentRepository.create(appointment);

        return appointment;
    }

}