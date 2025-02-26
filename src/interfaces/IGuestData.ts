import { FormControlStatus } from "@angular/forms";
import { Gender } from "../enums/EGender";

export interface IGuestData {
    firstName: string;
    secondName: string;
    firstLastname: string;
    secondLastname: string;
    birthDate: string;
    gender: Gender;
    documentType: string;
    documentNumber: number;
    email: string;
    phoneNumber: string;
}

export interface IEmergencyContactData extends Pick<
        IGuestData, 
        'firstName'|
        'secondName'|
        'firstLastname'|
        'secondLastname'|
        'phoneNumber'
    >{}

export interface GuestDataForm {
    guestData: IGuestData,
    statusForm: FormControlStatus
}