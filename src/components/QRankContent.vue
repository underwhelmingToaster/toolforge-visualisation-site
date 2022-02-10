<template>
  qrank
  <DistributionGraph file-url="https://qrank.wmcloud.org/download/osmviews-stats.json" />
</template>

<script>
import DistributionGraph from '@/components/DistributionGraph'
export default {
  name: 'QRank-content',
  components: {
    DistributionGraph
  }
}
</script>

<style scoped>

</style>
