<template>
    <div class="home">
      <PixiJSCanvas @canvasLogic="canvasLogic" :backgroundColor="0x6495ed" />
    </div>
  </template>
    
  <script setup lang="ts">
  // defines a view for the controller used to control the games
  import { Options, Vue } from 'vue-class-component';
  import * as PIXI from 'pixi.js';
  import PixiJSCanvas from '../components/PixiJSCanvas.vue';
  import { onMounted, ref } from 'vue';
  
  const socket = ref<WebSocket>();
  const backgroundColor = 4;
  
  // Temporary variables that represent web socket information
  const ships = require('./example.json')
  
  const canvasLogic = (app: PIXI.Application) => {
    
  for (let idNum = 0; idNum < ships.IDs.length; ++idNum) {
    // This creates a texture from a 'dog.png' image
    const ship = PIXI.Sprite.from("http://localhost:3000/ship.png");
    
    // Set image width and height
    ship.width = 30
    ship.height = 30
  
    // Setup the position of the ship
    ship.x = parseInt(ships.IDs[idNum].xloc)
    ship.y = parseInt(ships.IDs[idNum].yloc)
  
    // Rotate around the center
    ship.anchor.x = 0.5;
    ship.anchor.y = 0.5;
  
    ship.eventMode = 'static'
    ship.on('pointerdown', (event : any) => { console.log("YEAH") });
  
    // Add the ship to the scene we are building
    app.stage.addChild(ship);
  
    }
  
    // Listen for frame updates
    app.ticker.add(() => {
      // Add functions to move characters
      
    });
  }
  
  onMounted(() => {
    // Create WebSocket to reveive information from backend about:
    // Ships (IDs) and their location
    //socket.value = new WebSocket("")
  
  
  })
  </script>