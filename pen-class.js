class doublePendulumn {
    constructor() {
        this.m1 = 25;
        this.m2 = 40;

        this.r1 = smallerDimension * 0.25;
        this.r2 = smallerDimension * 0.2;
        this.vel1 = 0;
        this.vel2 = 0;
        this.pos1 = createVector(50, 150);
        this.pos2 = createVector(50, 300);
        
        this.a1 = 1 + random(-range, range);
        this.a2 = 1 + random(-range, range);
        
        this.update();
    }

    update() {        
        let num1 = -g * (2 * this.m1 + this.m2) * sin(this.a1);
        let num2 = -this.m2 * g * sin(this.a1 - 2 * this.a2);
        let num3 = -2 * sin(this.a1 - this.a2) * this.m2;
        let num4 = this.vel2 * this.vel2 * this.r2 + this.vel1 * this.vel1 * this.r1 * cos(this.a1 - this.a2);
        let den = this.r1 * (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.a1 - 2 * this.a2));
        let acc1 = (num1 + num2 + num3 * num4) / den;
      
        num1 = 2 * sin(this.a1 - this.a2);
        num2 = this.vel1 * this.vel1 * this.r1 * (this.m1 + this.m2);
        num3 = g * (this.m1 + this.m2) * cos(this.a1);
        num4 = this.vel2 * this.vel2 * this.r2 * this.m2 * cos(this.a1 - this.a2);
        den = this.r2 * (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.a1 - 2 * this.a2));
        let acc2 = (num1 * (num2 + num3 + num4)) / den;
      

        this.pos1.x = this.r1 * sin(this.a1);
        this.pos1.y = this.r1 * cos(this.a1);
        
        this.pos2.x = this.r2 * sin(this.a2) + this.pos1.x;
        this.pos2.y = this.r2 * cos(this.a2) + this.pos1.y;

        this.vel1 += acc1;
        this.vel2 += acc2;

        this.a1 += this.vel1;
        this.a2 += this.vel2;
    }

    render() {
        strokeWeight(2)
        stroke(255);
        
        line(0, 0, this.pos1.x, this.pos1.y);
        line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);

        strokeWeight(10);
        stroke(255);
        point(this.pos1.x, this.pos1.y);
        point(this.pos2.x, this.pos2.y);
    }
}
