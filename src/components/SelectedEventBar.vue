<template lang='pug'>
  .selected-event(
    v-if='event'
    :style="{ 'background-color': event.color || '#434343' }"
  )
    template(v-if='event && event.title')
      | {{ event.title }}
      .description
        | {{ event.description }}
      .date-holder
        | {{ formatDate(event.startDate) }} - {{ formatDate(event.endDate) }} ({{ event.duration }} {{ this.lifeView }})
    template(v-else)
      | Empty space
      .date-holder
        | {{ formatDate(event.startDate) }} - {{ formatDate(event.endDate) }} ({{ event.duration }} {{ this.lifeView }})

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SelectedEventBar',
  computed: {
    ...mapState(['event', 'lifeView'])
  },
  methods: {
    formatDate(date) {
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
  }
}
</script>

<style lang="scss" scoped>
.selected-event {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
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
