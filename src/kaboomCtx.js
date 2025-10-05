import kaboom from "kaboom";
export const k=kaboom({
    global: false,
    touchToMouse: true,
    canvas: document.getElementById("game"),
});
// the objects layer contains the boundaries and interactable objects in the map in the form of arrays where import things like x and y coordinates and arrays are stored as objects
// if the layer is a tile layer the data is a 1d array of tile ids and 0 is the absence of a frame 
//in kaboom js it is more effeicient to use a 2d array for the map data or just export the tiles as a single png file and use that instead
// in kaboom library when u create a game object it is perforamace insentive u can use a sprite sheet or a single image for the entire map
// this is because kaboom js uses webGL for rendering and it is optimized for rendering large images
// for layers which are not tiles it is more effiecent cause it becomes invisible
// u can also use the on draw function to draw the map instead of using a tilemap
// this is more effiecent cause u can control the rendering and only draw what is visible
// u could also crop the sprite image for a smaller image only containing hte characters and use that instead of the entire sprite sheet
// this is more effiecent cause u are only loading the characters and not the entire sprite
// it is very important beacuase of memory management and loading times for web games especially on mobile devices
// so for the map it is better to use a single image for the entire map or a 2d array for the tile data
// for the characters it is better to use a sprite sheet or a single image for the characters
// for the background it is better to use a single image for the background