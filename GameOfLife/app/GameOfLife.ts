///<reference path="../app/Point.ts" />
///<reference path="../app/Size.ts" />
///<reference path="../app/Utilities.ts" />
///<reference path="../app/BoundingBox.ts" />
///<reference path="../app/QuadTree.ts" />

module Game {
     
    export class GameOfLife {
        private current: QT.QuadTree;
        private boundingBox: QT.BoundingBox; 
        
        constructor(boundingBox: QT.BoundingBox) {
            this.boundingBox = boundingBox;
            this.current = new QT.QuadTree(boundingBox);
          
        }

        get tree() {
            return this.current;
        }

        insert(points: QT.Point[]) {
            for (var i = 0; i < points.length;i++)
                this.current.insert(points[i]);
        }

        seed(nbr : number) {
            var points = [];
            var width = this.boundingBox.width;
            var height = this.boundingBox.height;

            var comparer = (pt1, pt2) => { return pt1.x === pt2.x && pt1.y === pt2.y; };
            for (var i = 0; i < nbr; i++) {
                var x = Math.floor(width * Math.random());
                var y = Math.floor(height * Math.random());
                var point = { x: x, y: y };
                var index = QT.Utilities.indexOf(point, points, comparer);
                if (index === -1) {
                    points.push(point);
                }
            }
            this.current = new QT.QuadTree(this.boundingBox);
            console.log("Seeding.. " + points.length + " (" + nbr + ")");
            this.insert(points);
        }

        //Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
        //Any live cell with more than three live neighbours dies, as if by overcrowding.
        //Any live cell with two or three live neighbours lives on to the next generation.
        //Any dead cell with exactly three live neighbours becomes a live cell.
        next() {
            var tree = new QT.QuadTree(this.boundingBox);
            for (var x = 0; x < this.boundingBox.width; x++) {
                for (var y = 0; y < this.boundingBox.height; y++) {
                    var point = { x: x, y: y };
                    var isALive = this.current.containsPoint(point);
                    var boundingBox = new QT.BoundingBox({ x: x - 1, y: y - 1 }, { width: 3, height: 3 })
                    var pts = this.current.queryRange(boundingBox);
                    if (isALive) {
                        if (pts.length === 3 || pts.length === 4) {
                            tree.insert(point);
                        }
                    }
                    else {
                        if(pts.length === 3)
                            tree.insert(point);
                    }
                }
            }
            this.current = tree;
        }
    }
}