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
import { nextTick, onMounted, ref } from 'vue';

const socket = ref<WebSocket>();

// Temporary variables that represent web socket information
const shipCoords = ref<Array<Array<number>>>([
  [-50, -50],
  [-50, -50],
  [-50, -50],
  [-50, -50],
  [-50, -50],
  [-50, -50],
  [-50, -50],
  [-50, -50]
])

const canvasLogic = async (app: PIXI.Application) => {
  // Listen for frame updates
  for (let idNum = 0; idNum < shipCoords.value.length; ++idNum) {
    // This creates a texture from a 'dog.png' image
    const ship = PIXI.Sprite.from("http://10.204.249.206:3000/ship.png");

    // Set image width and height
    ship.width = 30
    ship.height = 30

    // Setup the position of the ship
    ship.x = shipCoords.value[idNum][0];
    ship.y = shipCoords.value[idNum][1];

    // Rotate around the center
    ship.anchor.x = 0.5;
    ship.anchor.y = 0.5;

    ship.eventMode = 'static'

    // Add the ship to the scene we are building
    app.stage.addChild(ship);
  }
  app.ticker.add(() => {
    // Add functions to move characters
    for (let i = 0; i < shipCoords.value.length; i++){
      app.stage.children[i].x = shipCoords.value[i][0];
      app.stage.children[i].y = shipCoords.value[i][1];
    }
  });
}

onMounted(() => {
  // Create WebSocket to reveive information from backend about:
  // Ships (IDs) and their location
  // connect to a websocket
  socket.value = new WebSocket('ws://10.204.249.206:3000/game');


  socket.value.onopen = () => {
    socket.value?.send(JSON.stringify({
      "MODE": "INITIALIZE",
      "WINDOW_X": window.innerWidth,
      "WINDOW_Y": window.innerHeight
    }))
  }
  // configure onMessage
  socket.value.onmessage = (message) => {
    shipCoords.value = JSON.parse(message.data)
  }

})
</script>