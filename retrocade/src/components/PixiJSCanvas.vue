<template>
  <div class="connections">
    <canvas id="pixi"></canvas>
  </div>
</template>

<script setup lang="ts">
// This component creates a pixi.js canvas which covers the whole screen
import * as PIXI from 'pixi.js';
import { computed, onMounted } from 'vue'

// Define the props that the component should use
/*
const props = defineProps<{
  backgroundColor : Number,
}>()
*/

// Define the function which the component should emit
const emit = defineEmits(['canvasLogic'])


const drawPixi = async () => {
const app = new PIXI.Application({
    view: document.getElementById("pixi") as HTMLCanvasElement,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: 0x6495ed,
    width: window.innerWidth,
    height: window.innerHeight
});

// Call the canvas logic function to animate the canvas
emit('canvasLogic', app)

}
onMounted(() => {
  drawPixi();
})
</script>