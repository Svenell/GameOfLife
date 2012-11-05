///<reference path="Size.ts" />
///<reference path="Point.ts" />

module QT {
    export class BoundingBox {  
        topLeft: Point;
        size: Size;
        constructor (topLeft: Point, size: Size) {
            this.topLeft = topLeft;
            this.size = size;
        }

        containsPoint(point: Point): bool {
            return (point.x >= this.left &&
                    point.x <= this.right &&
                    point.y >= this.top &&
                    point.y <= this.bottom);
        }

        get width() {
            return this.size.width;
        }

        get height() {
            return this.size.height;
        }

        get left() {
            return this.topLeft.x;
        }

        get right() {
            return this.topLeft.x + this.size.width - 1;
        }
          
        get top() {
            return this.topLeft.y;
        }
         
        get bottom() {
            return this.topLeft.y + this.size.height - 1;
        }

        intersects(boundingBox: BoundingBox) {
            return !(this.bottom < boundingBox.top || 
                     this.top > boundingBox.bottom ||
                     this.left > boundingBox.right ||
                     this.right < boundingBox.left);
        }        
    }
}
