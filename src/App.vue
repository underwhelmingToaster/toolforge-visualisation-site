<template>
  <div class="App">
    <Info />
    <Tabs />
    <component :is="currentView" />
  </div>
</template>

<script>
import { store } from '@/store.js'
import Tabs from '@/components/Tabs'
import QRankContent from '@/components/QRankContent'
import OSMViewsContent from '@/components/OSMViewsContent'
import NotFound from '@/components/NotFound'
import Info from '@/components/Info'
import axios from 'axios'

const routes = {
  '/': QRankContent,
  '/qrank': QRankContent,
  '/osm-views': OSMViewsContent
}

export default {
  name: 'App',
  components: {
    Tabs,
    Info
  },
  data () {
    return {
      currentPath: window.location.hash,
      store
    }
  },
  computed: {
    currentView () {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted () {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
    })
  },
  beforeCreate () {
    axios.get('https://qrank.wmcloud.org/download/qrank-stats.json').then(response => (store.qrankData = response.data))
    axios.get('https://qrank.wmcloud.org/download/osmviews-stats.json').then(response => (store.osmData = response.data))
  }
}
</script>

<style>
.App {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 8px;
}
</style>
