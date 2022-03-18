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
    map = L.map('map').setView([51.505, -0.09], 2)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)
    marker = L.marker(this.markerLoc, { icon: icon })

    this.generateHeatmap()
  },
  methods: {
    generateHeatmap () {
      const parseGeoraster = require('georaster')
      const GeoRasterLayer = require('georaster-layer-for-leaflet')

      const url = 'https://qrank.wmcloud.org/download/osmviews.tiff'

      fetch(url)
        .then(response => response.arrayBuffer())
        .then(console.log('1'))
        .then(arrayBuffer => {
          parseGeoraster(arrayBuffer).then(georaster => {
            console.log('georaster:', georaster)
            const layer = new GeoRasterLayer({
              georaster: georaster,
              opacity: 0.7,
              pixelValuesToColorFn: values => values[0] === 42 ? '#ffffff' : '#000000',
              resolution: 64
            })
            layer.addTo(map)
          })
        })
    }
  }
}
</script>

<style scoped>
#map {
  position: absolute;
  overflow: hidden;
}

</style>
