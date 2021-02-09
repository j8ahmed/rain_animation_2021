var inner_width = window.innerWidth, inner_height = window.innerHeight;
var random = Math.random, abs = Math.abs, PI = Math.PI, floor = Math.floor;
var svg, ctx, particles, particleNum, particleR, particleSpeed, particleLife;
function rand(min, max, neg) {
    if (max === void 0) { max = 0; }
    if (neg === void 0) { neg = false; }
    if (!max)
        max = min, min = 0;
    if (neg)
        return ((random() - 0.5) * (max - min) + min);
    else
        return (random() * (max - min) + min);
}
function Particle(x, y, r, dx, dy, l) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.l = l;
    this.init = function (lastPoint) {
        this.r = rand(particleR.min, particleR.max);
        this.x = rand(0 + this.r, ctx.canvas.width - this.r);
        this.y = rand(10, 300);
        lastPoint.x = this.x;
        lastPoint.y = this.y;
        this.dx = 0;
        this.dy = rand(particleSpeed.min, particleSpeed.max);
        this.l = rand(particleLife.min, particleLife.max);
        this.draw(lastPoint);
    };
    this.draw = function (lastPoint) {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(80,80," + rand(80, 130) + "," + this.l + ")";
        ctx.lineWidth = this.r;
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(this.x + this.dx, this.y + this.dy);
        ctx.stroke();
        ctx.closePath();
    };
    this.checkBounds = function (lastPoint) {
        if (this.y > ctx.canvas.height || this.l <= 0) {
            this.init(lastPoint);
        }
        else
            this.draw(lastPoint);
    };
    this.update = function () {
        var lastPoint = { x: this.x, y: this.y };
        this.x += this.dx;
        this.y += this.dy;
        // this.l -= 1 * (1/60);
        this.checkBounds(lastPoint);
    };
}
window.onload = function () {
    svg = document.getElementById('svg8');
    var clouds = document.querySelectorAll('g');
    var duration = 15 * clouds.length + 10;
    clouds.forEach(function (cloud) {
        duration -= 10;
        cloud.style.animationDuration = duration + 's';
    });
    var canvas = document.getElementById('rain-canvas');
    ctx = canvas.getContext("2d");
    resize();
    animate();
};
function initCanvas() {
    initParticles();
}
function initParticles() {
    particles = [];
    particleNum = 600;
    particleR = { min: 1, max: 2 };
    particleSpeed = { min: 5, max: 10 };
    particleLife = { min: 0.1, max: 1 };
    for (var i = 0; i < particleNum; i++) {
        var r = rand(particleR.min, particleR.max);
        var x = rand(0 + r, ctx.canvas.width - r);
        var y = rand(0, ctx.canvas.height);
        var dx = 0;
        var dy = rand(particleSpeed.min, particleSpeed.max);
        var l = rand(particleLife.min, particleLife.max);
        particles.push(new Particle(x, y, r, dx, dy, l));
    }
}
function resize() {
    ctx.canvas.width = inner_width;
    ctx.canvas.height = inner_height;
    // svg.setAttribute('viewBox', '30 0 '+innerWidth/15+' '+i: inner_widthnnerHeight/7);
    initCanvas();
}
function animate() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // ctx.fillStyle = "rgba(255,255,255,0.01)";
    // ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);
    particles.forEach(function (particle) {
        particle.update();
    });
    requestAnimationFrame(animate);
}
addEventListener('resize', resize);
