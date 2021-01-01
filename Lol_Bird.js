var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// Создание объектов
var bird = new Image(); // Создание объекта игрок
var bg = new Image(); // Создание объекта фон
var fg = new Image(); // Создание объекта низ
var pipeUp = new Image(); // Создание объекта труба сверху
var pipeBottom = new Image(); // Создание объекта труба снизу

// Подключение изображений
bird.src = "img/bird.png"; // Подключаем img
bg.src = "img/bg.png"; // Подключаем img
fg.src = "img/fg.png"; // Подключаем img
pipeUp.src = "img/pipeUp.png"; // Подключаем img
pipeBottom.src = "img/pipeBottom.png"; // Подключаем img

// Звуки
var fly = new Audio(); // Звук полета
var score_audio = new Audio(); // Звук счета

fly.src = "audio/fly.mp3"; // Подключение звука
score_audio.src = "audio/score.mp3"; // Подключение звука

var gap = 90;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);
// Вызываем метод moveUp
function moveUp() {
	yPos -= 30; // Изменение вертикального положение игрока
	fly.play(); // Звук при нажатии
}

// Блоки
var pipe = []; // Блок труб

pipe[0] = { 
	x : cvs.width,
	y : 0
}

var score = 0; // Очки
// Позиця птицы
var xPos = 10; // Положение по горизонтали
var yPos = 150; // Положение по вертикали
var grav = 1.5; // Для гравитации. Скорость падение птицы



function draw() {
	ctx.drawImage(bg, 0, 0);

	for (var i = 0; i < pipe.length; i++) {
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
		
		pipe[i].x--;

		if (pipe[i].x == 125) {
			pipe.push({
				x : cvs.width,
				y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
			})
		}

		// ОТслеживание прикосновений
		if (xPos + bird.width >= pipe[i].x
			&& xPos <= pipe[i].x + pipeUp.width
			&& (yPos <= pipe[i].y + pipeUp.height
				|| yPos + bird.height >= pipe[i].y + pipeUp.height + gap
				) || yPos + bird.height >= cvs.height - fg.height) {
			location.reload(); //Перезагрузка страницы
		}

		if (pipe[i].x == 5) {
			score++;
			score_audio.play();
		}
	}
	
	ctx.drawImage(fg, 0, cvs.height - fg.height);
	ctx.drawImage(bird, xPos, yPos);

	yPos += grav;

	// Настраиваем "СЧЕТ"
	ctx.fillStyle = "red";
	ctx.font = "24px Verdana";
	ctx.fillText("Счет: " + score, 10, cvs.height - 20);

	requestAnimationFrame(draw);

}

pipeBottom.onload = draw; // Загрузка всего