<template>
  <l-map
    :center="center"
    :zoom="zoom"
    class="map"
    style="width:700px; height: 500px"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    ></l-tile-layer>
    <l-control-layers />
  </l-map>
</template>

<script>
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer
  },
  data () {
    return {
      center: [49.1193089, 6.1757156],
      zoom: 12
    }
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom
    },
    centerUpdated (center) {
      this.center = center
    }
  }
}
</script>

<style scoped>
.map {
  position: absolute;
  width: 300px;
  height: 100px;
  overflow :hidden
}
</style>
