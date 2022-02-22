<template>
  <l-map
    :zoom="zoom"
    :center="center"
    class="map"
  >
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    ></l-tile-layer>
    <l-marker :lat-lng="markerLoc" v-if="displayMarker === true"/>
  </l-map>
</template>

<script>
import { LMap, LMarker, LTileLayer } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
import { store } from '@/store'

export default {
  name: 'Map',
  props: {
    jsonData: Object,
    currentTooltipRank: Number
  },
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  watch: {
    currentTooltipRank (val, _) {
      const markerLocation = this.getValueFromJson(val)
      this.displayMarker = markerLocation !== null
      this.markerLoc = markerLocation ?? [0, 0]
      store.currentLink = 'https://www.openstreetmap.org/#map=16/' + this.markerLoc[0] + '/' + this.markerLoc[1]
    }
  },
  data () {
    return {
      center: [49.1193089, 6.1757156],
      zoom: 2,
      markerLoc: [47.57, 7.26],
      displayMarker: false
    }
  },
  methods: {
    getValueFromJson (rank) {
      const item = this.jsonData.Samples.find(item => item[1] === rank)
      if (item === undefined) {
        return null
      } else {
        return item[0]
      }
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
