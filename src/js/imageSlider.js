export default class imageSlider {
  #currentPosition = 0;

  #slideNumber = 0;

  #slideWidth = 0;

  sliderWrapEl;

  sliderListEl;

  nextBtnEl;

  previousBtnEl;

  indicatorWrapEl;

  constructor() {
    this.assignElement();
    this.initSliderNumber();
    this.initSlideWidth();
    this.initSliderListWidth();
    this.addEvent();
    this.createIndicator();
    this.setIndicator();
  }

  assignElement() {
    this.sliderWrapEl = document.getElementById('slider-wrap');
    this.sliderListEl = this.sliderWrapEl.querySelector('#slider');
    this.nextBtnEl = this.sliderWrapEl.querySelector('#next');
    this.previousBtnEl = this.sliderWrapEl.querySelector('#previous');
    this.indicatorWrapEl = this.sliderWrapEl.querySelector('#indicator-wrap');
  }

  initSliderNumber() {
    this.#slideNumber = this.sliderListEl.querySelectorAll('li').length;
  }

  initSlideWidth() {
    this.#slideWidth = this.sliderListEl.clientWidth;
  }

  initSliderListWidth() {
    this.sliderListEl.style.width = `${this.#slideNumber * this.#slideWidth}px`;
  }

  addEvent() {
    this.nextBtnEl.addEventListener('click', this.moveToRight.bind(this));
    this.previousBtnEl.addEventListener('click', this.moveToLeft.bind(this));
    this.indicatorWrapEl.addEventListener(
      'click',
      this.onClickIndicator.bind(this),
    );
  }

  onClickIndicator(event) {
    const indexPosition = parseInt(event.target.dataset.index);
    if (Number.isInteger(indexPosition)) {
      this.#currentPosition = indexPosition;
      this.sliderListEl.style.left = `-${
        this.#slideWidth * this.#currentPosition
      }px`;
      this.setIndicator();
    }
    // console.log(indexPosition);
  }

  moveToRight() {
    this.#currentPosition += 1;
    // 경계값 0 ~ 6에서 6에서 7로 넘어갈 때 첫번째 슬라이드 display
    if (this.#currentPosition === this.#slideNumber) {
      // currentPosition 넘버가 slideNumber 갯수랑 같아지면 처음 슬라이드로 보여주기
      this.#currentPosition = 0;
    }
    this.sliderListEl.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;
    this.setIndicator();
  }

  moveToLeft() {
    this.#currentPosition -= 1;
    // 0에서 -1로 넘어갈 때 마지막 슬라이드 display
    if (this.#currentPosition === -1) {
      // currentPosition 넘버가 -1 일때,마지막슬라이드(= this.#slideNumber-1) 보여주기
      this.#currentPosition = this.#slideNumber - 1;
    }
    this.sliderListEl.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;
    this.setIndicator();
  }

  // slide indicator 만들어주기
  createIndicator() {
    // DocumentFragment = 여러가지 element 들을 사용할 때 사용되고, 렌더링이 일어나지 않는다. 그래서 결과물은 ul tag 안에 우리가 생성한 여러가지 element (li tags)들이 리스트 만큼 엘리먼트가 추가된다.
    const docFragment = document.createDocumentFragment();
    for (let i = 0; i < this.#slideNumber; i += 1) {
      const li = document.createElement('li');
      li.dataset.index = i;
      docFragment.appendChild(li);
    }
    this.indicatorWrapEl.querySelector('ul').appendChild(docFragment);
  }

  setIndicator() {
    /* 순서
    1. index 에 비활성화 시키기
    2. index 에 따라서 indicator 가 활성화되는 로직 붙이기
    */
    this.indicatorWrapEl.querySelector('li.active')?.classList.remove('active');
    this.indicatorWrapEl
      .querySelector(`ul li:nth-child(${this.#currentPosition + 1})`)
      .classList.add('active');
  }
}
