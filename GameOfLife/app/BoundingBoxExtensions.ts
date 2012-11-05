///<reference path="Size.ts" />
///<reference path="Point.ts" />
///<reference path="BoundingBox.ts" />

module QT {
    export class BoundingBoxExtensions {
        private static halfSize(bb : BoundingBox) : Size {
            return { width: bb.width / 2, height: bb.height / 2};
        }
        static getNorthWest(bb : BoundingBox) {
            return new BoundingBox(bb.topLeft, this.halfSize(bb));
        }

        static getNorthEast(bb : BoundingBox) {
            var size = BoundingBoxExtensions.halfSize(bb);
            var x = bb.topLeft.x + size.width;
            var y = bb.topLeft.y;
            return new BoundingBox({x: x, y: y}, size);
        }

        static getSouthWest(bb : BoundingBox) {
            var size = BoundingBoxExtensions.halfSize(bb);
            var x = bb.topLeft.x;
            var y = bb.topLeft.y + size.height;
            return new BoundingBox({x: x, y: y}, size);
        }

        static getSouthEast(bb : BoundingBox) {
            var size = BoundingBoxExtensions.halfSize(bb);
            var x = bb.topLeft.x + size.width;
            var y = bb.topLeft.y + size.height;
            return new BoundingBox({x: x, y: y}, size);
        }

    }
}