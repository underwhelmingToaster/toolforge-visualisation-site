<template>
  <div id="map"></div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet/dist/leaflet'
import * as markerSVG from '@/assets/marker.svg'
import * as L2 from 'leaflet-geotiff/leaflet-geotiff'
let map
let marker

export default {
  name: 'JsMap',
  props: {
    markerLoc: Array
  },
  watch: {
    markerLoc (val, _) {
      marker.setLatLng(val)
    }
  },
  mounted () {
    const icon = L.icon({
      iconUrl: markerSVG,
      iconSize: [50, 50]
    })

    const opts = {
    }

    map = L.map('map').setView([51.505, -0.09], 2)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    const geoTIFFlayer = new L2.LeafletGeotiff('https://qrank.wmcloud.org/download/osmviews.tiff', opts)
    geoTIFFlayer.addTo(map)

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
