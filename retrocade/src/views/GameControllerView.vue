<template>
  <div class="home">
    <PixiJSCanvas @canvasLogic="canvasLogic" />
  </div>
</template>
  
<script setup lang="ts">
// defines a view for the controller used to control the games
import { Options, Vue } from 'vue-class-component';
import * as PIXI from 'pixi.js';
import PixiJSCanvas from '../components/PixiJSCanvas.vue';

const backgroundColor = 4;

const canvasLogic = (app: PIXI.Application) => {

  // This creates a texture from a 'bunny.png' image
  const bunny = PIXI.Sprite.from("http://localhost:3000/dog.png");

  bunny.width = 150;
  bunny.height = 150;

  // Setup the position of the bunny
  bunny.x = window.innerWidth / 2;
  bunny.y = window.innerWidth / 2;

  // Rotate around the center
  bunny.anchor.x = 0.5;
  bunny.anchor.y = 0.5;

  bunny.eventMode = 'static'
  bunny.on('pointerdown', (event : any) => { console.log("YEAH") });

  // Add the bunny to the scene we are building
  app.stage.addChild(bunny);

  // Listen for frame updates
  app.ticker.add(() => {
    // each frame we spin the bunny around a bit
    bunny.rotation += 0.01;
  });
}
</script>
  