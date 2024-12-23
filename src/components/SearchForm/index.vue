// label：form的label内容(必填)
// prop: 值(必填)
// type: 什么类型的框(必填)
// width: 框的宽度（默认150px、233px）（可填）
// btn: 是否显示批量输入按钮（可填）
// maxLength: 最大长度（默认20位）（可填）
// placeholder: 提示（可填）
// linkage(商户联动必填，其余不填)
// change(select联动给后面的input的赋自己value的值，多选change='checkout',其余的不填)
// Vshow（判断当前是否显示）
// default（select的默认值。取值下标）
// dicData（select传输数据，异步使用()=>）
// pickerOptions: 时间180多少天前可以点击
// multiple select是否多选择
<template>
	<div class="search-form">
		<el-form :inline="true" :model="formInline">
			<div class="bg-F8F9FC search-form-wrapper clearfix pr">
				<div v-for="(item, index) in formInline.column" :key="item.prop">
					<el-form-item
						:label="item.label ? item.label + '：' : ''"
						v-if="item.hasOwnProperty('Vshow') === false || item.Vshow === true"
					>
						<!-- input || textarea-->
						<template v-if="item.type === 'input' || item.type === 'textarea'">
							<!-- input -->
							<el-input
								v-if="item.type === 'input'"
								:style="{ width: item.width ? item.width + 'px' : '150px' }"
								v-model="item[item.prop]"
								:placeholder=" (item.placeholder ? item.placeholder : item.label)"
								:maxlength="item.maxLength ? item.maxLength : 200"
								@blur="handleInputBlur(item.linkage ? true : false, item[item.prop])"
							></el-input>
							<!-- textarea -->
							<el-input
								v-if="item.type === 'textarea'"
								type="textarea"
								v-model="item[item.prop]"
								:placeholder="(item.placeholder ? item.placeholder : item.label)"
								:style="{ width: item.width ? item.width + 'px' : '300px' }"
								:maxlength="item.maxLength ? item.maxLength : 200"
							></el-input>
							<template v-if="item.btn">
								<el-button
									class="batch-btn"
									size="mini"
									icon="el-icon-plus"
									circle
									@click="openTextareaDialog('user', index, item.prop, item.linkage ? true : false)"
								></el-button>
							</template>
							<!-- 商户联动 -->
							<template v-if="item.linkage">
								<el-select
									filterable
									remote
									:remote-method="remoteMethod"
									v-model="item.subMerNo"
									:placeholder="$t('searchFrom.selectPlaceholder')"
									:style="[{ width: item.width ? item.width + 'px' : '150px' }, { marginLeft: '10px' }]"
									:disabled="linkAgeSelect"
								>
									<el-option
										v-for="item in childMerchantSelect"
										:key="item.value"
										:label="item.label"
										:value="item.value"
									></el-option>
								</el-select>
							</template>
						</template>
						<!-- select -->
						<template v-else-if="item.type === 'select'">
							<el-select
								v-model="item[item.prop]"
								:multiple="item.multiple"
								:collapse-tags="item.multiple"
								:placeholder="	(item.placeholder ? item.placeholder : item.label)"
								:style="{ width: item.width ? item.width + 'px' : '150px' }"
								@change="handleSelectChange($event,item.change ? true : false)"
							>
								<el-option
									v-for="(sel_item, index) in Array.isArray(item.dicData) ? item.dicData : item.dicData()"
									:key="index"
									:label="sel_item == '' ? '' : sel_item.label ? sel_item.label : ''"
									:value="sel_item.value ? sel_item.value : null"
								></el-option>
							</el-select>
						</template>
						<!-- DatePicker 日期选择器 -->
						<template v-else-if="item.type === 'picker'">
							<el-date-picker
								v-model="item[item.prop]"
								type="date"
								:placeholder="$t('searchFrom.selectLabel') + (item.placeholder ? item.placeholder : item.label) + $t('searchFrom.dateLabel')"
								value-format="yyyy-MM-dd"
								:clearable="false"
								:editable="false"
								:style="{ width: item.width ? item.width + 'px' : '233px' }"
							>
							</el-date-picker>
						</template>
						<!-- DateTimePicker 日期时间选择器 -->
