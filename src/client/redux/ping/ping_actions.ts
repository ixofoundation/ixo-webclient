import {IPingResult} from "../../../../types/models";

export module PING__CREATE__INIT {
    export var type = 'PING__CREATE__INIT';
}

export interface PING__CREATE__INIT {
  ixo: string
}

export module PING__CREATE__SUCCESS {
    export var type = 'PING__CREATE__SUCCESS';
}

export interface PING__CREATE__SUCCESS {
    pingResult: any
}

export module PING__CREATE__FAILURE {
    export var type = 'PING__CREATE__FAILURE';
}

export interface PING__CREATE__FAILURE {
    pingResult: any,
    error: Object
}
