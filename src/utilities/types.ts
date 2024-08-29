export interface Operation {
    symbol: string;
    precedence: number;
    associativity: 'left' | 'right';
    perform: (a: number, b?: number) => number;
}
