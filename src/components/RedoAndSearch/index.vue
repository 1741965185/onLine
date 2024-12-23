<template>
  <div class="pa" :style="{top:position.top + 'px',right:position.right + 'px'}">
    <div class="icon-hover-effect" @click="resetParams">
      <svg-icon icon-class="redo"/>
    </div>
    <div class="icon-hover-effect" @click="getList">
      <svg-icon icon-class="search"/>
    </div>
  </div>
</template>

<script>
	export default {
		name: "RedoAndSearch",
		props: {
			position: {
				type: [Object, Array, Number],
				default: function() {
					return { top: 14, right: 25 }
				},
			},
		},
		methods: {
			resetParams() {
				this.$emit("reset")
			},
			getList() {
				this.$emit("searchList")
			},
		},
	}
</script>