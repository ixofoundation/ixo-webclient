export interface ActiveProjectResult {
	projectDid: string;
}

export interface ActiveProject {
	projectDid: string;
}

export module SET_ACTIVE_PROJECT {
	export const type = 'SET_ACTIVE_PROJECT';
}

export module CLEAR_ACTIVE_PROJECT {
	export const type = 'CLEAR_ACTIVE_PROJECT';
}