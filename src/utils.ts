export function formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

export function generateRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomArray(length: number, min: number, max: number): number[] {
    const result = new Set<number>();
    while (result.size < length) {
        result.add(generateRandomNumber(min, max));
    }
    return Array.from(result);
}

export function getRandomFromArray<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

export const COLORS = ['#4db8ec', '#f28e37', '#8e3dcb', '#94c94d', '#fc73b0'];
export const CLASSES = ["scaling", "fading", "rotating"];