var canvas = document.getElementById("gameScreen");
var canvasLeft = canvas.offsetLeft;
var canvasTop = canvas.offsetTop;
var ctx = canvas.getContext("2d");
var mouseX;
var mouseY;
var entities = [];
canvas.addEventListener('mousedown', function () {
    console.log("hi");
    entities.forEach(function (element) {
        if (mouseY > element.y && mouseY < element.y + element.h
            && mouseX > element.x && mouseX < element.x + element.w) {
            element.mouseDown = true;
        }
    });
}, false);
canvas.addEventListener('mouseup', function (evt) {
    entities.forEach(function (entity) {
        if (entity.mouseDown)
            entity.mouseDown = false;
    });
}, false);
var CommandBlock = (function () {
    function CommandBlock(X, Y, W, H, Color) {
        this.x = X;
        this.y = Y;
        this.w = W;
        this.h = H;
        this.color = Color;
        this.mouseDown = false;
    }
    CommandBlock.prototype.update = function () {
        if (this.mouseDown) {
            this.x = mouseX - this.w / 2;
            this.y = mouseY - this.h / 2;
        }
    };
    return CommandBlock;
}());
var block1 = new CommandBlock(50, 325, 150, 100, "orange");
var block2 = new CommandBlock(400, 325, 150, 100, "purple");
entities.push(block1);
entities.push(block2);
canvas.addEventListener('mousemove', function (evt) {
    var rect = canvas.getBoundingClientRect();
    mouseX = (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width;
    mouseY = (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height;
}, false);
function draw() {
    ctx.strokeStyle = 'black';
    ctx.clearRect(0, 0, 800, 450);
    ctx.beginPath();
    entities.forEach(function (entity) {
        ctx.fillStyle = entity.color;
        ctx.fillRect(entity.x, entity.y, entity.w, entity.h);
    });
    ctx.stroke();
}
function update() {
    entities.forEach(function (entity) {
        entity.update();
    });
}
setInterval(function () {
    update();
    draw();
}, 12);
//# sourceMappingURL=game.js.map