
export interface IGuestData {
    firstName: string;
    secondName?: string;
    firstLastname: string;
    secondLastname: string;
    birthDate: string;
    gender: string;
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