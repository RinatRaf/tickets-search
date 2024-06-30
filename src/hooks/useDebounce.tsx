import { useState, useEffect } from "react";

type DebouncedValue<T> = (value: T, delay: number) => T;

export const useDebounce: DebouncedValue<string> = <T extends string>(
	value: T,
	delay: number
) => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => {
			clearTimeout(timerId);
		};
	}, [delay, value]);

	return debouncedValue;
};
