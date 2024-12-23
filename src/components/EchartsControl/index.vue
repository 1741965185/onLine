<template>
	<div>
		<div class="echarts-control">
			<div class="echarts-left">
				<!--标题-->
				<slot name="title"></slot>
			</div>
			<div class="echarts-right">
				<!--btn时间-->
				<div class="echarts-select">
					<div v-for="(item,index) in options" :key="index"
							 :class="['select_item', {'select_active':selectCount === index}] "
							 @click="handleSelectClick(item,index)">
						{{ item.label }}
					</div>
				</div>
				<!--	时间范围-->
				<div class="echarts-picker">
					<el-date-picker
						v-model="propValue.timePicker"
						type="daterange"
						format="yyyy-MM-dd"
						value-format="yyyy-MM-dd"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						prefix-icon="el-icon-time"
						@change="changeValue"
						unlink-panels
						:picker-options="pickerOptions">
					</el-date-picker>
				</div>
			</div>
		</div>

		<div class="echarts_currency">
			<div class="currency_operation currency-right">
				<div class="currency_title">商户号：</div>
				<el-select v-model="propValue.merNo" @change="merNoChange" class="select-merNo">
					<el-option
						v-for="item in $store.getters.userMerNo"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>
			<!--币种选择框-->
			<div class="currency_operation">
				<div class="currency_title">结算币种：</div>
				<el-select v-model="propValue.currency" @change="currencyChange">
					<el-option
						v-for="item in $store.getters.jsCurrency"
						:key="item.value"
						:label="item.label"
						:value="item.value">
					</el-option>
				</el-select>
			</div>
			<!--弹出框-->
			<div class="currency_checkbox" v-if="popoverCheckbox">
				<el-popover
					placement="bottom"
					trigger="click"
					popper-class="echarts_popover">
					<el-checkbox-group v-model="propValue.checkList" @change="popoverChange">
						<el-checkbox v-for="item in checkListArr" :label="item.value" :key="item.value">{{ item.label }}
						</el-checkbox>
					</el-checkbox-group>
					<el-button slot="reference" icon="el-icon-setting" circle></el-button>
				</el-popover>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		popoverCheckbox: {
			type: Boolean,
			default: false,
		},
		disCode: {
			type: String,
			default: "0",
		},
	},
	data() {
		return {
			propValue: {
				timePicker: "",
				merNo: "0",
				currency: this.disCode,
				checkList: [],
			},
			selectCount: 0,
			options: [{
				value: `${this.dayjs().subtract(1, "day").format("YYYY-MM-DD")} 00:00:00,${this.dayjs().subtract(1, "day").format("YYYY-MM-DD")} 23:59:59`,
				label: "昨天",
			}, {
				value: `${this.dayjs().subtract(7, "day").format("YYYY-MM-DD")} 00:00:00,${this.dayjs().format("YYYY-MM-DD")} 23:59:59`,
				label: "近7天",
			}, {
				value: `${this.dayjs().subtract(30, "day").format("YYYY-MM-DD")} 00:00:00,${this.dayjs().format("YYYY-MM-DD")} 23:59:59`,
				label: "近30天",
			}],
			checkListArr: [
				{ value: "1", label: "待结算金额" },
				{ value: "2", label: "拒付金额" },
				{ value: "3", label: "交易保证金" },
				{ value: "4", label: "退款金额" },
				{ value: "5", label: "手续费" },
				{ value: "6", label: "异常处理费" },
			],
			pickerOptions: {
				disabledDate: (time) => {
					let nowDate = new Date(); //现在时间
					let oneDay = 1000 * 60 * 60 * 24; //一天时间
					let oneYearLater = new Date(nowDate.getTime() - (oneDay * 90));
					return nowDate <= time.getTime() || oneYearLater >= time.getTime();//注意是||不是&&
				},
			},
		};
	},
	created() {
		this.propValue.timePicker = [
			`${this.dayjs().subtract(1, "day").format("YYYY-MM-DD")} 00:00:00`,
			`${this.dayjs().subtract(1, "day").format("YYYY-MM-DD")} 23:59:59`,
		];
	},
	watch: {
		disCode:function(newData, oldVal){
			this.propValue.currency = newData
		}
	},
	mounted() {
		this.upDataEcharts();
	},
	methods: {
		handleSelectClick(item, index) {
			this.selectCount = index;
			this.propValue.timePicker = item.value.split(",");
			this.upDataEcharts();
		},
		changeValue(value) {
			this.propValue.timePicker = [value[0] + " 00:00:00", value[1] + " 23:59:59"];
			let hasItem = this.options.filter((item, index) => {
				if (item.value === this.propValue.timePicker.toString()) {
					this.selectCount = index;
					return item;
				}
			});
			if (hasItem.length < 1) {
				this.selectCount = -1;
			}
			this.upDataEcharts();
		},
		merNoChange() {
			this.upDataEcharts();
		},
		currencyChange() {
			this.upDataEcharts();
		},
		popoverChange() {
			this.upDataEcharts();
		},
		upDataEcharts() {
			this.$emit("upDataList", this.propValue);
		},
	},
};
</script>
<style lang="less" scoped>
.echarts-control {
	height: 55px;
	border: 1px solid #DBDFEA;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 24px;

	.echarts-left {
		display: flex;
		align-items: center;

		.echarts-title {
			font-size: 14px;
			font-weight: 500;
			color: #364A63;
			line-height: 16px;
		}
	}

	.echarts-right {
		display: flex;
		align-items: center;

		.echarts-select {
			display: flex;

			.select_item {
				width: 72px;
				height: 30px;
				background: #FFFFFF;
				border-radius: 4px;
				border: 1px solid #DBDFEA;
				font-size: 12px;
				font-weight: 500;
				color: #526484;
				line-height: 30px;
				text-align: center;
				margin: 0 10px 0 0;
				box-sizing: border-box;
				cursor: pointer;
			}

			.select_active {
				background: #F5F6FA;
			}
		}

		.echarts-picker {
			width: 300px;
			height: 30px;
			margin: 0 0 0 10px;
		}
	}
}

