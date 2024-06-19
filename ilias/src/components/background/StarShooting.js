const xMax = window.screen.availWidth;
const yMax = window.screen.availHeight;

export class StarShooting {
    x = 0;
    y = 0;
    size = 0;
    opacity = 0;
    hue = 0;
    ctx = undefined;
    layer = 0;
    maxTrailLength = 300;
    trailLengthDelta = .01;
    vx = 20;
    vy = 20;
    constructor(ctx, vx, vy) {
        var randomX = Math.floor((Math.random() * xMax / 2) + 1);
        var randomY = Math.floor((Math.random() * yMax / 2) + 1);
        var randomSize = Math.random() * .5 + .5
        var randomHue = Math.floor((Math.random() * 360) + 1);
        ctx.strokeWidth = 1
        this.x = randomX
        this.y = randomY
        this.size = randomSize
        this.hue = randomHue
        this.ctx = ctx;
        this.ctx.shadowBlur = 5
        this.vx = vx;
        this.vy = vy;
        this.lifespan = 1000
    }
    getHeading() {
        return Math.atan2(this.vy, this.vx);
    }
    lineToAngle(x1, y1, length, radians) {
        var x2 = x1 + length * Math.cos(radians),
            y2 = y1 + length * Math.sin(radians);
        return { x: x2, y: y2 };
    }
    animate(scroll) {
        if (this.lifespan > 0) {
            this.livingAnimate()
        }
    }
    livingAnimate() {
        let currentTrailLength = Math.min(this.maxTrailLength * this.trailLengthDelta, this.maxTrailLength),
            pos = this.lineToAngle(this.x, this.y, -currentTrailLength, this.getHeading());

        this.ctx.shadowColor = "rgba(255, 255, 255, " + this.lifespan/1000 + ")";
        this.ctx.fillStyle = "rgba(255, 221, 157, " + this.lifespan/1000 + ")";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        this.ctx.fill();


        //trail
        this.ctx.beginPath();
        this.ctx.moveTo(this.x - 1.5, this.y);
        this.ctx.lineTo(pos.x, pos.y);
        this.ctx.lineTo(this.x + 1.5, this.y);
        this.ctx.closePath();
        this.ctx.fill();
        this.trailLengthDelta *= 2
        this.x += this.vx;
        this.y += this.vy;
        this.lifespan -= 20
    }

}