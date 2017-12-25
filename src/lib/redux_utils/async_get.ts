export type GetStatus = string;

export class AsyncGetStatus {
    static NONE:GetStatus = 'NONE';
    static FETCHING:GetStatus = 'FETCHING';
    static FETCHED:GetStatus = 'FETCHED';
    static ERROR:GetStatus = 'ERROR';
}

export interface AsyncGet<T> {
    status:GetStatus       // Get Status
    value?:T               // Data that were fetched
    error?:Object          // Error string returned from server or json object with validation errors
}

interface AsyncGetCallbacks<T> {
    none?:() => JSX.Element | JSX.Element[]
    fetching?:() => JSX.Element | JSX.Element[]
    fetched?:(value:T) => JSX.Element | JSX.Element[]
    error?:(error:Object)=> JSX.Element | JSX.Element[]
}

export module AsyncGet {

    export function init(value) {
        return {
            status: AsyncGetStatus.NONE,
            value: value
        }
    }

    /**
     * Helper method for rendering async get values
     * @param asyncGetValue             The async value to render
     * @param callbacks                 Callbacks that render the view depending on the async value's status
     * @param settings                  If settings.renderValueWhileFetching is true it'll render the value while fetching, if false it'll render the fetching() callback
     */
    export function render<T>(asyncGetValue:AsyncGet<T>, callbacks:AsyncGetCallbacks<T>, settings: {renderValueWhileFetching: boolean} = {renderValueWhileFetching: false}): JSX.Element | JSX.Element[] {
        if (settings.renderValueWhileFetching && asyncGetValue.value && callbacks.fetched) {
            // If it has a value, we render it regardless of the status
            return callbacks.fetched(asyncGetValue.value);
        } else if (!settings.renderValueWhileFetching && asyncGetValue.status == AsyncGetStatus.FETCHED && callbacks.fetched) {
            // Render value when status is FETCHED
            return callbacks.fetched(asyncGetValue.value);
        } else if (asyncGetValue.status == AsyncGetStatus.FETCHING && callbacks.fetching) {
            return callbacks.fetching();
        } else if (asyncGetValue.status == AsyncGetStatus.ERROR && callbacks.error) {
            return callbacks.error(asyncGetValue.error);
        } else {
            return callbacks.none ? callbacks.none() : null;
        }
    }

    /**
     * Returns a new AsyncGet based on the given one but with status set to FETCHING
     */
    export function fetching<T>(asyncGetValue: AsyncGet<T>) : AsyncGet<T> {
        const {error, ...asyncGetWithoutError} = asyncGetValue; // get async get without error
        return {
            ...asyncGetWithoutError,
            status: AsyncGetStatus.FETCHING
        }
    }

    /**
     * Returns a new AsyncGet with status FETCHED and with given value (without error)
     * @param asyncGetValue Existing async get
     * @param value         The value to be set
     */
    export function fetched<T>(asyncGetValue: AsyncGet<T>, value: T) : AsyncGet<T> {
        // Note: error field is intentionally missing because we want to remove it
        return {
            status: AsyncGetStatus.FETCHED,
            value
        }
    }

    /**
     * Returns a new AsyncGet with status ERROR (keeps the existing value)
     * @param asyncGetValue     Existing AsyncGet
     * @param error             Error to set
     */
    export function error<T>(asyncGetValue: AsyncGet<T>, error: Object) : AsyncGet<T> {
        return {
            ...asyncGetValue,
            status: AsyncGetStatus.ERROR,
            error
        }
    }

    /**
     * Joins an array of AsyncGet values into a single AsyncGet which gets fulfilled only if all the AsyncGet values
     * are fulfilled (similarly like Promise.all())
     */
    export function all<T1,T2,T3>(asyncGetValues: [AsyncGet<T1>, AsyncGet<T2>, AsyncGet<T3>]) : AsyncGet<[T1,T2, T3]>;
    export function all<T1,T2>(asyncGetValues: [AsyncGet<T1>, AsyncGet<T2>]) : AsyncGet<[T1,T2]>;
    export function all<T>(asyncGetValues: [AsyncGet<T>]) : AsyncGet<[T]> {
        if (asyncGetValues.every(x => x.status == AsyncGetStatus.FETCHED)) {
            // If all of them are fetched then we return a fetched one with all the values
            return {
                status: AsyncGetStatus.FETCHED,
                value: asyncGetValues.map(x => x.value) as any
            }
        } else if (asyncGetValues.some(x => x.status == AsyncGetStatus.ERROR)) {
            // If an error is found we return the error
            return {
                status: AsyncGetStatus.ERROR,
                error: asyncGetValues.filter(x => x.status == AsyncGetStatus.ERROR)[0]
            }
        } else if (asyncGetValues.filter(x => x.status == AsyncGetStatus.FETCHING).length > 0) {
            // If any of them is still fetching we then return the fetching status
            return {
                status: AsyncGetStatus.FETCHING
            }
        } else {
            return {
                status: AsyncGetStatus.NONE
            }
        }
    }

}
