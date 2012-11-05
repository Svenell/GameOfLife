///<reference path="../app/Size.ts" />
///<reference path="../app/Point.ts" />
///<reference path="../app/BoundingBox.ts" />
///<reference path="../app/Utilities.ts" />
///<reference path="../app/QuadTreeVisitor.ts" />
///<reference path="../app/QuadTree.ts" />
///<reference path="../app/GameOfLife.ts" />

class App {
    element: HTMLElement;
    timerToken: number;  
    game: Game.GameOfLife;
    boundingBox: QT.BoundingBox;
    visitor: QT.QuadTreeVisitor;

    constructor (element: HTMLElement, size: QT.Size) {  
        this.element = element;

        this.boundingBox = new QT.BoundingBox({ x: 0, y: 0 }, size);
        this.visitor = new QT.QuadTreeVisitor(<HTMLCanvasElement>this.element, this.boundingBox, false);

        this.game = new Game.GameOfLife(this.boundingBox);
    } 
 
    seed() {
        var nbr =  Math.min(Math.floor(this.boundingBox.width * this.boundingBox.height * Math.random()), 10000);
        this.game.seed(nbr);
        this.draw();
    }

    drawBoxes(val : bool) {
        this.visitor = new QT.QuadTreeVisitor(<HTMLCanvasElement>this.element, this.boundingBox, val);
        this.draw();
    }

    private draw() {
        var tree = this.game.tree;
        this.visitor.clear();
        tree.accept(this.visitor);
    }

    start() {
        console.log("Start..");
        this.timerToken = setInterval(() => {
            this.game.next();
        this.draw();
        }, 500);
    }
     
    stop() {
        console.log("Stop..");
        clearTimeout(this.timerToken);
    }

}

function AttachEvent(element, type, handler) {  
    if (element.addEventListener) 
        element.addEventListener(type, handler, false);  
    else 
        element.attachEvent("on"+type, handler);  
}  

window.onload = () => {
    var el = <HTMLCanvasElement>document.getElementById('content');
    var app = new App(el, { width: 256, height: 256 });
    AttachEvent(document.getElementById("btnStart"), "click", () =>  app.start());
    AttachEvent(document.getElementById("btnStop"), "click", () => app.stop());
    AttachEvent(document.getElementById("btnSeed"), "click", () => app.seed());
    AttachEvent(document.getElementById("chbDrawBox"), "click", function () { app.drawBoxes(this.checked) });
};