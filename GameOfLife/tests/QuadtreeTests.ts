///<reference path="../app/Point.ts" />
///<reference path="../app/Size.ts" />
///<reference path="../app/Utilities.ts" />
///<reference path="../app/Utilities.js" />
///<reference path="../app/BoundingBox.ts" />
///<reference path="../app/BoundingBox.js" />
///<reference path="../app/BoundingBoxExtensions.ts" />
///<reference path="../app/BoundingBoxExtensions.js" />
///<reference path="../app/QuadTree.ts" />
///<reference path="../app/QuadTree.js" />
///<reference path="qunit.d.ts"/>
 
module QuardTreeTests {    
     
    function create8By8() {
       return new QT.QuadTree(new QT.BoundingBox({ x: 0, y: 0 }, { width: 8, height: 8 }));
    } 
     
    function create16By16() {
        return new QT.QuadTree(new QT.BoundingBox({ x: 0, y: 0 }, { width: 16, height: 16 }));
    }

    test("Should be able to insert node inside bounding box", () => { 
        var tree = create8By8();
        equal(tree.insert({ x: 0, y: 0 }), true, "Should be able to insert items inside boundry 0,0");
        equal(tree.insert({ x: 0, y: 7 }), true, "Should be able to insert items inside boundry 0,7");
        equal(tree.insert({ x: 7, y: 0 }), true, "Should be able to insert items inside boundry 7,0");
        equal(tree.insert({ x: 7, y: 7 }), true, "Should be able to insert items inside boundry 7,7");
    });
     
    test("Should not be able to insert node outside bounding box", () => {
        var tree = create8By8();
        equal(tree.insert({ x: 9, y: 0 }), false, "Should not be able to insert items outside boundry x = 9");
        equal(tree.insert({ x: -1, y: 0 }), false, "Should not be able to insert items outside boundry x = -1");
        equal(tree.insert({ x: 0, y: 9 }), false, "Should not be able to insert items outside boundry y = 9");
        equal(tree.insert({ x: 0, y: -1 }), false, "Should not be able to insert items outside boundry y = -1");
    });

    test("Should split the tree when necessary", () => {
        var tree = create16By16();
        equal(tree.insert({ x: 0, y: 0 }), true, "Should be able to insert items inside boundry 0,0");
        equal(tree.insert({ x: 0, y: 9 }), true, "Should be able to insert items inside boundry 0,9");
        equal(tree.insert({ x: 9, y: 0 }), true, "Should be able to insert items inside boundry 9,0");
        equal(tree.insert({ x: 9, y: 9 }), true, "Should be able to insert items inside boundry 9,9");
        equal(tree.insert({ x: 8, y: 9 }), true, "Should be able to insert items inside boundry 8,9");
         
        ok(tree.southEast !== null, "Northwest should not be null");
    });
      
    test("Should return points within range", () => {
        var tree = create16By16();
        tree.insertMulti({ x: 0, y: 0 }, { x: 0, y: 1 },{ x: 0, y: 2 },
                         { x: 1, y: 0 }, { x: 1, y: 1 },{ x: 1, y: 2 },
                         { x: 2, y: 0 }, { x: 2, y: 1 },{ x: 2, y: 2 },
                         { x: 3, y: 0 }, { x: 3, y: 1 },{ x: 3, y: 2 });
        
        var points = tree.queryRange(new QT.BoundingBox({ x: 0, y: 0 }, { width: 2, height: 2 }));
        ok(points !== null, "Should have points");
        var p = "";
        for (var point in points) {
            p += "(" + points[point].x + "," + points[point].y + ") ";
        }
        equal(points.length, 4, "Should have 4 points in range but was " + points.length + ":" + p);
    });

}
