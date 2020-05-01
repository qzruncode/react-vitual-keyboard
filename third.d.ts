declare module '*.md';
declare module '*.htm';
declare const VERSION:string;
declare module 'whatwg-fetch';
declare module '*.svg';
declare module '*.css' {
    const content: any;
    export default content;
}
declare module '*.scss' {
    const content: any;
    export default content;
}