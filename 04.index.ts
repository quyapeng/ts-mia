/**
 * 属性修饰符
 * 对象类型中的每个属性可以指定两个事项: 类型、属性是否可选以及是否可以将属性写入。
 * 可选用?表示
 */

/**
 * 多继承
 */

interface A {
  name: string;
}
interface B {
  age: number;
}
type C = A & B;
const aa: C = {
  name: "tom",
  age: 1,
};
/**
 * 泛型
 */

/**
 * any 和 unknown
 */

/**
 *
 */

/**
 * ReadonlyArray 只读数组
 * readonly 只读属性
 */

function a(values: readonly string[]) {
  // 只读
}

interface Home {
  readonly resident: { name: string; age: number };
}
// 当前属性不能更改
// 使用映射修饰符，可以删除只读属性

/**
 * 元组类型
 */

// 索引签名

interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = getStringArray();
const secondItem = myArray[1];

// 上面，我们有一个 StringArray 接口，它有一个索引签名。
// 这个索引签名声明当一个 StringArray 被一个数字索引时，它将返回一个字符串。

// 索引签名属性类型必须是“字符串”或“数字”。

// 扩展类型

// 界面与交叉点

// 泛型对象类型

//
