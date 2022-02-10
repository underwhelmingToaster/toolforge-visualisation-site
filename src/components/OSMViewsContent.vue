<template>
  <Map class="Map"/>
</template>

<script>
import Map from '@/components/Map'
export default {
  name: 'OSMViewsContent',
  components: {
    Map
  }
}
</script>

<style scoped>

.Map {
  width: 300px;
  height: 100px;
}
</style>
