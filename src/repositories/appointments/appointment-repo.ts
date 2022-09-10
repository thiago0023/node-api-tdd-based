import { Appointment } from "../../entities/appointment/appointment";

export interface AppointmentRepository {
    create(appointment: Appointment): Promise<void>;
    findOverlappingAppointments(startsAt: Date, endsAt: Date): Promise<Appointment | null>;
}