export class UserModel {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;

    constructor(init?: UserModel) {
        Object.assign(this,init);
    }
}