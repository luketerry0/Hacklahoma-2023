<template>
  <div class="home">
    <PixiJSCanvas @canvasLogic="canvasLogic" :backgroundColor="0x0000" />
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
  // Create Ships with initial random locations
  for (let idNum = 0; idNum < shipCoords.value.length; ++idNum) {
    // Initialize a colored ship
    const ship = PIXI.Sprite.from("http://"+ process.env.VUE_APP_IPV4_ADDRESS + ":3000/x-wing-" + (idNum + 1) + ".png");

    // Set image width and height
    ship.width = 60
    ship.height = 60

    // Setup the position of the ship
    ship.x = shipCoords.value[idNum][0];
    ship.y = shipCoords.value[idNum][1];

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
  socket.value = new WebSocket('ws://'+ process.env.VUE_APP_IPV4_ADDRESS + ':3000');


  socket.value.onopen = () => {
    socket.value?.send(JSON.stringify({
      "TYPE": "INITIALIZE",
      "WINDOW_X": window.innerWidth,
      "WINDOW_Y": window.innerHeight,
    }))
  }
  // configure onMessage
  socket.value.onmessage = (message) => {
    const contents = JSON.parse(message.data);

    console.log(Object.keys(message));

    shipCoords.value = JSON.parse(message.data)
  }

})

const isCollision = (object1: any, object2: any) => {
  const bounds1 = object1.getBounds();
  const bounds2 = object2.getBounds();

  return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + bounds1.width > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + bounds1.height > bounds2.y;

}
</script>