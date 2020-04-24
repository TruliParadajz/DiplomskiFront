import { User } from './user';
import { CalendarEvent } from 'angular-calendar';

export class EventTaskInput {
    id?: number;
    startDt: Date;
    endDt?: Date;
    title: string;
    colour: string;
    resizable?: boolean;
    draggable?: boolean;
    description: string;
    completed: boolean;
    userId?: number;

    /**
     *Constructor
     */
    constructor(id: number,
        startDt: Date,
        endDt: Date,
        title: string,
        colour: string,
        resizable: boolean,
        draggable: boolean,
        userId: number,
        description: string,
        completed: boolean) {
        this.id = id;
        this.startDt = startDt;
        this.endDt = endDt;
        this.title = title;
        this.colour = colour;
        this.resizable = resizable;
        this.draggable = draggable;
        this.userId = userId;
        this.description = description;
        this.completed = completed;
    }
}