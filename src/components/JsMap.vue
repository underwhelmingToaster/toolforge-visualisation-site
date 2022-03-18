<template>
  <div id="map"></div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet/dist/leaflet'
import * as markerSVG from '@/assets/marker.svg'

let map
let marker
const icon = L.icon({
  iconUrl: markerSVG,
  iconSize: [50, 50]
})

export default {
  name: 'JsMap',
  props: {
    markerLoc: Array,
    displayMarker: Boolean,
    geoTiffImage: Object
  },
  watch: {
    markerLoc (val, _) {
      if (marker.map === null) {
        marker.addTo(map)
      }
      marker.setLatLng(val)
    },
    displayMarker (val, _) {
      if (val) {
        marker.addTo(map)
      } else {
        marker.remove()
      }
    }
  },
  mounted () {
    map = L.map('map').setView([40.505, 11.00], 2)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)
    marker = L.marker(this.markerLoc, { icon: icon })
  }
}
</script>

<style scoped>
#map {
  height: 180px;
  position: absolute;
  overflow: hidden;
}

</style>
