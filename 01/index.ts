/**
 *
 * 类型是描述哪些值可以传递给哪些值fn会崩溃的概念。
 * js只真正提供动态类型是在--运行代码时看看发生什么
 * 另一种方法是使用静态类型系统，在运行之前预测预期的代码。
 *
 * 1. 静态类型检查
 *
 * **/

// function fn(x) {
//   return x.flip();
// }

/**
 * 1. 静态类型检查
 * 理想情况下，我们可以有一个工具来帮助我们在代码运行之前发现这些错误。
 * 这就像typescript 这样的静态类型检查器所做的。
 * 静态类型系统描述当我们运行程序时，我们的值的形状和行为。像ts这样的类型检查器
 * 使用这些信息并告诉我们什么时候有问题。
 * **/
// const message = "hello";
// message(); // 运行之前就会报错，提示类型string无法调用
/**
 * 2.非异常故障
 *  访问对象上不存在的属性，也会提示错误。
 * 静态类型系统必须调用哪些代码应该在其系统中标记为错误，即使他不会立刻抛出有效错误
 * 未调用的函数 ，或者基本逻辑错误
 */
// const user = {
//     name: 'jack',
//     age:19
// }
// user.location // location未定义
// const announcement = "Hello World!";

// announcement.toLocaleLowercase(); // 拼写错误，方法名错误等

/**
 * 3.工具类型
 * 编辑器提供快速修复功能，自动修复错误，重构重新组织代码等待
 *
 * 4.tsc,TypeScript
 * npm install -g typescript
 *
 * tsc hello.ts  TSC编译或转换为春js文件后的ts文件输出。
 * 如果写法有问题，输出成功，但也会报错在控制台
 * tsc -noEmitOnError hello.ts 如果出错，js不会更新
 *
 * 5.发出错误
 * Date类型在js中调用会返回一个字符串，new Date()
 *
 * 6.显示类型
 * 定义好相关的参数类型
 *
 * 7.擦除类型
 * 使用 “use strict”; 严格类型
 *
 * 8.降级
 * ts以es3为目标。es版本过旧， 可以运行 tsc --target es2015 hello.ts 来获得输出为es2015版本的js
 *
 *
 * 9.严格
 * noImplicitAny
 * strictNullChecks
 *
 * 10.any
 *
 *
 * 11.严格的空检查
 */

/**
 *
 * 日常类型
 * string number boolean
 * 数组
 *
 */
let list: number[] = [1, 2, 3];
let list1: Array<number> = [1, 2, 3];
/*
 * any
 * 当不像便携长类型，只为了让ts相信特定的代码没有问题时，any可用
 * noImplicitAny
 * 不指定类型时，ts无法从上下文推断他。编译器通常会默认为any
 * 使用编译器标记noImplicitAny 将任何隐式编辑any为错误
 * 如果需要不检查当前问题使用noImplicitAny标记为false
 **/
let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;

function getFavoriteNumber(): number {
  return 26;
}
// 返回类型注释
const names = ["Alice", "Bob", "Eve"];
 
// Contextual typing for function
names.forEach(function (s) {
  console.log(s.toUppercase());
Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});
 
// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUppercase());
Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
});
// 匿名函数

// 对象类型
function printCoord(pt: { x: number; y: number }) {
    console.log("x value is " + pt.x);
    console.log("y value is " + pt.y);
  }
  printCoord({ x: 3, y: 7 });

  // 可选属性
  function printName(obj: { first: string; last?: string }) {
    // ...
  }
  printName({ first: "Bob" });
  printName({ first: "Alice", last: "Alisson" });
//   联合类型
function printId(id: number | string) {
    console.log("Your ID is: " + id);
  }
  printId(101);
  printId("202");

  // 类型别名 类型别名完全是任何类型的名称
//   type, 也可联合类型
type Point = {
    x: number;
    y: number;
};
   
function printCoord(pt: Point) {
    console.log("x value is " + pt.x);
    console.log("y value is " + pt.y);
}
printCoord({ x: 100, y: 100 });
// 接口
// interface 接口声明是另一种命名对象类型的方法


interface Point {
    x: number;
    y: number;
}
   
function printCoord(pt: Point) {
    console.log("x value is " + pt.x);
    console.log("y value is " + pt.y);
}
   
printCoord({ x: 100, y: 100 });

/**类型别名和接口之间的差异
类型别名和接口非常相似，在很多情况下你可以自由选择它们。几乎所有的功能都在interface中可用type，关键区别在于不能重新打开类型以添加​​新属性与始终可扩展的接口。
类型别名与接口非常相似，在许多情况下您可以在它们之间进行选择。几乎所有的功能都可以在带类型的接口中使用，关键区别在于不能重新打开类型以添加​​新属性和始终可扩展的接口。
 * **/

/**
interface a {
    name: string
}
interface b extends a {
    isB: boolean
}
const bb = getB();
b.name;
b.isB;
*/

type b = a & {
    isB: boolean
}

// interface a{
//     name:string
// }
// interface a {
//     isB: boolean
// }
// interface可以多次定义多次增加，type不可以
// type a{
//     name: string
// }
// type a {
//     age: boolean
// }
// 以上报错