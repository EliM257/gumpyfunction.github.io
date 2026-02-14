const canvas = document.getElementById("leafCanvas");
const ctx = canvas.getContext("2d");

let leaves = [];
const leafCount = 40;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Leaf {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.size = 10 + Math.random() * 20;
        this.speedY = 1 + Math.random() * 1.5;
        this.speedX = (Math.random() - 0.5) * 1;
        this.opacity = 1;

        const colors = [
            "rgba(0, 255, 0, OP)"
        ];

        const base = colors[Math.floor(Math.random() * colors.length)];
        this.color = base.replace("OP", this.opacity);
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.x += Math.sin(this.y * 0.01) * 0.5;

        if (this.y > canvas.height) {
            this.reset();
            this.y = -20;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.ellipse(this.x, this.y, this.size, this.size * 0.6, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < leafCount; i++) {
    leaves.push(new Leaf());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    leaves.forEach(leaf => {
        leaf.update();
        leaf.draw();
    });

    requestAnimationFrame(animate);
}

animate();
