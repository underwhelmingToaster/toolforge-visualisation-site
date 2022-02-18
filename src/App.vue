<template>
  <div class="App">
    <Tabs />
    <QRankContent :json-data=qrankData v-if="store.tab === 0" />
    <OSMViewsContent :json-data=osmData v-else-if="store.tab === 1"/>
  </div>
</template>

<script>
import { store } from '@/store.js'
import Tabs from '@/components/Tabs'
import QRankContent from '@/components/QRankContent'
import OSMViewsContent from '@/components/OSMViewsContent'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Tabs,
    QRankContent,
    OSMViewsContent
  },
  data () {
    return {
      store,
      qrankData: '',
      osmData: ''
    }
  },
  beforeCreate () {
    axios.get('https://qrank.wmcloud.org/download/qrank-stats.json').then(response => (this.qrankData = response.data))
    axios.get('https://qrank.wmcloud.org/download/osmviews-stats.json').then(response => (this.osmData = response.data))
  }
}
</script>

<style>
.App {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 8px;
}
</style>
