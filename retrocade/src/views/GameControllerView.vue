<template>
  <div class="home">
    <PixiJSCanvas @canvasLogic="canvasLogic" :backgroundColor="0x56B5BF" />
  </div>
</template>
  
<script setup lang="ts">
// defines a view for the controller used to control the games
import * as PIXI from 'pixi.js';
import PixiJSCanvas from '../components/PixiJSCanvas.vue';
import { Joystick } from "pixi-virtual-joystick";
import { onMounted, ref } from 'vue';

// ref to hold the websocket
const socket = ref<WebSocket>();
const playerNumber = ref<Number>(0);

const canvasLogic = (app: PIXI.Application) => {

  // create a joystick
  const INNER_RADIUS = 50;
  const OUTER_RADIUS = 150;
  const joystickBg = PIXI.Sprite.from("http://10.204.249.206:3000/black_circle.png");
  const joystick = PIXI.Sprite.from('http://10.204.249.206:3000/red_circle.png')

  // Setup the size of the joystick
  joystickBg.width = OUTER_RADIUS * 2;
  joystickBg.height = OUTER_RADIUS * 2;
  joystick.width = INNER_RADIUS * 2;
  joystick.height = INNER_RADIUS * 2;

  // Setup the position of the joystick
  joystickBg.anchor.set(0.5);
  joystick.anchor.set(0.5);
  joystickBg.x = window.innerWidth / 2;
  joystickBg.y = window.innerHeight * (1 / 4);
  joystick.x = window.innerWidth / 2;
  joystick.y = window.innerHeight * (1 / 4);

  // Allow interactions with the joystick
  joystick.eventMode = "static";

  // Allow dragging within the joystick
  joystick.on('pointermove', function (e) {
    const adjustedCoords = [e.clientX - joystickBg.x, e.clientY - joystickBg.y]
    if ((adjustedCoords[0] ** 2 + adjustedCoords[1] ** 2) ** (0.5) < OUTER_RADIUS * 1.10) {
      joystick.x = e.clientX;
      joystick.y = e.clientY;

      // send input through the socket
      socket.value?.send(JSON.stringify({'TYPE': 'JOYSTICK', 'COORDS' : adjustedCoords, 'PLAYER': playerNumber.value}))
    }
  });

  // reset position when pointer is let go
  joystick.on('pointerup', function (e) {
    joystick.x = joystickBg.x;
    joystick.y = joystickBg.y;
  })

  // create two buttons
  const button1 = PIXI.Sprite.from('http://10.204.249.206:3000/red_circle.png')
  const button2 = PIXI.Sprite.from('http://10.204.249.206:3000/red_circle.png')

  // set button dimensions
  button1.width = INNER_RADIUS * 2;
  button1.height = INNER_RADIUS * 2;
  button1.anchor.set(0.5);
  button2.width = INNER_RADIUS * 2;
  button2.height = INNER_RADIUS * 2;
  button2.anchor.set(0.5);


  // place buttons
  button1.x = window.innerWidth / 4;
  button1.y = window.innerHeight * (5 / 8);

  button2.x = window.innerWidth * (5 / 8);
  button2.y = window.innerHeight * (6 / 8);

  // button functionality
  button1.eventMode = "static";
  button2.eventMode = "static";
  button1.on('pointerdown', function (e) {
    // send input through the socket
    socket.value?.send(JSON.stringify({'TYPE': 'BUTTON', 'BUTTON' : 'B', 'PLAYER': playerNumber.value}))
  })
  button2.on('pointerdown', function (e) {
    // send input through the socket
    socket.value?.send(JSON.stringify({'TYPE': 'BUTTON', 'BUTTON' : 'A', 'PLAYER': playerNumber.value}))
  })


  // add the items to the stage
  app.stage.addChild(button1)
  app.stage.addChild(button2)
  app.stage.addChild(joystickBg)
  app.stage.addChild(joystick)
}

onMounted(() => {
  // connect to a websocket
  socket.value = new WebSocket('ws://10.204.249.206:3000/');

  // configure onMessage
  socket.value.onmessage = (message) =>{
    playerNumber.value = JSON.parse(message.data)["player_num"]
    console.log(playerNumber.value)
  }

  socket.value.onclose = () => {
    socket.value?.send(JSON.stringify({'TYPE': 'DISCONNECT', "PLAYER": playerNumber.value}))
  }
})
</script>
  