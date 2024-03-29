import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Localstorage {

    constructor() { }

    set(key: string, data: any): void {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving', e);
        }
    }

    get(): any {
        return JSON.parse(localStorage.getItem('usuario')!);
    }

    remove(key: string): void {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Error removing key', e);
        }
    }

    clear(): void {
        try {
            localStorage.clear();
        } catch (e) {
            console.error('Error cleaning localstorage', e);
        }
    }
}