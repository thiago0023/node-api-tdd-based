import { areIntervalsOverlapping } from "date-fns";
import { Appointment } from "../../entities/appointment/appointment";
import { AppointmentRepository } from "./appointment-repo";

export class LocalAppointmentRepository implements AppointmentRepository {
    private appointments: Appointment[] = [];
    
    async create(appointment: Appointment): Promise<void> {
        this.appointments.push(appointment);
    }
    
    async findOverlappingAppointments(startsAt: Date, endsAt: Date): Promise<Appointment | null> {
        const overlappingAppointment = this.appointments.find((appointment) => {
            return areIntervalsOverlapping(
                { start: appointment.startAt, end: appointment.endsAt },
                { start: startsAt, end: endsAt },
                { inclusive: true }
            );
        });

        return overlappingAppointment || null;
    }
}