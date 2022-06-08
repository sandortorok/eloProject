import { AppError } from './app-error';

/**
 * Egyik error típus. Akkor jelenik meg, ha nem találjuk az adatot az adatbázisban.
 * Még tesztelés alatt
 * @extends {AppError}
 */
export class NotFoundError extends AppError{
    /**
     * konstruktor
     * @param originalError 
     */
    constructor(originalError?: any){
        super(originalError)
    }
}