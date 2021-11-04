/***
 * 函数类型表达式
 * 类似于箭头函数
 */
// (x: string) => void 一个带有参数x的函数，x为string,没有返回值。
// 如果未指定参数类型，则他是隐式的any
function greeter(fn) {
    fn("hello world");
}
function printx(x) {
    console.log(x);
}
greeter(printx);
function greet(x) {
    ///...
    console.log(x);
}
function doSomething(fn) {
    console.log(fn.description + " returned " + fn(6));
}
function fn(c) {
    return new c("hello");
}
// js的Date对象，可以使用或者不使用new.可以任意组合相同类型的调用和构造签名
/**
 * 通用函数
 * 编写一个函数，其中输入的类型与输出的类型相关，或者两个输入的类型以某种方式相关。
 * 如果函数返回数组元素的类型会更好
 */
// 在ts中，当我们想要描述两个值直接的对应关系时，会使用泛型。
// 通过在函数签名中声明一个类型参数来做到这一点
function firstElement(arr) {
    return arr[0];
}
var s = firstElement([1, 2, 3]); // s:number
var n = firstElement(["a", "b"]); // n: string
var u = firstElement([]); // u: undefined
// 通过向Type这个函数添加一个类型参数，并在两个地方使用它，在函数的输入和输出之间建立一个链接
// 当调用他的时候，才会出现一个更具体的类型。
function map(arr, func) {
    //
    console.log(arr, func);
    return arr.map(func);
}
