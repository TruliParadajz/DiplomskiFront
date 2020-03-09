import { User } from './user';

export class eventTaskInput {
    id?: number;
    startDt: Date;
    endDt?: Date;
    title: string;
    colour: string;
    resizable?: boolean;
    draggable?: boolean;
    userId?: number;
    user: User;

    /**
     *Constructor
     */
    constructor() {
        this.id = null;
        this.startDt = new Date();
        this.endDt = new Date();
        this.title = null;                ;
        this.colour = null;
        this.resizable = null;
        this.draggable = null;
        this.userId = null;
        this.user = new User;
    }
}