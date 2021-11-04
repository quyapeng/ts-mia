import { isArray } from "./../honor-mi/src/utils/validate";
/***
 * 函数类型表达式
 * 类似于箭头函数
 */
// (x: string) => void 一个带有参数x的函数，x为string,没有返回值。
// 如果未指定参数类型，则他是隐式的any
function greeter(fn: (x: string) => void) {
  fn("hello world");
}
function printx(x: string) {
  console.log(x);
}

greeter(printx);

// 也可以使用类型别名来命名函数类型
type Greet = (x: string) => void;
function greet(x: Greet) {
  ///...
  console.log(x);
}

/**
 * call signatures 呼叫签名
 *
 * **/
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
/**
 * 构造签名
 * js函数可以使用new运算符调用。ts 将这些成为构造函数，因为会创建一个新的对象
 * 你可以通过在调用签名前添加关键字来编写构造new签名
 * **/
type SomeObject = {};
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(c: SomeConstructor) {
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
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
const s = firstElement([1, 2, 3]); // s:number
const n = firstElement(["a", "b"]); // n: string
const u = firstElement([]); // u: undefined
// 通过向Type这个函数添加一个类型参数，并在两个地方使用它，在函数的输入和输出之间建立一个链接
// 当调用他的时候，才会出现一个更具体的类型。
function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func);
}

const p = map(["1", "2", "3"], (n) => parseInt(n));
const pp = map([1, 2], (n) => n);

// function minimumLength<Type extends { length: number }>(
//   obj: Type,
//   minimum: number
// ): Type {
//   if (obj.length >= minimum) {
//     return obj;
//   } else {
//     return { length: minimum }; // error
//   }
// }
// 使用受约束的值
// 指定类型参数
// ts通常可以在泛型调用中让推断出预期的类型参数，但并非总是如此：
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

// const arr = combine([1, 2, 3], ["hello"]); // error 如果一定要这样写，可以手动指定：
const arr1 = combine<number | string>([1, 2, 3], ["hello"]);
// 规则：如果可能，使用类型参数本身，而不是约束他
// 规则： 始终 使用尽可能少的类型参数
// 类型参数应该出现两次
// 类型参数用于多个值的类型。如果类型参数在函数签名中只使用一次，则他与任何内容无关
// 如果一个类型参数只出现在一个位置，强烈重新考虑你是否真的需要他
/**
 * 可选参数
 * 通过  ? 来标记
 */

function x(x?: string) {
  // ...
}
x(); // ok
x("1"); //ok

// 默认参数：
function age(x = 10) {
  //
}
age(1); // ok
age(); // ok
age(undefined); // ok
// 为回调编写函数类型时，切勿编写可选参数，除非打算在不传递该参数的情况下调用该函数

/**
 * 函数重载
 * 一些js函数可以在各种参数计数和类型中调用。例如可以编写一个函数的参数可以时date时间戳，或者年月日三个参数的函数
 * 在ts中，可以通过编写重载签名来指定一个可以以不同方式调用的函数。
 */
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1);

/**
 * 在ts中，可以通过编写重载签名来指定一个可以以不同方式调用的函数。为此，可以编写一些函数签名（通常为两个或者更多）
 * 然后编写函数体。
 * 上面例子中，编写了2个重载，前面两个签名称为重载签名。
 * 然后编写一个具有兼容签名的函数实现。
 * 函数有一个实现签名，但这个签名不能被直接调用，即使写了一个在必须参数后， 带有两个可选参数的函数，也不能用两个参数调用。
 *
 * 从外部看不到实现的签名。编写重载函数时，应始终在函数实现上当有两个或者多个签名。
 * 实现签名还必须与重载签名兼容。
 */

type Typeab = string | number;
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Typeab, b: Typeab) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  console.log("add", a + b);
  return a + b;
}

/**
 * 函数重载
 * 函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。
 * 上面代码中，为add函数提供来多个函数类型定义，从而实现函数的重载，在ts中除了可以重载普通函数之外，还可以重载类中的成员方法
 * 方法重载是指在同一个类中方法同名，参数不同，调用时根据实参的形式，选择与他匹配的方法执行操作的一种技术。
 * （参数不同：参数类型/参数个数/参数先后顺序 不同）
 * 所以类中成员方法满足重载的条件是：在同一类中，方法名相同且参数列表不同。
 */

class Ca {
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: string, b: number): string;
  add(a: number, b: string): string;
  add(a: Typeab, b: Typeab): Typeab {
    if (typeof a === "string" || typeof b === "string") {
      return a.toString() + b.toString();
    }
    console.log("add", a + b);
    return a + b;
  }
}
const c = new Ca();

c.add(1, 2);

/**
 * 当ts编译器处理函数重载的时候，他会查找重载列表，尝试使用第一个重载定义。
 * 如果匹配的话就使用这个，因此在重载的时候，一定要把最精确的定义放在最签名。
 * 另外在Ca类中，add(a: Typeab, b: Typeab){} 并不是重载列表的一部分，因此对于add成员方法来说，
 * 我们只定义了四个重载方法
 */
// 前面四个称为函数签名，后面一个为函数体

// function fx(x: boolean): void;
// // Argument type isn't right
// function fx(x: string): void; // error
// function fx(x: boolean) {
//   // x: boolean | string
//   console.log("fx");
// }
// fx(true);

// 与泛型一样，在使用函数重载的时候也要遵循一些准则，

// 在可能的情况下，始终更喜欢具有联合类型的参数而不是重载。

/**
 * this
 * TypeScript 将this通过代码流分析推断函数中应该包含的内容
 *
 * 注意箭头函数使用场景
 *
 * void
 * void 与undefined 不一样
 *
 * object
 * 是指任何非原始值
 *
 * unknown 表示任何值，类似于any，但更安全。因为对unknown值执行任何操作都是不合法的
 * any 函数体中没有值
 *
 * never
 * 该类型表示从未观察到的值，在返回类型中，这意味着函数抛出一场或终止程序的执行。
 *
 * function
 * 无类型的函数调用，最好避免
 *
 * 剩余参数
 * ...
 *
 * 参数解构
 * */
