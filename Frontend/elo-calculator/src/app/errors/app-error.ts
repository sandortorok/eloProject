

/**
 * Innen származnak le a különféle errorok. Fő error típus
 */
export class AppError{
    /**
     * konstruktor
     * @param originalError eredeti error
     */
    constructor(public originalError?: any){

    }
}