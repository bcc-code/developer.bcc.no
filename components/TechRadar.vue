<template>
  <div>
    <radar></radar>
    <radar-legend></radar-legend>
  </div>
</template>

<script>
import RadarLegend from './RadarLegend.vue'
import Radar from './Radar.vue'

export default {
  name: 'TechRadar',
  components: {
    RadarLegend,
    Radar
  }
}
</script>
