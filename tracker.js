// iteration 1

// let dep = new Set()
//
// function track() {
//   dep.add(effect)
// }
//
// function trigger() {
//   dep.forEach(effect => effect())
// }
//
// let price = 100
// let tips = 20
// let taxes = 22
// let total = 0
//
// const effect = () => {
//   total = Math.ceil(price * (1 + taxes / 100) + tips)
// }
// track()
// effect()

// iteration 2
// const data = {
//   price: 100,
//   tips: 20,
//   taxes: 22,
//   total: 0,
// }
// const effect = () => {
//   data.total = Math.ceil(data.price * (1 + data.taxes / 100) + data.tips)
// }

// let depsMap = new Map()
//
// function track(key) {
//   let dep = depsMap.get(key)
//
//   if (!dep) {
//     depsMap.set(key, (dep = new Set))
//   }
//
//   dep.add(effect)
// }
//
// function trigger(key) {
//   let dep = depsMap.get(key)
//   if (dep) {
//     dep.forEach(effect => effect())
//   }
// }
//
// track('price')
// effect()

// iteration 3

// const data = {
//   price: 100,
//   tips: 20,
//   taxes: 22,
//   total: 0,
// }
// const effect = () => {
//   data.total = Math.ceil(data.price * (1 + data.taxes / 100) + data.tips)
// }

const targetMap = new WeakMap()
function track(target, key, effect) {
  let depsMap = targetMap.get(target)
  if (!depsMap) targetMap.set(target, (depsMap = new Map()))

  let dep = depsMap.get(key)
  if (!dep) depsMap.set(key, (dep = new Set()))

  dep.add(effect)
}

function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return

  let dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => effect())
  }
}

// track(data, 'price')
//
// effect()
