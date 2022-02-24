<template>
  <div>
    <h1>Wikidata QRank</h1>
    <p>QRank is ranking <a href="https://www.wikidata.org/">Wikidata entities</a>
      by aggregating page views on Wikipedia, Wikispecies, Wikibooks, Wikiquote,
      and other Wikimedia projects. For an introduction, see the <a href="https://github.com/brawer/wikidata-qrank/blob/main/README.md">README file</a>. For additional background,
      check out the
      <a href="https://github.com/brawer/wikidata-qrank/blob/main/doc/design.md">Technical Design Document</a>. The source code that computes the ranking is <a href="https://github.com/brawer/wikidata-qrank">here</a>.</p>
    <p>To <b>download</b> the latest QRank data, <a href="/download/qrank.csv.gz">click
      here</a>.  The file gets updated periodically; use
      <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Conditional_requests"
      >conditional requests</a> to check for updates.
      The QRank data is dedicated to the <b>Public Domain</b> via <a
        href="https://creativecommons.org/publicdomain/zero/1.0/">Creative
        Commons Zero 1.0</a>. To the extent possible under law, we have waived
      all copyright and related or neighboring rights to this work. This work
      is published from Switzerland, using infrastructure of the Wikimedia
      Foundation in the United States.</p>
  </div>

</template>

<script>
export default {
  name: 'Info'
}
</script>

<style scoped>
* {
  font-family: 'Roboto Slab', serif;
}
h1 {
  color: #0066ff;
  margin-left: 1em;
  margin-top: 1em;
}
p {
  margin-left: 3em;
  margin-right: 2em;
}
</style>
