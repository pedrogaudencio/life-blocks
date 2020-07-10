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
        | {{ formatDate(activity.startDate) }} - {{ formatDate(activity.endDate) }} ({{activity.durationInDays}} days)
    template(v-else)
      | Empty space
      .date-holder
        | {{ formatDate(activity.startDate) }} - {{ formatDate(activity.endDate) }} ({{activity.durationInDays}} days)

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SelectedActivityBar',
  props: {
    activity: Object
  },
  data () {
    return {
      start: this.formatDate(this.activity.startDate),
      end: this.formatDate(this.activity.endDate)
    }
  },
  computed: {
    ...mapState(['activity'])
  },
  methods: {
    formatDate(date) {
      console.log(date)
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
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
