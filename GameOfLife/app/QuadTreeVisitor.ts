///<reference path="../app/Size.ts" />
///<reference path="../app/Point.ts" />
///<reference path="../app/BoundingBox.ts" />
 
module QT {

    export interface IQuadTreeVisitor {
        visitBoundingBox(boundingBox: BoundingBox): void;
        visitPoint(point: Point): void;
        clear(): void;
    } 
     
    export class QuadTreeVisitor implements IQuadTreeVisitor {

        element: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
        boundingBox: BoundingBox;

        drawBox: bool;
        constructor (element: HTMLCanvasElement, boundingBox: BoundingBox, drawBox?: bool) {
            this.element = element;
            this.ctx = element.getContext("2d");
            this.boundingBox = boundingBox;
            this.drawBox = drawBox !== undefined ? drawBox : false;
        }

        clear() {
            this.ctx.clearRect(this.boundingBox.left, this.boundingBox.top, this.boundingBox.width, this.boundingBox.height);
        }

        visitBoundingBox(box: BoundingBox) {
            if (this.drawBox) {
                this.ctx.strokeStyle = 'blue';
                this.ctx.lineWidth = 1;
                this.ctx.strokeRect(box.left, box.top, box.width, box.height);
            }
        }

        visitPoint(point: Point) {
            this.ctx.fillStyle= 'red';
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, 1, 0, 2*Math.PI);
            this.ctx.fill();
        }
    }
}