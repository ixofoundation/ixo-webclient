export interface Dictionary<T> {
	[key: string]: T;
}

export interface Ping {
	jsonrpc: string;
	id: number;
	result: string;
}

export enum StatType {
	decimal = 'DECIMAL',
	fraction = 'FRACTION',
	ixoAmount = 'IXO'
}

export enum contentType {
	overview = 'OVERVIEW',
	dashboard = 'DASHBOARD',
	evaluators = 'EVALUATORS',
	claims = 'CLAIMS',
	newClaim = 'NEW_CLAIM',
	singleClaim = 'SINGLE_CLAIM',
	investors = 'INVESTORS',
	serviceProviders = 'SERVICE_PROVIDERS'
}

export enum AgentRole {
	EA = 'EA',
	SA = 'SA',
	IA = 'IA'
}

export interface Statistic {
	title?: string;
	type: StatType;
	amount: number | [number, number];
	descriptor?: {class: string, value: string | number}[];
}