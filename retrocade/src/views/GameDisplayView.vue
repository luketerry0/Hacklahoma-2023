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
import { appendToMemberExpression } from '@babel/types';

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

const laserBeams = ref<PIXI.Container>(new PIXI.Container())

const shipIsHit = ref<Array<boolean>>([
  false, false, false, false, false, false, false, false,
]
)

const canvasLogic = async (app: PIXI.Application) => {


  // Create Ships with initial random locations
  for (let idNum = 0; idNum < shipCoords.value.length; ++idNum) {
    // Initialize a colored ship
    const ship = PIXI.Sprite.from("http://" + process.env.VUE_APP_IPV4_ADDRESS + ":3000/x-wing-" + (idNum + 1) + ".png");
    ship.anchor.x = 0.5;
    ship.anchor.y = 1.2;

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
    // Add functions to move ships
    for (let i = 0; i < shipCoords.value.length; i++) {

      for (let j = 0; j < laserBeams.value.children.length; ++j) {
        if (isCollision(app.stage.children[i], laserBeams.value.children[j])) {
          laserBeams.value.removeChildAt(j)
          //console.log("HIT")
          shipIsHit.value[i] = true
          app.stage.children[i].x = -50
          app.stage.children[i].y = -50
        }
      }

      if (!shipIsHit.value[i]) {
        app.stage.children[i].x = shipCoords.value[i][0];
        app.stage.children[i].y = shipCoords.value[i][1];
        app.stage.children[i].rotation = shipCoords.value[i][2];
      }
    }

    // Add the laser beams
    // move lasers forward
    app.stage.addChild(laserBeams.value as PIXI.Container);
    for (let i = 0; i < laserBeams.value.children.length; i++) {
      laserBeams.value.children[i].x += -7 * Math.sin(laserBeams.value.children[i].rotation);
      laserBeams.value.children[i].y += 7 * Math.cos(laserBeams.value.children[i].rotation);

      // remove the laser if it's off screen
      if (laserBeams.value.children[i].x > window.innerWidth || laserBeams.value.children[i].y > window.innerHeight) {
        laserBeams.value.removeChildAt(i);
      }
    }
  });
}

onMounted(() => {
  // Create WebSocket to reveive information from backend about:
  // Ships (IDs) and their location
  // connect to a websocket
  socket.value = new WebSocket('ws://' + process.env.VUE_APP_IPV4_ADDRESS + ':3000');


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

    if (Object.keys(contents).includes('player_num')) {
      socket.value?.send(JSON.stringify({ "TYPE": "SET_HOST", "PLAYER": contents.player_num }))
    } else if (Object.keys(contents).includes('LASER')) {
      // spawn a sprite on that player
      if (!shipIsHit.value[contents.PLAYER - 2]) {
        const coords = shipCoords.value[contents.PLAYER - 2];

        const Rlaser = PIXI.Sprite.from("http://" + process.env.VUE_APP_IPV4_ADDRESS + ":3000/laser.png");
        const Llaser = PIXI.Sprite.from("http://" + process.env.VUE_APP_IPV4_ADDRESS + ":3000/laser.png");

        Rlaser.width = 15;
        Rlaser.height = 15;
        //Llaser.width = 15;
        //Llaser.height = 15;
        Rlaser.x = coords[0];
        Rlaser.y = coords[1];
        //Llaser.x = coords[0] - 15 * Math.cos(coords[2]);
        //Llaser.y = coords[1] - 15 * Math.sin(coords[2]);

        Rlaser.rotation = coords[2];
        //Llaser.rotation = coords[2];
        laserBeams.value.addChild(Rlaser)
        //laserBeams.value.addChild(Llaser)
      }
    } else {
      shipCoords.value = contents
    }
  }

})

// Method that returns if there was collision between two object
const isCollision = (object1: any, object2: any) => {
  const bounds1 = object1.getBounds();
  const bounds2 = object2.getBounds();

  //return ((object1.x - bounds1.minX) > (object1.maxX - object1.minX) && (object1.y - bounds1.minY) > (object1.maxY - object1.minY))

  return bounds1.x < bounds2.x + bounds2.width - 20
    && bounds1.x + bounds1.width - 20 > bounds2.x
    && bounds1.y < bounds2.y + bounds2.height - 20
    && bounds1.y + bounds1.height - 20 > bounds2.y;

}
</script>