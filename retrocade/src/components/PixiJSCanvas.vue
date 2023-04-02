<template>
  <div class="connections">
    <canvas id="pixi"></canvas>
  </div>
</template>

<script setup lang="ts">
// This component creates a pixi.js canvas which covers the whole screen
import * as PIXI from 'pixi.js';
import { computed, nextTick, onMounted } from 'vue'

// Define the props that the component should use
const props = defineProps<{
  backgroundColor : Number,
}>()


// Define the function which the component should emit
const emit = defineEmits(['canvasLogic'])


const drawPixi = () => {
const app = new PIXI.Application({
    view: document.getElementById("pixi") as HTMLCanvasElement,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: props.backgroundColor,
    width: 350,
    height: 600
});

// Call the canvas logic function to animate the canvas
emit('canvasLogic', app)

}
onMounted(async () => {
  drawPixi();
})
</script>