<!--						没翻译4-->
						<template v-else-if="item.type === 'datetimerange'">
							<el-date-picker
								class="airclick-data-picker"
								v-model="item[item.prop]"
								type="datetimerange"
								:range-separator="$t('searchFrom.dateSeparator')"
								:start-placeholder="$t('searchFrom.startDatePlaceholder')"
								:end-placeholder="$t('searchFrom.endDatePlaceholder')"
								prefix-icon="el-icon-date"
								format="yyyy-MM-dd HH:mm:ss"
								value-format="yyyy-MM-dd HH:mm:ss"
								:default-time="['00:00:00', '23:59:59']"
								:clearable="false"
								:editable="false"
								unlink-panels
								:picker-options="item.pickerOptions ? pickerOptions : ''"
							>
							</el-date-picker>
						</template>
						<!-- daterange 日期时间选择器 -->
						<template v-else-if="item.type === 'daterange'">
							<el-date-picker
								class="airclick-data-picker daterange-w"
								v-model="item[item.prop]"
								type="daterange"
								:range-separator="$t('searchFrom.dateSeparator')"
								:start-placeholder="$t('searchFrom.startDatePlaceholder')"
								:end-placeholder="$t('searchFrom.endDatePlaceholder')"
								prefix-icon="el-icon-date"
								format="yyyy-MM-dd"
								value-format="yyyy-MM-dd"
								:clearable="false"
								:editable="false"
								unlink-panels
								:picker-options="item.pickerOptions ? pickerOptions : ''"
							>
							</el-date-picker>
						</template>
						<!-- Switch 开关 -->
						<template v-else-if="item.type === 'switch'">
							<el-switch v-model="item[item.prop]" active-value="1" inactive-value="0"></el-switch>
						</template>
						<!-- Checkbox 多选框 -->
						<template v-else-if="item.type === 'checkbox'">
							<el-checkbox-group v-model="item[item.prop]">
								<el-checkbox
									v-for="check_item in item.dicData"
									:key="check_item.value"
									:label="check_item.label"
									name="type"
								></el-checkbox>
							</el-checkbox-group>
						</template>
						<!-- Radio 单选框 -->
						<template v-else-if="item.type === 'radio'">
							<el-radio-group v-model="item[item.prop]">
								<el-radio
									v-for="radio_item in item.dicData"
									:key="radio_item.value"
									:label="radio_item.label"
								></el-radio>
							</el-radio-group>
						</template>
					</el-form-item>
				</div>

				<!--重置 -- 搜索按钮 -->
				<redo-and-search @reset="resetParams" @searchList="getList({}, 1)"></redo-and-search>
			</div>
		</el-form>
		<!-- 批量输入 -->
		<textarea-dialog
			:textareaDialogVisible.sync="textareaDialogVisible"
			:type="textareaDialogType"
			:index="textareaDialogIndex"
			:prop="textareaDialogProp"
			:linkage="textareaDialogLinkage"
			@batch="batchBackfilling"
		></textarea-dialog>
	</div>
</template>

<script>
import TextareaDialog from "@/components/TextareaDialog/TextareaDialog";
import RedoAndSearch from "@/components/RedoAndSearch";
import { mapGetters } from "vuex";
import { getQueryAccount } from "@/api/business";

