export module INIT__WEB3__INIT {
    export var type = 'INIT__WEB3__INIT';
}

export interface INIT__WEB3__INIT {
    ixo: any
}

export module INIT__WEB3__SUCCESS {
    export var type = 'INIT__WEB3__SUCCESS';
}

export interface INIT__WEB3__SUCCESS {
    web3Instance: any
}

export module INIT__WEB3__FAILURE {
    export var type = 'INIT__WEB3__FAILURE';
}

export interface INIT__WEB3__FAILURE {
    error: Object;
}
