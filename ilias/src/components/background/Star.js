const xMax = window.screen.availWidth;
const yMax = window.screen.availHeight;

export class Star {
    x = 0;
    y = 0;
    size = 0;
    opacity = 0;
    hue = 0;
    ctx = undefined;
    layer = 0;
    constructor(ctx, layer) {
        var randomX = Math.floor((Math.random() * xMax) + 1);
        var randomY = Math.floor((Math.random() * yMax) + 1);
        var randomSize = Math.random()*.2 + .4
        var randomHue = Math.floor((Math.random() * 360) + 1);
        this.layer = layer
        this.x = randomX
        this.y = randomY
        this.size = randomSize
        this.hue = randomHue
        this.ctx = ctx;
        ctx.shadowBlur = Math.floor((Math.random()*10)+5);
        ctx.shadowColor = "white";
    }
    animate(scroll) {
        // this.ctx.fillStyle = `hsla(${this.hue} , 30%, 80%, ${(scroll - 150) / 1000})`;
        this.ctx.fillStyle = `hsla(${this.hue} , 30%, 80%,1)`;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y - (scroll * this.layer) / 500, this.size, 0, 2 * Math.PI, false);
        this.ctx.fill();
        // this.ctx.fillRect(this.x, this.y - (scroll * this.layer) / 500, this.size*2, this.size*2);
    }
}