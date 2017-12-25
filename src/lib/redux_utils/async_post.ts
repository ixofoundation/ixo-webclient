import {IDictionary} from "../../../types/models";

export type PostStatus = string;

export interface AsyncPost<S, R> {
    status:PostStatus       // Post status
    requestData?:S          // Data to be sent to the server
    responseData?:R         // Response data (usually in json format)
    error?:Object           // Error object returned from server (might include validation errors)
}

export class AsyncPostStatus {
    static NONE:PostStatus = 'NONE';
    static POSTING:PostStatus = 'POSTING';
    static POSTED:PostStatus = 'POSTED';
    static ERROR:PostStatus = 'ERROR';
}

export interface AsyncPostValueCallbacks<T> {
    none?:() => JSX.Element
    posting?:() => JSX.Element
    posted?:(value:T) => JSX.Element
    error?:(error:Object) => JSX.Element
}

export module AsyncPost {

    export function init(value) {
        return {
            status: AsyncPostStatus.NONE,
            requestData: value
        }
    }

    /**
     * Helper method for rendering async post values
     * @param asyncPostValue    The async post value to render
     * @param callbacks         Callbacks that render the view depending on the async value's status
     */
    export function render<T>(asyncPostValue:AsyncPost<T, any>, callbacks:AsyncPostValueCallbacks<T>):JSX.Element {
        if (asyncPostValue.status == AsyncPostStatus.POSTED && callbacks.posted) {
            return callbacks.posted(asyncPostValue.requestData);
        } else if (asyncPostValue.status == AsyncPostStatus.POSTING && callbacks.posting) {
            return callbacks.posting();
        } else if (asyncPostValue.status == AsyncPostStatus.ERROR && callbacks.error) {
            return callbacks.error(asyncPostValue.error);
        } else {
            return callbacks.none ? callbacks.none() : null;
        }
    }

    /**
     * Helper method that converts the error message to an array of errors
     */
    export function getArrayOfErrors(errors: IDictionary<string[]> | string) : string[] {
        if (typeof errors === 'string') {
            return [errors];
        } else {
            return Object.keys(errors).map((k) => errors[k]).reduce((a, b) => a.concat(b), []);
        }
    }

    /**
     * Returns a new AsyncPost with status POSTING and sets the given post requestData
     * @param asyncPostValue    Existing async post
     * @param requestData       Data we are posting
     */
    export function posting<S,R>(asyncPostValue: AsyncPost<S,R>, requestData: S, keepResponseData: boolean = true) : AsyncPost<S,R> {
        const {error, ...asyncPostWithoutError} = asyncPostValue; // get async post without error
        if (keepResponseData) {
            return {
                ...asyncPostWithoutError,
                status: AsyncPostStatus.POSTING,
                requestData
            }
        } else {
            const {responseData, ...asyncPost} = asyncPostWithoutError; // get object without responseData
            return {
                ...asyncPost,
                status: AsyncPostStatus.POSTING,
                requestData
            };
        }
    }

    /**
     * Returns a new AsyncPost with status POSTED and sets the response requestData we got from the server
     * @param asyncPostValue    Existing async post
     * @param responseData      Data we received from the server
     */
    export function posted<S,R>(asyncPostValue: AsyncPost<S,R>, responseData: R) : AsyncPost<S,R> {
        // Note: error field is intentionally missing because we want to remove it
        return {
            status: AsyncPostStatus.POSTED,
            requestData: asyncPostValue.requestData,
            responseData
        }
    }

    /**
     * Returns a new AsyncPost with status ERROR and sets the error field (all the rest remain the same)
     * @param asyncPostValue
     * @param error
     * @returns {{status: PostStatus, error: Object}}
     */
    export function error<S,R>(asyncPostValue: AsyncPost<S,R>, error: Object) : AsyncPost<S,R> {
        return {
            ...asyncPostValue,
            status: AsyncPostStatus.ERROR,
            error
        }
    }
}
