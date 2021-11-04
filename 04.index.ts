/**
 * 属性修饰符？
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
 *
 */

function a(values: readonly string[]) {
  // 只读
}

/**
 * 元组类型
 */

// 索引签名

// 扩展类型

// 界面与交叉点

// 泛型对象类型

//
