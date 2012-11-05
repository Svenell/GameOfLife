///<reference path="../app/Point.ts" />
///<reference path="../app/Size.ts" />
///<reference path="../app/Utilities.ts" />
///<reference path="../app/BoundingBox.ts" />
///<reference path="../app/BoundingBox.js" />
///<reference path="../app/BoundingBoxExtensions.ts" />
///<reference path="../app/BoundingBoxExtensions.js" />
///<reference path="../app/QuadTree.ts" />
///<reference path="../app/QuadTree.js" />
///<reference path="../app/GameOfLife.ts" />
///<reference path="../app/GameOfLife.js" />

///<reference path="qunit.d.ts"/>
module QuardTreeTests { 
    function create8By8(points: QT.Point[]) {
        var game = new Game.GameOfLife(new QT.BoundingBox({ x: 0, y: 0 }, { width: 8, height: 8 }));
        game.insert(points);
        return game; 
    }  
     
    test("Alive with no neighbours next generation should be killed", () => {
        var points =[];
        points.push({ x: 1, y: 1 });
        var game = create8By8(points);
        game.next();
        ok(!game.tree.containsPoint({ x: 1, y: 1 }), "Should not contain 1,1");
    });

    test("Alive with one neighbour next generation should be killed", () => {
        var points =[];
        points.push({ x: 1, y: 1 });
        points.push({ x: 2, y: 1 });
        var game = create8By8(points);
        game.next();
        ok(!game.tree.containsPoint({ x: 1, y: 1 }), "Should not contain 1,1");
        equal(game.tree.length, 0, "Should not have any points");
    });

    test("Alive with two neighbours next generation should be alive", () => {
        var points =[];
        points.push({ x: 1, y: 0 });
        points.push({ x: 1, y: 1 });
        points.push({ x: 1, y: 2 });
        var game = create8By8(points);
        game.next();        
        ok(game.tree.containsPoint({ x: 1, y: 1 }), "Should contain 1,1");
    });

    test("Alive with three neighbours next generation should be alive", () => {
        var points =[];
        points.push({ x: 1, y: 0 });
        points.push({ x: 1, y: 1 });
        points.push({ x: 2, y: 1 });
        points.push({ x: 1, y: 2 });
        var game = create8By8(points);
        game.next();        
        ok(game.tree.containsPoint({ x: 1, y: 1 }), "Should contain 1,1");
    });

    test("Alive with four neighbours next generation should be killed", () => {
        var points =[];
        points.push({ x: 1, y: 0 });
        points.push({ x: 0, y: 1 });
        points.push({ x: 1, y: 1 });
        points.push({ x: 2, y: 1 });
        points.push({ x: 1, y: 2 });
        var game = create8By8(points);
        game.next();        
        ok(!game.tree.containsPoint({ x: 1, y: 1 }), "Should not contain 1,1");
    });

    test("Dead with no neighbours next generation should be dead", () => {
        var points =[];
        var game = create8By8(points);
        game.next();        
        ok(!game.tree.containsPoint({ x: 1, y: 1 }), "Should not contain 1,1");
    });

    test("Dead with one neighbours next generation should be dead", () => {
        var points =[];
        points.push({ x: 1, y: 0 });
        var game = create8By8(points);
        game.next();        
        ok(!game.tree.containsPoint({ x: 1, y: 1 }), "Should not contain 1,1");
    });

    test("Dead with two neighbours next generation should be dead", () => {
        var points =[];
        points.push({ x: 1, y: 0 }); 
        points.push({ x: 1, y: 2 });
        var game = create8By8(points);
        game.next();        
        ok(!game.tree.containsPoint({ x: 1, y: 1 }), "Should not contain 1,1");
    });

    test("Dead with three neighbours next generation should be alive", () => {
        var points =[];
        points.push({ x: 1, y: 0 });
        points.push({ x: 2, y: 1 });
        points.push({ x: 1, y: 2 });
        var game = create8By8(points);
        game.next();        
        ok(game.tree.containsPoint({ x: 1, y: 1 }), "Should contain 1,1");
    });
    test("Dead with four neighbours next generation should be dead", () => {
        var points =[];
        points.push({ x: 1, y: 0 });
        points.push({ x: 0, y: 1 }); 
        points.push({ x: 2, y: 1 });
        points.push({ x: 1, y: 2 });
        var game = create8By8(points); 
        game.next();        
        ok(!game.tree.containsPoint({ x: 1, y: 1 }), "Should not contain 1,1");
    });

}