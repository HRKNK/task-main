import type { ICurrency } from '../API/types';

export interface InputData {
	value: number;
	selected: ICurrency;
	calculate: () => void;
}
