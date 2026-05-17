//Building Block
/**
 * @typedef {null} Zero
 *//**
 * @template T
 * @typedef {{ succ: T }} Succ
 */

//Type Operations
/**
 * @template {Zero|Succ<any>} A
 * @template {Zero|Succ<any>} B
 * @typedef {A extends Zero ? B : A extends Succ<infer Prev> ? Succ<TypeAdd<Prev, B>> : never} TypeAdd
 *//**
 * @template {Zero|Succ<any>} A
 * @template {Zero|Succ<any>} B
 * @typedef {B extends Zero ? Zero : B extends Succ<infer Prev> ? TypeAdd<A, TypeMul<A, Prev>> : never} TypeMul
 *//**
 * @template {Zero|Succ<any>} A
 * @template {Zero|Succ<any>} B
 * @typedef {B extends Zero ? Succ<Zero> : B extends Succ<infer Prev> ? TypeMul<A, TypePow<A, Prev>> : never} TypePow
 *//**
 * @template {Zero|Succ<any>} A
 * @template {Zero|Succ<any>} B
 * @typedef {B extends Zero ? A : A extends Succ<infer PrevA> ? B extends Succ<infer PrevB> ? TypeSub<PrevA, PrevB> : never : never} TypeSub
 *//**
 * @template {Zero|Succ<any>} N
 * @typedef {N extends Zero ? Succ<Zero> : N extends Succ<infer Prev> ? TypeMul<N, TypeFact<Prev>> : never} TypeFact
 */

//ToNum
/**
 * @template {Zero|Succ<any>} N
 * @template {any[]} Acc
 * @typedef {N extends Zero ? Acc['length'] : N extends Succ<infer Prev> ? ToNumR<Prev, [...Acc, 1]> : never} ToNumR
 *//**
 * @template {Zero|Succ<any>} N
 * @typedef {ToNumR<N, []>} ToNum
 */

//ToType
/**
 * @template {number} N
 * @template {any[]} Acc
 * @typedef {Acc['length'] extends N ? Acc : BuildTuple<N, [...Acc, 1]>} BuildTuple
 *//**
 * @template {any[]} T
 * @typedef {T extends [] ? Zero : T extends [any, ...infer Rest] ? Succ<ArrToSucc<Rest>> : never} ArrToSucc
 *//**
 * @template {number} N
 * @typedef {ArrToSucc<BuildTuple<N, []>>} ToType
 */

//NumOps
/**
 * @template {number} A
 * @template {number} B
 * @typedef {ToNum<TypeAdd<ToType<A>, ToType<B>>>} Add
 *//**
 * @template {number} A
 * @template {number} B
 * @typedef {ToNum<TypeMul<ToType<A>, ToType<B>>>} Mul
 *//**
 * @template {number} A
 * @template {number} B
 * @typedef {ToNum<TypePow<ToType<A>, ToType<B>>>} Pow
 *//**
 * @template {number} A
 * @template {number} B
 * @typedef {ToNum<TypeSub<ToType<A>, ToType<B>>>} Sub
 *//**
 * @template {number} N
 * @typedef {ToNum<TypeFact<ToType<N>>>} Fact
 */

/** @type {Add<3, 3>} */
var Num_1  // 6

/** @type {Mul<3, 4>} */
var Num_2 // 12

/** @type {Fact<5>} */
var Num_3  // 120

Num_
//edit that to see its answers
