// 类型断言
/***
 * 1.类型断言由编译器基础，不影响代码运行行为。因此不存在与类型断言关联的运行时检查。
 * 如果类型断言错误，则不会生成异常或者null
 *
 * 2.typeScript 只允许类型断言转换为更具体或者，更不具体的类型版本
 */
const my = document.getElementById("main") as HTMLCanvasElement;
// 上下等效,下面用于tsx文件中
const myc = <HTMLCanvasElement>document.getElementById("main");
const x = "hello" as number;
/**
 * 在ts中，相比字符串来说，一种更好的方式是使用字符串字面量联合类型：比如一下
 */

type lang = "js" | "ts" | "java";
function setLang(lang: lang) {
  console.log(lang);
}
setLang("js"); // ok 内联形式
let l = "ts";
setLang(l); // error 引用形式
/***
 * 内联形式 ts从函数声明中知道参数的类型为lang类型，字符串字面量'js'可以赋值给该类型，所以正常编译
 * 定义一个变量的时候，ts,必须在赋值的时候推断出类型。即lang变量的类型是string,不是lang
 * 可以改为方式
 *
 */
const l: lang = "js";
setLang(l); // ok

// 或者使用const没告诉类型检查器，lang变量不能更改，此时ts可以为lang变量推断出更精确的类型
// 即 ‘js’字符串字面量类型。
// var 和let都允许改变变量内部的值，而const不允许

interface Options {
  width: number;
}
function configure(x: Options | "auto") {
  // ...
}
configure({ width: 100 });
configure("auto"); // ok
configure("automatic"); // error,需要提前预知的字面量

/**
 * 1.在任意位置增加类型断言来更改推断
 * 2.使用const将整个类型转换为文本类型
 */
const req = { url: "https://example.com", method: "GET" };
handleRequest(req.url, req.method); // error req.method
//在上面的示例中，req.method 被推断为 string，而不是“ GET”。因为代码可以在
// req 的创建和 handleRequest 的调用之间进行计算，handleRequest
// 可以为 req.method 分配一个新字符串，比如“ GUESS”，所以 TypeScript 认为这段代码有错误
const req = { url: "https://example.com", method: "GET" as "GET" };
handleRequest(req.url, req.method as "GET");// m1

const req = {...} as const;// m2
/**
 * null  undefined
 * strickNullCheck 类型收缩
 * **/
function sth(x: string | null) {
  // if(x===null){ // 类型收缩
  //     // do sth
  // }else{
  //     console.log(x.toUpperCase())
  // }
  console.log(x.toUpperCase());
}
/**
 * 类型收窄
 * 常用语处理联合类型变量的场景
 * 1.typeof
 * 根据typeof返回的值进行检查时一种类型保护
 * 但是typeof null 是object
 * 2. 真实性缩小
 * 条件语句中使用 &&  ||  !  !!
 * 3. 平等缩小 
 * ===  !==   ==  != 来缩小类型 
*/

interface Container {
  value: number | null | undefined;
}
 
function multiplyValue(container: Container, factor: number) {
  if (container.value != null) { // 不仅检查是否为null,也减产是否可能未定义
    console.log(container.value);
                           
(property) Container.value: number
    container.value *= factor;
  }
}

/*
4. in
 对象中是否有一个带名称的属性： in
 'name' in obj
**/ 
type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
 
  return animal.fly();
}
/***
 * 5. instanceof
 * 
*/

type Shape = Circle | Square;
 
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape; // never
      return _exhaustiveCheck;
  }
}
Try
