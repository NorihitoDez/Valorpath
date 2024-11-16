export class CancelledAppointmentsDTO{
    idAppointment: number = 0;
    appointmentDate: Date = new Date(Date.now());
    name: string = "";
    status: string = "";
    psychologyLastname: string = "";
    veteranLastname: string = "";
}