.echarts_currency {
	height: 56px;
	border-left: 1px solid #DBDFEA;
	border-right: 1px solid #DBDFEA;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 0 24px;

	.currency_operation {
		height: 32px;
		display: flex;
		align-items: center;

		.currency_title {
			font-size: 14px;
			font-weight: 400;
			color: #526484;
			line-height: 20px;
		}

		.select-merNo {
			width: 120px;
		}
	}

	.currency-right {
		margin: 0 30px 0 0;
	}

	.currency_checkbox {
		width: 34px;
		height: 34px;
		margin: 0 0 0 20px;
	}
}


/deep/ .el-select {
	width: 96px;
	height: 32px;

	.el-input {
		height: 100%;
		line-height: 1;

		.el-input__inner {
			height: 100%;
			line-height: 1;
		}

		.el-select__caret {
			line-height: 33px;
		}
	}
}

/deep/ .el-date-editor {
	height: 100%;
	width: 100%;

	.el-input__icon {
		line-height: 22px;
	}

	.el-range-separator {
		line-height: 22px;
		font-size: 12px;
	}
}

/deep/ .el-button {
	width: 100%;
	height: 100%;
	padding: 0;

	&:focus {
		background: #E5E9F2;
	}

	&:active {
		border-color: #E5E9F2;
	}
}
</style>

<style lang="less">
.echarts_popover {
	min-width: auto;
	width: 130px !important;
	padding: 19px !important;
	box-sizing: border-box !important;

	.el-checkbox {
		margin: 10px 0 0 0;

		&:nth-of-type(1) {
			margin: 0 0 0 0;
		}

		.el-checkbox__label {
			font-size: 12px !important;
			font-weight: 400 !important;
			color: #526484 !important;
			line-height: 17px !important;
		}
	}
}
</style>
