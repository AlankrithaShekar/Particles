
const particles = [];

function setup() {
    var canvas= createCanvas(window.innerWidth-40, window.innerHeight-60);
    
	const particlesLength = Math.min(Math.floor(window.innerWidth / 10), 100);
	for(let i=0; i<particlesLength; i++) {
		particles.push(new Particle());
	}
}

function draw() {
	background('black');
	particles.forEach((particle, idx) => {
		particle.update();
        particle.draw();
        particle.checkParticles(particles.slice(idx));
        fill(255);
        
	});
}

class Particle {
	constructor() {
		this.pos = createVector(random(width), random(height));
		this.vel = createVector(random(-2, 4), random(-2, 4));
		this.size = 10;
	}
	
	update() {
		this.pos.add(this.vel);
		this.edges();
	}
	
	draw() {
		noStroke();
		fill('red');
		circle(this.pos.x, this.pos.y, this.size * 1);
	}
	
	edges() {
		if(this.pos.x < 0 || this.pos.x > width) {
			this.vel.x *= -1;
		}
		
		if(this.pos.y < 0 || this.pos.y > height) {
			this.vel.y *= -1;
		}
		

	}
	
	checkParticles(particles) {
		particles.forEach(particle => {
			const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
			if(d < 140) {
				const alpha = map(d, 0, 120, 0, 0.25)
				stroke(`rgba(255, 255, 255, ${alpha})`);
				line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
			}
		});
	}
}