export default {
	props: ["option", "formSearch"],
	components: {
		TextareaDialog,
		RedoAndSearch,
	},
	data() {
		return {
			textareaDialogType: undefined, // 批量输入的字段回调(key)
			textareaDialogIndex: undefined, // 批量输入的字段回调(Index)
			textareaDialogProp: undefined, // 批量输入的字段回调(prop)
			textareaDialogLinkage: false, //批量输入的字段回调(linkage)
			textareaDialogVisible: false, // 控制批量输入的显示和影藏
			formInline: {}, //传过来的参数
			childMerchantSelect: [], //子商户联动数据
			linkAgeSelect: true,//联动是否禁止输入
			pickerOptions: {
				disabledDate: (time) => {
					let nowDate = new Date(); //现在时间
					let oneDay = 1000 * 60 * 60 * 24; //一天时间
					let oneYearLater = new Date(nowDate.getTime() - (oneDay * this.limitTime));
					return nowDate <= time.getTime() || oneYearLater <= time.getTime();//注意是||不是&&
				},
			},
			limitTime: 0,
			oldSelectArray: [],//缓存一份多选的select数据
		};
	},
	created() {
		// 初始化值
		this.option.column.map(item => {
			// 给每个元素添加一个prop为键的字段，如果有linkage，在添加一个subMerNo
			if (item.linkage) {
				this.$set(item, "subMerNo", "");
				this.$set(item, item.prop, "");
			} else {
				this.$set(item, item.prop, "");
			}
			// 时间默认
			if (item.type === "datetimerange") {
				if (item.pickerOptions) {
					this.limitTime = item.pickerOptions;
					item[item.prop] = [
						this.dayjs(new Date().getTime() - 1000 * 60 * 60 * 24 * item.pickerOptions).format("YYYY-MM-DD") + " 00:00:00",
						this.dayjs(new Date().getTime() - 1000 * 60 * 60 * 24 * item.pickerOptions).format("YYYY-MM-DD") + ` ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
					];

				} else {
					item[item.prop] = [
						this.dayjs().format("YYYY-MM-DD") + " 00:00:00",
						this.dayjs().format("YYYY-MM-DD") + " 23:59:59",
					];
				}
				if(item.hasOwnProperty("default")){
					item[item.prop] = item.default
				}
			}
			if (item.type === "daterange") {
				if (item.pickerOptions) {
					this.limitTime = item.pickerOptions;
					item[item.prop] = [
						this.dayjs(new Date().getTime() - 1000 * 60 * 60 * 24 * item.pickerOptions).format("YYYY-MM-DD"),
						this.dayjs(new Date().getTime() - 1000 * 60 * 60 * 24 * item.pickerOptions).format("YYYY-MM-DD"),
					];
				} else {
					item[item.prop] = [
						this.dayjs().format("YYYY-MM-DD"),
						this.dayjs().format("YYYY-MM-DD"),
					];
				}
			}
			// 默认值
			if (item.type === "switch") {
				item[item.prop] = "0";
			}
			// 默认数据格式
			if (item.type === "checkbox") {
				item[item.prop] = [];
			}
			// select默认值
			if (item.type === "select" && item.hasOwnProperty("default")) {
				if (item.multiple){
					if (Array.isArray(item.dicData)) {
						item[item.prop] = item.default.map(index => item.dicData[index]?.value);
					} else if (typeof item.dicData === "function") {
						item[item.prop] = item.default.map(index => item.dicData()[index]?.value);
					}
				}else {
					item[item.prop] = Array.isArray(item.dicData) ? item.dicData[item.default]?.value : item.dicData()[item.default]?.value;
				}
			}
		});
		this.formInline = this.option;
		this.getList();
	},
	methods: {
		// 批量输入回调
		batchBackfilling(params) {
			this.formInline.column[params.index][params.prop] = params.str;
			if (params.linkage) {
				// 联动前面的有值
				if (params.str) {
					// 此处使用接口给select联动添加值
					getQueryAccount({
						merNo: params.str,
					}).then(res => {
						let newData = res.data.map(item => {
							return {
								label: item,
								value: item,
							};
						});
						newData.unshift({
							label: "所有",
							value: null,
						});
						this.childMerchantSelect = newData;
						// 失去焦点默认为所有
						this.formInline.column.map(item => {
							if (item.linkage) {
								item.subMerNo = null;
							}
						});
						// 让联动可以输入
						this.linkAgeSelect = false;
					});
				} else {
					// 联动前面没值
					this.childMerchantSelect = []; //清空后面的数据
					// 失去焦点清空
					this.formInline.column.map(item => {
						if (item.linkage) {
							item.subMerNo = "";
						}
					});
					// 让联动禁止输入
					this.linkAgeSelect = true;
				}
			}
			this.textareaDialogVisible = false;
		},
		// 打开批量输入的弹窗
		openTextareaDialog(params, index, prop, linkage) {
			this.textareaDialogType = params;
			this.textareaDialogIndex = index;
			this.textareaDialogProp = prop;
			this.textareaDialogLinkage = linkage;
			this.textareaDialogVisible = true;
		},
		// 重置筛选条件
		resetParams() {
			this.formInline.column.forEach((item, index) => {
				if (item.type === "datetimerange") {
					item[item.prop] = [this.dayjs().format("YYYY-MM-DD") + " 00:00:00", this.dayjs().format("YYYY-MM-DD") + " 23:59:59"];
				} else if (item.type === "daterange") {
					item[item.prop] = [this.dayjs().format("YYYY-MM-DD"), this.dayjs().format("YYYY-MM-DD")];
				} else {
					// 如果有联动的
					if (item.linkage) {
						this.formInline.column[index]["subMerNo"] = "";
						this.formInline.column[index][item.prop] = "";
					} else {
						this.formInline.column[index][item.prop] = "";
					}
				}
			});
		},
		// 分页请求
		getList(isChangeSize = 0) {
			// 当传过来1时重置当前页
			if (isChangeSize) this.formSearch.pageNum = 1;
			// 存放每个框的值，键值对为prop的值：value
			let newFormInline = {};
			// 把所有数据放在一个对象中
			for (let i = 0; i < this.formInline.column.length; i++) {
				let columnItem = this.formInline.column[i];
				if (columnItem.linkage) {
					// 处理商户联动数据
					newFormInline[columnItem.prop] = columnItem[columnItem.prop];
					newFormInline.subMerNo = columnItem.subMerNo;
					if (((newFormInline.merno || newFormInline.merNo) && newFormInline.subMerNo) && (newFormInline.merno || newFormInline.merNo) === newFormInline.subMerNo.toString()) {
						newFormInline.subMerNo = "0";
					}
				} else {
					// 平常赋值
					newFormInline[columnItem.prop] = columnItem[columnItem.prop];
				}
			}
			// 把分页数据和搜索数据放在一起
			let newFormSearch = { ...newFormInline, ...this.formSearch };
			// 删除对象中数据为空的
			for (let key in newFormSearch) {
				if (newFormSearch[key] == "") {
					delete newFormSearch[key];
				}
			}
			this.$emit("getSearchForm", newFormSearch);
		},
		// input失去焦点触发
		handleInputBlur(bool, value) {
			if (bool) {
				// 联动前面的有值
				if (value) {
					// 此处使用接口给select联动添加值
					getQueryAccount({
						merNo: value,
					}).then(res => {
						let newData = res.data.map(item => {
							return {
								label: item,
								value: item,
							};
						});
						newData.unshift({
							label: "所有",
							value: null,
						});
						this.childMerchantSelect = newData;
						// 失去焦点默认为所有
						this.formInline.column.map(item => {
							if (item.linkage) {
								item.subMerNo = null;
							}
						});
						// 让联动可以输入
						this.linkAgeSelect = false;
					});
				} else {
					// 联动前面没值
					this.childMerchantSelect = []; //清空后面的数据
					// 失去焦点为空
					this.formInline.column.map(item => {
						if (item.linkage) {
							item.subMerNo = "";
						}
					});
					// 让联动禁止输入
					this.linkAgeSelect = true;
				}
			}
		},
		// select的change事件
		handleSelectChange($event, bool) {
			if (bool) {
				// select前面选择好了，后面的的联动入值前面的value值
				this.formInline.column.map((item, index) => {
					// select多选择，并且包含全选择，全取消功能
					if (item[item.prop] instanceof Array && item.type === "select") {
						/*
						* 总共就4种状态
						* 	1. 当我们选择所有，也就是包含0时，直接把所有的值赋值进去
						* 	2. 判断缓存有0，新的没有0，是清空所有
						* 	3.缓存有0，新的有0，是在都选中的时候，在点击其他的，把所有按钮取消，在把点击的取消
						* 	4. 当缓存没有0，新的没有0。并且新的长度===所有的长度-1，就是说把下面都选中后要把所有的点亮
						* */
						let allValues = Array.isArray(item.dicData) ? item.dicData.map(mapItem => mapItem.value) : item.dicData().map(mapItem => mapItem.value)
						allValues = ["0"].concat(allValues);
						// 若是全部选择
						if ($event.includes("0")) {
							item[item.prop] = allValues;
						}
						// 当缓存的select有‘0’，并且点击change里面不包含0时，取消全选
						if (this.oldSelectArray.includes("0") && !$event.includes("0")) {
							item[item.prop] = [];
						}
						// 当缓存的select有‘0’，并且点击change里面包含0时，把change里面数据赋值并且过滤掉‘0’
						if (this.oldSelectArray.includes("0") && $event.includes("0")) {
							item[item.prop] = $event;
							item[item.prop] = item[item.prop].filter(d => d !== "0");
						}
						// 当缓存的select没有‘0’，并且点击change里面不包含0时
						if (!this.oldSelectArray.includes("0") && !$event.includes("0")) {
							// 当选中的length === 所有的length-1
							if ($event.length === allValues.length - 1) {
								// 把‘0’也拼接进去
								item[item.prop] = ["0"].concat($event);
							}
						}
						// 缓存一份多选的select数据
						this.oldSelectArray = item[item.prop];
					} else {
						this.formInline.column.map((_item, _index) => {
							if (item.prop === _item.chengeValue) {
								this.formInline.column[_index][this.formInline.column[_index].prop] =
									this.formInline.column[index][this.formInline.column[index].prop];
							}
						});
					}
				});
			}
		},
		// 联动搜索
		remoteMethod(query) {
			if (query !== "") {
				this.childMerchantSelect = this.childMerchantSelect.filter(item => {
					return item.label.toString().indexOf(query) > -1;
				});
			} else {
				this.childMerchantSelect = [];
			}
		},
	},
};
</script>
<style lang="less">
.search-form {
	.search-form-wrapper {
		padding: 16px 100px 0 24px;
		box-sizing: border-box;
		display: flex;
		flex-wrap: wrap;
	}

	.bg-F8F9FC {
		background-color: #f8f9fc;
	}

	.clearfix {
		zoom: 1;
	}

	.pr {
		position: relative;
	}

	.batch-btn {
		padding: 4px !important;
		border: none !important;
		background-color: #7f8dff !important;
		color: #fff !important;
		margin-left: 5px !important;
	}

	.el-form-item {
		margin-right: 24px !important;
		display: inline-block !important;
		vertical-align: top !important;
	}

	.el-form-item__content {
		line-height: 36px;
	}

	.el-input {
		line-height: 36px;
	}

	.el-input__inner {
		height: 36px;
		line-height: 36px;
	}

	.daterange-w {
		width: 280px !important;
	}
}
</style>
