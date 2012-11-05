///<reference path="../app/Size.ts" />
///<reference path="../app/Point.ts" />
///<reference path="../app/BoundingBox.ts" />
///<reference path="../app/BoundingBoxExtensions.ts" />
///<reference path="../app/Utilities.ts" />
///<reference path="../app/QuadTreeVisitor.ts" />
 
module QT { 

    export class QuadTree {
        private boundingBox: BoundingBox;
        private NbrPointsInQuadTree: number;
        northWest: QuadTree;
        northEast: QuadTree;
        southWest: QuadTree; 
        southEast: QuadTree;
        private points: Point[];

        constructor (boundingBox: BoundingBox) {
            if(!(Utilities.powerOf2(boundingBox.width) && Utilities.powerOf2(boundingBox.height)))
                throw "Quadtree only handles with and height that are to the power of 2";

            this.boundingBox = boundingBox;
            this.northWest = null;
            this.NbrPointsInQuadTree = 4;
            this.points = [];
        }
        
        insertMulti(...points: Point[]) {
            for (var i = 0; i < points.length;i++)
                this.insert(points[i]);
        }

        get length() : number{
            var nbr = this.points.length;
            if (this.hasChildren()) {
                nbr += this.northWest.length;
                nbr += this.northEast.length;
                nbr += this.southEast.length;
                nbr += this.southWest.length;
            }
            return nbr;
        }

        accept(visitor: IQuadTreeVisitor) {
            visitor.visitBoundingBox(this.boundingBox);
            if (this.hasChildren()) {
                this.northWest.accept(visitor);
                this.northEast.accept(visitor);
                this.southEast.accept(visitor);
                this.southWest.accept(visitor);
            }
            else {
                for (var i in this.points) {
                    visitor.visitPoint(this.points[i]);
                }
            }
        }

        private hasChildren() {
            return this.northWest !== null;
        }

        insert(point: Point){
            if(!this.boundingBox.containsPoint(point))
                return false;

            if (this.points.length < this.NbrPointsInQuadTree && !this.hasChildren()) {
                this.points.push(point);
                return true;
            }

            if(!this.hasChildren())
                this.subdivide();

            return this.insertIntoSubTree(point);
        }

        containsPoint(point: Point) {
            var points = this.queryRange(new BoundingBox(point, { width: 1, height: 1 }));
            return points.length > 0;
        }

        queryRange(boundingBox: BoundingBox) {
            var points = [];
            if(!this.boundingBox.intersects(boundingBox))
                return points;

            var len = this.points.length;
            for (var i = 0; i <len ;i++) {
                if(boundingBox.containsPoint(this.points[i]))
                    points.push(this.points[i]);
            }
            if (!this.hasChildren()) {
                return points;
            }
              
            QuadTree.queryRangeTree(boundingBox, this.northWest, points);
            QuadTree.queryRangeTree(boundingBox, this.northEast, points);
            QuadTree.queryRangeTree(boundingBox, this.southWest, points);
            QuadTree.queryRangeTree(boundingBox, this.southEast, points);

            return points;
        }

        private static queryRangeTree(boundingBox: BoundingBox, tree: QuadTree, points: Point[]) {
            var pts = tree.queryRange(boundingBox);
            for (var i in pts) {
                points.push(pts[i]);
            }
        }

        private insertIntoSubTree(point: Point) {
            if(this.northWest.insert(point))
                return true;
            if(this.northEast.insert(point))
                return true;
            if(this.southWest.insert(point))
                return true;
            if(this.southEast.insert(point))
                return true;

            return false;
        }

        private subdivide() {
            this.northWest = new QuadTree(BoundingBoxExtensions.getNorthWest(this.boundingBox));
            this.northEast = new QuadTree(BoundingBoxExtensions.getNorthEast(this.boundingBox));
            this.southWest = new QuadTree(BoundingBoxExtensions.getSouthWest(this.boundingBox));
            this.southEast = new QuadTree(BoundingBoxExtensions.getSouthEast(this.boundingBox));
            
            for (var point in this.points) {
                this.insertIntoSubTree(this.points[point]);
            }
            this.points = [];
        }

        toString() {
            var str = "";
            for (var point in this.points) {
                str += "(" + this.points[point].x + "," +  this.points[point].y + ") ";
            }
            if (this.northWest !== null) {
                str += "ne->" + this.northEast.toString() + "| ";
                str += "nw->" + this.northWest.toString() + "| ";
                str += "se->" + this.southEast.toString() + "| ";
                str += "sw->" + this.southWest.toString() + "| ";
            }
            return str;
        }
    }

}
