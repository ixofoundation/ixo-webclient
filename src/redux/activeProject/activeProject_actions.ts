export interface ActiveProjectResult {
	public: Object;
	agents: Object;
}

export interface ActiveProject {
	public: Object;
	agents: Object;
}

export module SET_ACTIVE_PROJECT {
	export const type = 'SET_ACTIVE_PROJECT';
}

export module CLEAR_ACTIVE_PROJECT {
	export const type = 'CLEAR_ACTIVE_PROJECT';
}