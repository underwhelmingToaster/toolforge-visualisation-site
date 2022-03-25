<template>
  <div id="map"></div>
</template>

<script>
/* eslint-disable new-cap */

import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet/dist/leaflet'
import * as markerSVG from '@/assets/marker.svg'
import { fromUrl } from 'geotiff'
import * as plotty from 'plotty'

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
  data () {
    return {
      geoTiffData: Object
    }
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
    const self = this

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)
    map.on('zoomend', function () {
      self.calculateWindow(self.geoTIFFImage)
      self.getValuesFromBoundaries()
    })
    marker = L.marker(this.markerLoc, { icon: icon })

    this.getValuesFromBoundaries()
  },
  methods: {
    getValuesFromBoundaries () {
      const url = 'https://qrank.wmcloud.org/download/osmviews.tiff'
      fromUrl(url)
        .then(async tiff => {
          this.geoTIFFImage = await tiff.getImage()
          console.log(this.geoTIFFImage.getBoundingBox())
          this.geoTiffData = await this.geoTIFFImage.readRasters({ window: [-100, -100, 100, 100] })
          this.calculateWindow(this.geoTIFFImage)
          this.createPlot(this.geoTiffData)
        })
    },
    createPlot (data) {
      const canvas = document.getElementById('plot')
      const max = Math.log10(Math.max.apply(null, data[0]))
      const plot = new plotty.plot({
        canvas,
        data: data[0].map(x => Math.log10(x)),
        width: 400,
        height: 400,
        domain: [0, max]
      })
      plot.render()
      window.open(plot.canvas.toDataURL('image/png'))
      console.log(plot)
    },
    calculateWindow (image) {
      const windowDimensions = this.calculateWindowDimensions(image)
      const imageHeight = image.getHeight()
      const imageWidth = image.getWidth()
      const center = map.getCenter()
      console.log(map.getBounds().getNorth())
      console.log(windowDimensions - imageHeight - imageWidth + center)
    },
    calculateWindowDimensions (image) {
      const width = map.getBounds().getEast() - map.getBounds().getWest()
      const height = map.getBounds().getNorth() - map.getBounds().getSouth()
      return [width, height]
    }
  }
}
</script>

<style scoped>
#map {
  height: 50px;
  position: absolute;
  overflow: hidden;
}
</style>
