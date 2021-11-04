/**
 *
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
