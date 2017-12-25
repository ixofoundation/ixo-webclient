export module USER__CREATE__INIT {
    export var type = 'USER__CREATE__INIT';
}

export interface USER__CREATE__INIT {
    username: string
    walletAddress: string
}

export module USER__CREATE__SUCCESS {
    export var type = 'USER__CREATE__SUCCESS';
}

export interface USER__CREATE__SUCCESS {
    result: any
}

export module USER__CREATE__FAILURE {
    export var type = 'USER__CREATE__FAILURE';
}

export interface USER__CREATE__FAILURE {
    error: Object;
}