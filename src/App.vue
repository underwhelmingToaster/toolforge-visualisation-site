<template>
  <div class="App">
    <Tabs />
    <QRankContent v-if="store.tab === 0" />
    <OSMViewsContent v-else-if="store.tab === 1"/>
  </div>

</template>

<script>
import { store } from '@/store.js'
import Tabs from '@/components/Tabs'
import QRankContent from '@/components/QRankContent'
import OSMViewsContent from '@/components/OSMViewsContent'

export default {
  name: 'App',
  components: {
    Tabs,
    QRankContent,
    OSMViewsContent
  },
  data () {
    return {
      store
    }
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
