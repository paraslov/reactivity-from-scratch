const render = () => {
  console.log('@> Render')
  document.getElementById('app').innerHTML = `
    <div>
        <div class="dinner-title">Dinner calculator</div>
        <table class="dinner-table">
            <tr>
                <td>Price: </td><td>${dinner.price}</td>
            </tr>
            <tr>
                <td>Tips: </td><td>${dinner.tips}</td>
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

let watchingFn = null

const watcher = (target) => {
  watchingFn = target
  target()
  watchingFn = null
}

function observe(data) {
  const depends = {}

  return new Proxy(data, {
    get(obj, key) {
      if (watchingFn) {
        if (!depends[key]) depends[key] = []
        depends[key].push(watchingFn)
      }

      return obj[key]
    },
    set(obj, key, value) {
      obj[key] = value
      if (depends[key]) {
        depends[key].forEach(cb => cb());
      }
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
  dinner.total = dinner.price * (1 + dinner.taxes / 100) + dinner.tips;
})


watcher(render)
