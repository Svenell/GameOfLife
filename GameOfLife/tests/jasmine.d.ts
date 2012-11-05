declare function describe(suiteName : string, suite : () => void);
declare function xdescribe(suiteName : string, suite : () => void);

declare function it(expectation: string, assertion: () => void );
declare function xit(expectation: string, assertion: () => void );

declare function beforeEach(action: () => void );
declare function afterEach(action: () => void );

interface JasmineMatchers { 
    not: JasmineMatchers;
    toBe(match: any);
    toEqual(match: any);
    toMatch(match: string);
    toBeDefined();
    toBeUndefined();
    toBeNull();
    toBeTruthy();
    toBeFalsy();
    toContain(match : any);
    toBeLessThan(match: number);
    toBeGreaterThan(match: number);
    toBeCloseTo(expected: number, tolerance: number);
}

declare function expect(actual: any): JasmineMatchers;

interface JasmineSpyMatchers {
    not: JasmineSpyMatchers;
    toBeDefined();
    toBeUndefined();
    toHaveBeenCalled();
    toHaveBeenCalledWith(arguments : any[]);
    toThrow();
    toThrow(e: any);
}

interface JasmineSpyOn {
    andCallThrough();
    andReturn(returnValue: any);
    andCallFake(fakeMethod: (any) => any );
}

interface JasmineSpy {
    identity: string;
}

declare function spyOn(object: any, method: string) : JasmineSpyOn;

declare function expect(spy: (any) => any): JasmineSpyMatchers;

declare function expect(spy: JasmineSpy): JasmineSpyMatchers;

module jasmine {
    export declare function createSpy(identity: string) : JasmineSpy;
    export declare function createSpyObj(properties: string[]) :JasmineSpy;
    export declare function any(constraint: any) : any;
    export declare function getEnv(): JasmineEnv;
    export declare var specFilter: (spec: any) => any;

    module Clock {
        export declare function useMock();
        export declare function tick(milliseconds: number);
    }

    export class HtmlReporter {
        constructor ();
        specFilter (spec: any);
    }

    export declare function addReporter(reporter: HtmlReporter);
}

declare function runs(asyncMethod: () => void );
declare function waitsFor(latchMethod: () => bool, failureMessage: string, timeout: number);

interface JasmineEnv {
    updateInterval: number;
    versionString() : string;
    execute(): void;
}