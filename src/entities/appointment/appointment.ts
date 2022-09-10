interface AppointmentProps {
    customer: string;
    startAt: Date;
    endsAt: Date;
}

export class Appointment {
    private props: AppointmentProps;

    get customer(): string {
        const { customer } = this.props;

        return customer;
    }

    get startAt(): Date {
        const { startAt } = this.props;

        return startAt;
    }

    get endsAt(): Date {
        const { endsAt } = this.props;

        return endsAt;
    }

    constructor(props: AppointmentProps) {
        const { startAt, endsAt } = props;

        if (startAt.getTime() < new Date().getTime()) {
            throw new Error('Start date cannot be before now');
        }

        if (endsAt.getTime() <= startAt.getTime()) {
            throw new Error('End date must be after start date');
        }


        this.props = props;
    }
}