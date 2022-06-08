import { AppError } from './app-error';

/**
 * Egyik error típus. Akkor jelenik meg, ha valahol rossz Input-ot adunk meg.
 * Még tesztelés alatt
 * @extends {AppError}
 */
export class BadInput extends AppError{
    /**
     * konstruktor
     * @param originalError
     */
    constructor(originalError?: any){
        super(originalError)
    }
}