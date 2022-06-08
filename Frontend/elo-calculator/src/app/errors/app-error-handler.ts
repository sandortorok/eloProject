import { ErrorHandler } from "@angular/core";

/**
 * Error Handling class, Tesztelés alatt van még az errorkezelés.
 * Jelenleg csak kiíratjuk az üzenetet.
 * Nincs még használva
 * @implements {ErrorHandler} leszármazik az ErrorHandler osztályból
 */
export class AppErrorHandler implements ErrorHandler{
    /**
     * Implementált Error Handling függvény
     * @param error 
     */
    handleError(error: any): void {
        console.log(error)
    }
}