import { scaleFactor } from "./constant.js";
import { k } from "./kaboomCtx.js";
// to inspect the game in the browser);
k.loadSprite("spritesheet", "./spritesheet.png", {
    // in vite we dont have to add other things like public folder becuase vite considers abything in the piblic folder easily accesible hencofrth makes the program easier to read
    sliceX: 39, // count the number of frames in the spritesheet then divide the number by 16 to get the x value
    sliceY: 33, // count the number of frames in the spritesheet then divide the number by 16 to get the y value 
    anims: {
        "idle-down": 936, // only 1 frame to add animation in kaboom js we use hte from object to start the animation and to object to end the animation we use the loop property to make the animation loop and only stop it when we change the animation or when we want it to stop
        "walk-down": { from : 936, to: 939, loop:true, speed:8}, // 4 fromes animation speed prperty is used to control the speed of the animation it mainly affects the framerate of the animation we are using a speed of 8 frames to make the annimation look smooth
        "idle-side": 975, // this is for the right side idle aimation by default we will just flip the sprite to get the left side idle animation when we want to make the chracter look left 
        "walk-side": { from: 975, to: 978, loop:true, speed:9}, // 4 frames animation
        "walk-up": { from: 1014, to: 1017, loop:true, speed:8}, // 4 frames animation
    },
});
k.loadSprite("map", "./map.png");
k.setBackground(k.Color.fromHex("#311047"));
k.scene("main", async () => {
    const mapData = await (await fetch("./map.json")).json(); // A constant to get the map.json data into our java script file, await (await fetch) is a default is a default webrowserser api
    //in one line we first await the fetch funciton because its asynchronours so the rest of the code will run while fetch is still ongoing, we want to load the map data and not move the rest of the code till its done that is why we wait it await it mainly and once we do we convert it 
    const layers = mapData.layers; // to get the layers property from the mapData object, it is only for the code  to look cleaner we didnt really have ot create a constant to get the layer properties form the mapData
    const map = k.make([]); //creating the first game object,
    k.sprite("map"), // for the map we are going to need the sprite component to display the acutal map the way we do this by using the sprite component offered by kaboom then passing it by a key for the map we want to display we specify the key in the load sprite funciton for the image map.png thats how kaboom is able  to know and advance what to display
    k.pos(0), // the positional component is used to specify the position of the game object on the screen, it takes in two arguments x and y axis, it is not neccesary only when it is displayed just the position the object could have and iwll only show when i show the add function
    k.scale(scaleFactor); //this is the final component we are going to use for the game objecty because our image is a pixel art we need to be able to scale it up so that we can see it better on the screen, for a better practice we are using a constant to specify the scale component in constant.js file so that we can easily change it in once place if we want to change the scale of the entire game later on 
}); //what is a game object?, in kaboom js a game object can be anything plyers props etc ,It is an object which contains diffrent compoentns, those components can be anything position,area, a body, a specific spirte.
// the way kaboom works is that by passing in an array of compnents u specify behaviour for your game objects its basically an entitiy component system
// so how do u create a game object in kaboom js?, the first one is the make funciton which allows u to make a game object and then using the aadd function u can add it to the screen by calling the k.add fucntion or u can just call the k.add function from the start and pass in ur array of compents from the get go
// it an async fucniton beacuse we need to fetch the map.json data from the server and for that we are going to use a fetch call
const plyer = k.make([
    k.sprite("spritesheet",{anim:"idle-down"}),
    k.area({
    shape: new k.Rect(k.vec2(0,3), 10, 10) //this is going to create a rectange hitbox for the player game object, the first parameter is a postion which is  a vector 2  x and y object, so we want the hitbox to be drawn from the origin the +3 on the x axis from the origin of the player itself, the area is going to be placed from the origin itslef so that the player does not seem sinking to the ground , the second and third parameter are the width and height of the rectangle hitbox we want to create for the player it is 10 and 10 which is on purpose smaller than the sprite which is 16 by 16
        // by default the shape is roughly the shape of the sprite but sometimes u want to control the shape of your hitbox and u do that by passing it an object with a shape property
    }), // this component is used to specify the hitbox of the player or the game object but you can specify which collions you want the player game object or tis game object to ignore
    k.body(), // this component that makes our player a tangable physics object that can be colided with
    k.anchor("center"), // this component is used to specify the anchor point of the sprite by default the anchor point is at the bottom left corner of the sprite but we want it to be at the center of the sprite so that when we rotate or flip the sprite it rotates or flips around its center point so that it dosent get drawn from the top left corner and get drawns from the center of the sprite
    k.pos(),
    k.scale(scaleFactor), // pass scale factor cause we want it to be same as the sprite
    {
        speed: 250,
        direction: "down",
        isInDialogue: false, // we are putting this property to check if the player is in dialogue or not so that we can disable the movement of the player when in dialogue so that they can only see the text and open and close and not move around
    }, // in kaboom js if u want to hold properties for the game object u can pass in an array or components u want to add and then u can pass in an object where u can hold any properties u want for the game object by calling the the main object like player.speed
    "player", // this is a tag we are giving to the player game object so that we can easily identify it later on when we want to check for collisions if we give a tag we can use the onCollide function to know if this colided witht that to run that logic 
]); // the sprite component is used to display the sprite on the screen we are using the spritesheet we loaded earlier and we are also specifying the default animation to be idle-down, this is something we can do when we have a spirtesheet with many framaes and we want to specify a default animation to be played when the game starts and we have access to a seconf parameter where we can specify the default animation

for(const boundary of layers.objects)// for loop which is going to iterate through all the layers of the boundaries layer.objects when we are dealing with an object they have access to the objects property which is an array containing all the objects in the layer and the objects in that layer are objects with a x and y position width and height
{
    if(layer.name =="boundaries")
        {
        map.add([// we use the map ibject and we add another game object to it so that we have a child game object by taking an existing game object and using an add method on it 
        k.area({
            shape: new k.Rect(k.vec2(0), boundary.width, boundary.height),
        }),
        k.body({isStatic: true}),
        k.pos(boundary.x,boundary.y),
        boundary.name,
        k.setBackground(k.Color.fromHex("#311047")),
    ]);

    if (boundary.name)
    {
        player.onCollide(boundary.name, () => {
            player.isInDialogue = true;
            displayDialogue("TODO", () => (player.isInDialogue = false));// we are passing a callback function to the display dialogue function so that when the dialogue is done we can set the isInDialogue property to false so that the player can move again when the dialgue is closed
        })
    }
        } // we are checking if the layer name is boundaries becuase we only want to add the boundaries layer to the map game object

}

k.go("main"); // this is set before the scene as the starting point of the game where the game will start
// hit the f1 key to open the debug menu (only in dev mode) in kaboom js
