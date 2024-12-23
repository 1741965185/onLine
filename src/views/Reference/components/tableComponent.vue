<template>
	<!-- 表格组件 -->
	<div>
		<!-- 没有表头 -->
		<template v-if="type === 1">
			<el-table :data="tableList" style="width: 95%" :show-header="false" border :cell-style="columnStyle">
				<el-table-column prop="title" width="300"> </el-table-column>
				<el-table-column prop="text"> </el-table-column>
			</el-table>
		</template>
		<!-- 左边有分类 -->
		<template v-else-if="type === 2">
			<el-table
				:data="tableList"
				style="width: 95%"
				border
				:header-cell-style="{ background: '#f8f9fc', color: '#526484' }"
				:span-method="objectSpanMethod"
			>
				<el-table-column prop="title" width="40"> </el-table-column>
				<el-table-column prop="name" label="变量命名" width="100"> </el-table-column>
				<el-table-column prop="length" label="长度定义" width="100"> </el-table-column>
				<el-table-column prop="varName" label="变量名称" width="100"> </el-table-column>
				<el-table-column prop="flag" label="是否必填" width="50"> </el-table-column>
				<el-table-column prop="bz" label="备注"> </el-table-column>
			</el-table>
		</template>
		<!-- 有表头 -->
		<template v-else-if="type === 3">
			<el-table
				:data="tableList"
				style="width: 95%"
				border
				:header-cell-style="{ background: '#f8f9fc', color: '#526484' }"
			>
				<el-table-column prop="name" label="变量命名" width="100"> </el-table-column>
				<el-table-column prop="length" label="长度定义" width="100"> </el-table-column>
				<el-table-column prop="varName" label="变量名称" width="100"> </el-table-column>
				<el-table-column prop="flag" label="是否为空" width="50"> </el-table-column>
				<el-table-column prop="bz" label="备注"> </el-table-column>
			</el-table>
		</template>
	</div>
</template>
<script>
export default {
	props: ["tableList", "type"],
	data() {
		return {
			spanArr: [],
		};
	},
	created() {
		this.getSpanArr(this.tableList, "title");
	},
	methods: {
		columnStyle({ row, column, rowIndex, columnIndex }) {
			if (columnIndex == 0) {
				return "background:#F8F9FC;color:#526484;fontSize:14px;";
			} else {
				return "color:#526484;fontSize:12px;";
			}
		},
		// 处理表格分列
		getSpanArr(data, params) {
			let pos = 0;
			const redata = data.map(v => v[params]);
			redata.reduce((old, cur, i) => {
				if (i === 0) {
					this.spanArr.push(1);
					pos = 0;
				} else {
					if (cur === old) {
						this.spanArr[pos] += 1;
						this.spanArr.push(0);
					} else {
						this.spanArr.push(1);
						pos = i;
					}
				}
				return cur;
			}, {});
		},
		objectSpanMethod({ row, column, rowIndex, columnIndex }) {
			if (columnIndex === 0) {
				const _row = this.spanArr[rowIndex];
				const _col = _row > 0 ? 1 : 0;
				return {
					rowspan: _row,
					colspan: _col,
				};
			}
		},
	},
};
</script>