export module PING__CREATE__INIT {
    export var type = 'PING__CREATE__INIT';
}

export interface PING__CREATE__INIT {
    isResponding: boolean
    responseTime: number
}

export module PING__CREATE__SUCCESS {
    export var type = 'PING__CREATE__SUCCESS';
}

export interface PING__CREATE__SUCCESS {
    result: any
}

export module PING__CREATE__FAILURE {
    export var type = 'PING__CREATE__FAILURE';
}

export interface PING__CREATE__FAILURE {
    error: Object;
}