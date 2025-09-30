const { defineConfig } = require("vite");

export defineConfig({
    base:"./",
    build:{
        minify: "terser",
    },
});