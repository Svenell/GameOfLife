///<reference path="../app/Size.ts" />
///<reference path="../app/Point.ts" />
///<reference path="../app/BoundingBox.ts" />
///<reference path="../app/BoundingBox.js" />
///<reference path="../app/BoundingBoxExtensions.ts" />
///<reference path="../app/BoundingBoxExtensions.js" />
 
///<reference path="qunit.d.ts"/> 
 
module QuardTreeTests {  
      
    function create4By4() { 
        return new QT.BoundingBox({ x: 0, y: 0 }, { width: 4, height: 4 });
    }
    test("Should report that it contains point inside boundry", () => {
        var boundry = create4By4(); 
        ok(boundry.containsPoint({ x: 0, y: 0 }), "0,0");
        ok(boundry.containsPoint({ x: 0, y: 3 }), "0,3");
        ok(boundry.containsPoint({ x: 3, y: 0 }), "3,0");
        ok(boundry.containsPoint({ x: 3, y: 3 }), "3,3");
    });

    test("Should report that it does not contain point outside boundry", () => {
        var boundry = create4By4();
        ok(!boundry.containsPoint({ x: 5, y: 5 }), "5,5");
        ok(!boundry.containsPoint({ x: 0, y: 5 }), "0,5");
        ok(!boundry.containsPoint({ x: 5, y: 0 }), "5,0");
        ok(!boundry.containsPoint({ x: -1, y: -1 }), "-1,-1");
    }); 

    test("Should report valid intersections", () => {
        var boundry = create4By4();
        ok(boundry.intersects(new QT.BoundingBox({ x: -1, y: -1 }, { width: 2, height: 2 })), "-1,-1->1,1");
        ok(boundry.intersects(new QT.BoundingBox({ x: 3, y: -1 }, { width: 2, height: 2 })), "3,-1->1,1");
        ok(boundry.intersects(new QT.BoundingBox({ x: -1, y: 3 }, { width: 2, height: 2 })), "-1,3->1,1");
        ok(boundry.intersects(new QT.BoundingBox({ x: 3, y: 3 }, { width: 2, height: 2 })), "3,3->1,1");
    }); 

    test("Should report invalid intersections", () => {
        var boundry = create4By4();
        ok(!boundry.intersects(new QT.BoundingBox({ x: -2, y: 0 }, { width: 2, height: 2 })), "-2,0->1,1");
        ok(!boundry.intersects(new QT.BoundingBox({ x: 0, y: -2 }, { width: 2, height: 2 })), "0,-2->1,1");
        ok(!boundry.intersects(new QT.BoundingBox({ x: 6, y: 0 }, { width: 2, height: 2 })), "6,0->1,1");
        ok(!boundry.intersects(new QT.BoundingBox({ x: 0, y: 6 }, { width: 2, height: 2 })), "0,6->1,1");
    }); 

    test("NW Should be correct", () => {
        var boundingBox = create4By4();
        var b = QT.BoundingBoxExtensions.getNorthWest(boundingBox);
        equal(b.top, 0, "Top:" + b.top);
        equal(b.bottom, 1, "Bottom:"+ b.bottom);
        equal(b.left, 0, "Left:" + b.left); 
        equal(b.right, 1, "Right:" + b.right);
    }); 

    test("NE Should be correct", () => {
        var boundingBox = create4By4();
        var b = QT.BoundingBoxExtensions.getNorthEast(boundingBox);
        equal(b.top, 0, "Top:" + b.top);
        equal(b.bottom, 1, "Bottom:"+ b.bottom);
        equal(b.left, 2, "Left:" + b.left); 
        equal(b.right, 3, "Right:" + b.right);
    }); 
     
    test("SW Should be correct", () => {
        var boundingBox = create4By4();
        var b = QT.BoundingBoxExtensions.getSouthWest(boundingBox);
        equal(b.top, 2, "Top:" + b.top);
        equal(b.bottom, 3, "Bottom:"+ b.bottom);
        equal(b.left, 0, "Left:" + b.left); 
        equal(b.right, 1, "Right:" + b.right); 
    }); 

    test("NE Should be correct", () => {
        var boundingBox = create4By4();
        var b = QT.BoundingBoxExtensions.getSouthEast(boundingBox);
        equal(b.top, 2, "Top:" + b.top); 
        equal(b.bottom, 3, "Bottom:"+ b.bottom);
        equal(b.left, 2, "Left:" + b.left); 
        equal(b.right, 3, "Right:" + b.right);
    }); 

}  