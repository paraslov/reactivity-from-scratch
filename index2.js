const paint = () => {
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

const data = {
  price: 6000,
  tips: 10,
  persons: 3,
  total: 0,
}

const lunch = new Proxy(data, {
  set(target, key, value) {
    target[key] = value

    if (key === 'price') {
      updateTotal()
    }
  }
})

updateTotal()
paint()
