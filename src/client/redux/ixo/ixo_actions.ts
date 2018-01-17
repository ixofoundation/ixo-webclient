
export module IXO__CREATE__INIT {
    export var type = 'IXO__CREATE__INIT';
}

export interface IXO__CREATE__INIT {
    hostName: string
}

export module IXO__CREATE__SUCCESS {
    export var type = 'IXO__CREATE__SUCCESS';
}

export interface IXO__CREATE__SUCCESS {
    ixo: any
}

export module IXO__CREATE__FAILURE {
    export var type = 'IXO__CREATE__FAILURE';
}

export interface IXO__CREATE__FAILURE {
    error: Object
}
