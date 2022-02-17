<template>
  <l-map
    :zoom="zoom"
    :center="center"
    class="map"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    ></l-tile-layer>
  </l-map>
</template>

<script>
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  name: 'Map',
  props: {
    height: Number,
    width: Number
  },
  components: {
    LMap,
    LTileLayer
  },
  data () {
    return {
      center: [49.1193089, 6.1757156],
      zoom: 12
    }
  }
}
</script>

<style scoped>
.map {
  position: absolute;
  overflow: hidden;
}
</style>
