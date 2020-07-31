class Pang {
	constructor(pangNum) {
		this.pangNum = Math.floor(pangNum) || 10;
		// this.cellNum = this.pangNum * 10;	// 格数
		this.cellNum = 100
		// this.xLabel = this.pangNum;
		// this.yLabel = this.pangNum;
		this.xLabel = 10;
		this.yLabel = 10;
		this.isPress = false;
		this.mainEle = document.querySelector('.main');
		this.mask = document.querySelector('.mask');
		this.curClick = undefined;
		this.init();

	}
	init() {
		let arr = [];
		for (let i = 0; i < this.cellNum; i++) {
			let x = parseInt(i / this.xLabel);
			let y = i % this.xLabel;
			arr.push('<div class="item" data-positionx=' + x + ' data-positiony=' + y + '></div>')
		}
		this.mainEle.innerHTML = arr.join('');
		this.creatPang();
		this.creatNum();
		this.loadEvent();
	}
	creatPang() {
		this.pangPostion = new Array(this.pangNum);
		for (let i = 0; i < this.pangNum; i++) {
			let flag;
			let position;
			do {
				flag = false;
				position = this.creatRandPang();
				// position.x = parseInt(position.x)
				// position.y = parseInt(position.y)
				for (let j = 0; j < i; j++) {
					if (this.pangPostion[j].x == position.x && this.pangPostion[j].y == position.y) {
						flag = true;
						break;
					}
				}
			} while (flag)
			this.pangPostion[i] = position;
		}
		// console.log(this.pangPostion);
		for (let j = 0; j < this.pangPostion.length; j++) {
			this.drawPoint(this.pangPostion[j].x, this.pangPostion[j].y);
		}
	}
	creatRandPang() {
		let position = {
			// x: Math.random() * this.pangNum,
			// y: Math.random() * this.pangNum
			x: Math.floor(Math.random() * this.xLabel),
			y: Math.floor(Math.random() * this.yLabel)
		}
		return position;
	}
	drawPoint(x, y) {
		// console.log(x,y)
		let index = this.xLabel * x + y;
		document.getElementsByClassName('item')[index].classList.add('pang');
		document.getElementsByClassName('item')[index].innerHTML = 'P';
	}
	creatNum() {
		let itemLength = this.cellNum;
		for (let i = 0; i < itemLength; i++) {
			let x = Math.floor(i / this.xLabel);
			let y = i % this.xLabel;
			let num = 0;
			if (x > 0) {
				if (x < this.xLabel - 1) {
					if (y > 0) {
						if (y < this.yLabel - 1) {
							this.checkPang(x - 1, y - 1) && num++;
							this.checkPang(x - 1, y) && num++;
							this.checkPang(x - 1, y + 1) && num++;
							this.checkPang(x, y - 1) && num++;
							this.checkPang(x, y) && num++;
							this.checkPang(x, y + 1) && num++;
							this.checkPang(x + 1, y - 1) && num++;
							this.checkPang(x + 1, y) && num++;
							this.checkPang(x + 1, y + 1) && num++;
						} else {
							this.checkPang(x - 1, y - 1) && num++;
							this.checkPang(x - 1, y) && num++;
							this.checkPang(x, y - 1) && num++;
							this.checkPang(x, y) && num++;
						}
					} else {
						this.checkPang(x - 1, y) && num++;
						this.checkPang(x - 1, y + 1) && num++;
						this.checkPang(x, y) && num++;
						this.checkPang(x, y + 1) && num++;
						this.checkPang(x + 1, y) && num++;
						this.checkPang(x + 1, y + 1) && num++;
					}
				} else {
					if (y > 0) {
						if (y < this.yLabel - 1) {
							this.checkPang(x - 1, y - 1) && num++;
							this.checkPang(x - 1, y) && num++;
							this.checkPang(x - 1, y + 1) && num++;
							this.checkPang(x, y - 1) && num++;
							this.checkPang(x, y) && num++;
							this.checkPang(x, y + 1) && num++;
						} else {
							this.checkPang(x - 1, y - 1) && num++;
							this.checkPang(x - 1, y) && num++;
							this.checkPang(x, y - 1) && num++;
							this.checkPang(x, y) && num++;
						}
					} else {
						this.checkPang(x - 1, y + 1) && num++;
						this.checkPang(x - 1, y) && num++;
						this.checkPang(x, y + 1) && num++;
						this.checkPang(x, y) && num++;
					}
				}
			} else {
				if (y > 0) {
					if (y < this.yLabel - 1) {
						this.checkPang(x, y - 1) && num++;
						this.checkPang(x, y) && num++;
						this.checkPang(x, y + 1) && num++;
						this.checkPang(x + 1, y - 1) && num++;
						this.checkPang(x + 1, y) && num++;
						this.checkPang(x + 1, y + 1) && num++;
					} else {
						this.checkPang(x + 1, y - 1) && num++;
						this.checkPang(x + 1, y) && num++;
						this.checkPang(x, y - 1) && num++;
						this.checkPang(x, y) && num++;
					}
				} else {
					this.checkPang(x, y) && num++;
					this.checkPang(x, y + 1) && num++;
					this.checkPang(x + 1, y) && num++;
					this.checkPang(x + 1, y + 1) && num++;
				}
			}
			// console.log(this.checkPang(x,y))
			!this.checkPang(x, y) && (document.getElementsByClassName('item')[i].innerHTML = num == 0 ? ' ' : num);
		}
	}
	checkPang(x, y) {
		// console.log(x, y)
		let index = this.xLabel * x + y;
		var item = document.getElementsByClassName('item')[index];
		return hasClass(item, 'pang')
	}
	loadEvent() {
		var items = document.getElementsByClassName('item');
		let _this = this;
		for (let i = 0; i < items.length; i++) {
			items[i].addEventListener('click', function (event) {
				// _this.curClick = i;
				_this.checkCell(this);
				// console.log('1')
			});
		}

		// var pangs = document.getElementsByClassName('pang');
		// for(let i=0;i<pangs.length;i++) {
		// 	pangs[i].addEventListener('click',function (e) {
		// 		console.log('2')
		// 	})
		// }
		document.onkeydown = function (e) {
			_this.isPress = true;
		};
		document.onkeyup = function (e) {
			_this.isPress = false;
		};
	}
	isClickEle(index) {
		if (document.getElementsByClassName('item')[index]) {
			let ele = document.getElementsByClassName('item')[index];
			if (!hasClass(ele, 'showed') && ele.innerHTML == ' ') {
				this.show(ele)
				// console.log(ele.dataset.positionx,ele.dataset.positiony)
			}
		}
	}
	checkCell(ele) {
		let text = ele.innerHTML;
		let _this = this;
		if (!this.isPress) {
			if (text != 'P') {
				if (text == ' ') {
					this.show(ele);
				} else {
					if (!hasClass(ele, 'showed')) {
						ele.classList.add('showed')
					}
				}
			} else {
				ele.classList.add('err');
				let pangs = document.getElementsByClassName('pang');
				for (let i = 0; i < pangs.length; i++) {
					pangs[i].classList.add('sele');
				}
				// 蜜汁操作
				setTimeout(() => {
					_this.mask.classList.add('display');
				}, 0);
			}
		} else {
			if (hasClass(ele, 'sele')) {
				ele.classList.remove('sele')
			} else {
				ele.classList.add('sele')
			}

			let sele = document.getElementsByClassName('sele');
			if (sele.length == this.pangNum) {
				// console.log(sele.length)
				let isContinue = true;
				for (let i = 0; i < sele.length; i++) {
					if (!hasClass(sele[i], 'pang')) {
						isContinue = false;
						break;
					}
				}
				// console.log(isContinue);
				isContinue && (this.mask.innerHTML = '<h1>成功</h1>') && this.mask.classList.add('display');
			}
		}

	}
	show(ele) {
		let x = parseInt(ele.dataset.positionx);
		let y = parseInt(ele.dataset.positiony);
		let _this = this;
		// console.log(x,y)
		ele.classList.add('showed');
		if (x > 0) {
			if (x < _this.xLabel - 1) {
				if (y > 0) {
					if (y < _this.yLabel - 1) {
						let topEle = (x - 1) * _this.xLabel + y;
						let rightEle = x * _this.xLabel + (y + 1);
						let bottomEle = (x + 1) * _this.xLabel + y;
						let leftEle = x * _this.xLabel + (y - 1);
						_this.isClickEle(topEle);
						_this.isClickEle(rightEle);
						_this.isClickEle(bottomEle);
						_this.isClickEle(leftEle)
					} else {
						let topEle = (x - 1) * _this.xLabel + y;
						let bottomEle = (x + 1) * _this.xLabel + y;
						let leftEle = x * _this.xLabel + (y - 1);
						_this.isClickEle(topEle);
						_this.isClickEle(bottomEle);
						_this.isClickEle(leftEle)
					}
				} else {
					let rightEle = x * _this.xLabel + (y + 1);
					let bottomEle = (x + 1) * _this.xLabel + y;
					let topEle = (x - 1) * _this.xLabel + y;
					_this.isClickEle(rightEle);
					_this.isClickEle(bottomEle);
					_this.isClickEle(topEle);
				}
			} else {
				if (y > 0) {
					if (y < _this.yLabel - 1) {
						let topEle = (x - 1) * _this.xLabel + y;
						let leftEle = x * _this.xLabel + (y - 1);
						let rightEle = x * _this.xLabel + (y + 1);
						_this.isClickEle(rightEle);
						_this.isClickEle(topEle);
						_this.isClickEle(leftEle)
					} else {
						let topEle = (x - 1) * _this.xLabel + y;
						let leftEle = x * _this.xLabel + (y - 1);
						_this.isClickEle(topEle);
						_this.isClickEle(leftEle)
					}
				} else {
					let topEle = (x - 1) * _this.xLabel + y;
					let rightEle = x * _this.xLabel + (y + 1);
					_this.isClickEle(topEle);
					_this.isClickEle(rightEle);
				}
			}
		} else {
			if (y > 0) {
				if (y < _this.yLabel - 1) {
					let rightEle = x * _this.xLabel + (y + 1);
					let bottomEle = (x + 1) * _this.xLabel + y;
					let leftEle = x * _this.xLabel + (y - 1);
					_this.isClickEle(rightEle);
					_this.isClickEle(bottomEle);
					_this.isClickEle(leftEle)
				} else {
					let bottomEle = (x + 1) * _this.xLabel + y;
					let leftEle = x * _this.xLabel + (y - 1);
					_this.isClickEle(bottomEle);
					_this.isClickEle(leftEle)
				}
			} else {
				let rightEle = x * _this.xLabel + (y + 1);
				let bottomEle = (x + 1) * _this.xLabel + y;
				_this.isClickEle(rightEle);
				_this.isClickEle(bottomEle);
			}
		}
	}
}

function hasClass(ele, name) {
	var className = " " + ele.className + " ";
	return className.indexOf(name) >= 0;
}

let p = new Pang();

let start = document.querySelector('.start');
start.onclick = function() {
	document.querySelector('.main').innerHTML = '';
	p && delete p;
	window.p = new Pang();
	hasClass(document.querySelector('.mask'),'display') && document.querySelector('.mask').classList.remove('display');
}