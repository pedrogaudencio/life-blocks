<template lang='pug'>
  .selected-activity(
    v-if='activity.title'
    :style="{ 'background-color': activity.color }"
  )
    | {{ activity.title }}
  .selected-activity(v-else :style="{ 'background-color': activity.color }")
    | Empty space
  
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SelectedActivityBar',
  computed: {
    ...mapState(['activity'])
  }
}
</script>

<style lang="scss" scoped>
.selected-activity {
  position: fixed;
  right: 2rem;
  top: 1rem;
  width: 10rem;
  padding: 1rem;
  background-color: white;
  border-radius: .5rem;
  color: white;
}
</style>
