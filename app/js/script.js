
const goodsSelect = document.querySelectorAll('.goods__select');
const goodsBtn = document.querySelectorAll('.goods__btn');
const goodsAmount = document.querySelectorAll('.goods__amount');

//нажатие кнопки в избранное
goodsSelect.forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('goods__select--active');
  })
})


function countBtn() {
  goodsBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      btn.style.display = 'none';
      let amount = btn.closest('.goods').querySelector('.goods__amount');
      let count = amount.querySelector('.goods__amount-count span');
      count.innerHTML = 1;
      amount.style.display = 'flex';

    })// событие нажатия btn

  }) //перебор goodsBtn

  goodsAmount.forEach((item) => {//перебор блока goodsAmount
    let countBlock = item.querySelector('.goods__amount-count span');
    let countNum = +countBlock.innerText;

    item.addEventListener('click', (e) => {
      if (e.target.dataset.name == 'goods__amount-plus') {
        countNum++;
        countBlock.innerHTML = countNum;
      }
      if (e.target.dataset.name == 'goods__amount-minus') {
        countNum--;
        countBlock.innerHTML = countNum;
        if (countNum <= 0) {
          countNum = 1;
          item.style.display = 'none';
          item.closest('.goods').querySelector('.goods__btn').style.display = 'block';
          countBlock.innerHTML = 1;
        }

      }
    })
  })

}

countBtn();
















