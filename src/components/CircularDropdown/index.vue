<template>
  <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        <span class="icon-hover-effect">
          <svg-icon icon-class="more"/>
        </span>
      </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
          v-for="(item,i) in list"
          :command="item"
          :key=" 'drop-item-' +  i">
        <svg-icon :icon-class="item.icon"/>
        {{item.label}}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
	export default {
		name: "CircularDropdown",
		props: {
			list: {
				required: true,
				type: Array,
			},
			row: {
				required: true,
				type: Object,
			},
		},
		methods: {
			handleCommand(command) {
				this.$emit("command", { "command": command, data: this.row })
			},
		},
	}
</script>

<style scoped lang="less">
  .el-dropdown-menu {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    padding: 0 !important;

    li {
      color: #526484;
      font-size: 12px;
      font-weight: 500;
      transition: all .4s;
      display: flex;
      align-items: center;
    }


    li + li {
      border-top: 1px solid #e5e9f2;
    }

    li:hover {
      color: #6576ff;
      background: #f5f6fa;
    }

    svg.svg-icon {
      font-size: 16px;
      margin-right: 10px;
    }
  }
</style>