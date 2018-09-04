export interface runJxa {
    /**
     * Returns a Promise for the value returned from input.
     *
     * @param {string | function} input - .
     * If a function, it's stringified and passed to JXA. It should be atomic, meaning it doesn't access anything outside its body.
     * If a string, you can access the specified arguments with args array. Use the arguments parameter rather than template interpolation so you don't have to do escaping.
     * @param {!Array[any]} args - Arguments to pass to the JXA context. Items should be serializable (JSON.stringify'able).
     * @returns Returns a Promise for the value returned from input.
     */
    (input: string | ((...args:Array<string>) => void), args?: Array<any>):Promise<any>;

    /**
     * Returns the value returned from input.
     *
     * @param {string | function} input - .
     * If a function, it's stringified and passed to JXA. It should be atomic, meaning it doesn't access anything outside its body.
     * If a string, you can access the specified arguments with args array. Use the arguments parameter rather than template interpolation so you don't have to do escaping.
     * @param {!Array[any]} args - Arguments to pass to the JXA context. Items should be serializable (JSON.stringify'able).
     * @returns Returns the value returned from input.
     */
    sync (input: string | ((...args:Array<string>) => void), args?: Array<any>):any;
}
declare const runJxa:runJxa;
export default runJxa;
