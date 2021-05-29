import { v4 as uuid_v4 } from 'uuid';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

// import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository {
  appointments = [];

  async findByDate(
    date,
    provider_id,
  ) {
    const findAppointment = this.appointments.find(
      appointment =>
        isEqual(appointment.date, date) &&
        appointment.provider_id === provider_id,
    );

    return findAppointment;
  }

  async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }) {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }) {
    const appointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointments;
  }

  async create({
    provider_id,
    user_id,
    date,
  }) {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid_v4(), date, provider_id, user_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
