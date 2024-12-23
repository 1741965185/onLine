<template>
  <el-select v-model="pageSize">
    <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
	export default {
		name: "PageSizeSelect",
		props: {
			limit: {
				type: Number,
				default: 15,
			},
		},
		data() {
			return {
				options: [
					{ label: "15", value: 15 },
					{ label: "50", value: 50 },
					{ label: "100", value: 100 },
					{ label: "300", value: 300 },
					{ label: "500", value: 500 },
				], // 分页列表
			}
		},
		computed: {
			pageSize: {
				get() {
					return this.limit
				},
				set(val) {
					this.$emit("update:limit", val)
					this.$emit("changeSize")
				},
			},
		},
	}
</script>

<style scoped>

</style>