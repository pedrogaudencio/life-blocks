<template lang='pug'>
  .selected-activity(
    v-if='activity'
    :style="{ 'background-color': activity.color || '#434343' }"
  )
    template(v-if='activity && activity.title')
      | {{ activity.title }}
      .description
        | {{ activity.description }}
      .date-holder
        | {{ activity.startDate }} - {{ activity.endDate }}
    teamplate(v-else)
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
  transition: all ease-in .3s;
}
.description {
  margin-top: .2rem;
  font-size: 0.7rem;
}
.date-holder {
  margin-top: 1rem;
  font-size: 0.7rem;
}
</style>
