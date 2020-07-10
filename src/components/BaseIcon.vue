<template lang="pug">
  //- <div class="icon-wrapper">
  //-   <svg class="icon" :id="id" :width="width" :height="height" :fill="fill">
  //-     <use v-bind="{ 'xlink:href': '/feather-sprite.svg#' + name }" />
  //-   </svg>
  //- </div>
  .fun(
    :id="id"
    :width="width"
    :height="height"
    :style="{ 'background-color': fill }"
  )
    .morefun(:style="{ 'background-color': fill }")

</template>

<script>
export default {
  name: 'Icon',
  props: {
    id: [Number, String],
    name: String,
    width: {
      type: [Number, String],
      default: 15
    },
    height: {
      type: [Number, String],
      default: 15
    },
    fill: {
      type: String,
      default: 'none'
    }
  }
}
</script>

<style scoped lang='scss'>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.4);
  font-size: 1rem;
  font-weight: 600;
}
.icon {
  stroke-linecap: round;
  stroke-linejoin: round;
  margin-right: 2px;
}

.fun {
  margin: 2px;
  width: 15px;
  height: 15px;
  // transition: all .6s ease-out;
  border-radius: 50%;
  float: left;

  .morefun {
    width: 15px;
    height: 15px;
    transition: all 1.5s ease-out;
    border-radius: 50%;
    pointer-events: none;
  }

  &:hover .morefun {
    background: red;
    transform: scale(8);
    transition: all 0s ease-out;
  }
}
</style>
