const render = () => {
  console.log('@> Render')
  document.getElementById('app').innerHTML = `
    <div>
        <table class="dinner-table">
            <tr>
                <td style="border: none"><b>Dinner</b></td>
            </tr>
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
                <td>Total: </td><td>${total}</td>
            </tr>
        </table>
    </div>
  `
}
console.log('@> index.js')

const dinner = {
  price: 100,
  tips: 10,
  taxes: 22,
}

const total = dinner.price * (1 + dinner.taxes / 100) + dinner.tips

render()
