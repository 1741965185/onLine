<template>
  <div class="errPage-container">
    401
  </div>
</template>

<script>

	export default {
		name: "Page401",
		data() {
			return {}
		},
		methods: {
			back() {
				if (this.$route.query.noGoBack) {
					this.$router.push({ path: "/" })
				} else {
					this.$router.go(-1)
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
  .errPage-container {
    width: 800px;
    max-width: 100%;
    margin: 100px auto;
  }
</style>