<template>
  <DistributionGraph :json-data=jsonData :y-log=true />
</template>

<script>
import DistributionGraph from '@/components/DistributionGraph'
import jsonData from '../assets/qrank-stats.json'
export default {
  name: 'QRank-content',
  data () {
    return {
      jsonData: jsonData
    }
  },
  components: {
    DistributionGraph
  }
}
</script>

<style scoped>

</style>
