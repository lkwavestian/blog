// #region type
/** 基本类型 */
true instanceof Boolean // false
'qianxun' instanceof String // false
1 instanceof Number // false

/** 引用类型 */
function Person(name) {
  this.name = name
}

const p1 = new Person('qianxun')

p1 instanceof Person // true
p1 instanceof Object // true

// 使用 Reflect.setPrototypeOf 修改原型
Reflect.setPrototypeOf(p1, Array.prototype)

p1 instanceof Person // false
p1 instanceof Array // true

// 使用 _proto_ 修改原型
p1.__proto__ = String.prototype

p1 instanceof Person // false
p1 instanceof String // true
// #endregion type

// #region implement
function myInstanceof(left, right) {
  if (typeof left !== 'object' || left === null) return false
  let proto = left.__proto__
  while (proto) {
    if (proto === right.prototype) return true
    proto = proto.__proto__
  }
  return false
}
// #endregion type
