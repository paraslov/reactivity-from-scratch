const render = () => {
  document.getElementById('app').innerHTML = `
    <div>
        <div class="dinner-title">Рассчитать обед:</div>
        <table class="dinner-table">
            <tr>
                <td>Общая стоимость:</td>
                <td>${lunch.price}</td>
            </tr>
            <tr>
                <td>Чаевые (%):</td>
                <td>${lunch.tips}</td>
            </tr>
            <tr>
                <td>Кол-во человек:</td><td>${lunch.persons}</td>
            </tr>
            <tr>
                <td>Стоимость на человека:</td><td>${lunch.total}</td>
            </tr>
        </table>
    </div>
  `
}
const updateTotal = () => lunch.total = Math.ceil(lunch.price * (1 + lunch.tips / 100) / lunch.persons)

const lunch = observe({
  price: 6000,
  tips: 10,
  persons: 3,
  total: 0,
})

let effect = null
const watcher = (callback) => {
  effect = callback
  effect()
  effect = null
}

watcher(updateTotal)
watcher(render)

function observe(data) {
  return new Proxy(data, {
    get(target, key) {
      if (effect) {
        track(target, key, effect)
      }

      return target[key]
    },
    set(target, key, value) {
      target[key] = value

      trigger(target, key)
    }
  })
}


