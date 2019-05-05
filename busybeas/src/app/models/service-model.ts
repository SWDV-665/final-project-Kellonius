export class ServiceModel {
    id: number;
    serviceName: string;
    serviceDescription: string;
    pricePerHour: number;
}

export class ServiceRequestModel {
    id: number;
    serviceName: string;
    date: string;
    fulfilled: boolean;
    hoursTaken: number;
    pricePerHour: number;
}