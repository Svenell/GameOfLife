declare module test {
    export function (testDescription: string, f: Function): void;
}
 
declare module expect {
    export function (amount: number):void;
}
 
declare module ok {
    export function (expression: bool, errormessage: string): void;
}
 
declare module equal {
    export function (actual: Object, expected: Object, message: string): void;
}
 
declare module strictequal {
    export function (actual: Object, expected: Object, message: string): void;
}
 
declare module notequal {
    export function (actual: Object, expected: Object, message: string): void;
}
 
declare module throws {
    export function throws(block: Function, expected: Error, message: string): void;
}

declare module deepEqual {
    export function (actual: Object, expected: Object, message: string): void;
}

declare module notDeepEqual {
    export function (actual: Object, expected: Object, message: string): void;
}
