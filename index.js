const render = () => {
  console.log('@> Render')
  document.getElementById('app').innerHTML = `
    <div>
        <div class="dinner-title">Dinner calculator</div>
        <table class="dinner-table">
            <tr>
                <td>Price: </td>
                <td>${dinner.price}</td>
                <td>
                    <button @click="incrementPrice">+</button>
                    <button @click="decrementPrice">-</button>
                </td>
            </tr>
            <tr>
                <td>Tips: </td>
                <td>${dinner.tips}</td>
                <td>
                    <button @click="incrementTips">+</button>
                    <button @click="decrementTips">-</button>
                </td>
            </tr>
            <tr>
                <td>Taxes: </td><td>${dinner.taxes}</td>
            </tr>
            <tr>
                <td>Total: </td><td>${dinner.total}</td>
            </tr>
        </table>
    </div>
  `
}

let effect = null

const watcher = (target) => {
  effect = target
  target()
  effect = null
}

function observe(data) {
  return new Proxy(data, {
    get(obj, key) {
      if (effect) {
        track(obj, key, effect)
      }

      return obj[key]
    },
    set(obj, key, value) {
      obj[key] = value
      trigger(obj, key)
    }
  })
}

let dinner = observe({
  price: 100,
  tips: 10,
  taxes: 22,
  total: 0,
})

watcher(() => {
  dinner.total = Math.ceil(dinner.price * (1 + dinner.taxes / 100) + dinner.tips)
})


watcher(render)

const methods = {
  incrementPrice() {
    dinner.price++
  },
  decrementPrice() {
    dinner.price--
  },
  incrementTips() {
    dinner.tips++
  },
  decrementTips() {
    dinner.tips--
  },
}

document.getElementById('app')
  .addEventListener('click', event => {
    const clickAttr = event.target.attributes['@click']
    const methodName = clickAttr && clickAttr.value
    const method = methods[methodName]

    if (method) {
      method()
    }
  })
