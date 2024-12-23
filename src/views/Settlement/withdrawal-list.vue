<template>
    <div class="app-container">
        <el-tabs v-model="activeName">
            <!-- 提现列表tab-content -->
            <el-tab-pane name="0">
                <span slot="label"><svg-icon icon-class="orderlist"/> {{$t('withdrawList.withdrawList')}}</span>
                <div class="Flex spaceB alignC card-tools-toggle">
                    <div class="Flex alignC">
                        <page-size-select
                                class="mr12"
                                @changeSize="$refs['order-search-form'].getList(1)"
                                :limit.sync="form.pageSize"
                        ></page-size-select>
                        <div class="icon-hover-effect mr12" @click="showScreen = !showScreen">
                            <svg-icon icon-class="select"/>
                        </div>
                    </div>
<!--                    <div class="Flex alignC">-->
<!--						<span class="download-btn cp" @click="$downloadFn('list')">-->
<!--							<svg-icon icon-class="download"/>-->
<!--						</span>-->
<!--                    </div>-->
                </div>
                <!-- 订单列表搜索组件 -->
                <template v-if="activeName == 0">
                    <search-form
                            ref="order-search-form"
                            v-show="showScreen"
                            :option="searchOption"
                            :formSearch="form"
                            @getSearchForm="getSearchForm($event, 1)"
                    ></search-form>
                </template>
                <el-table
                        ref="businessTable"
                        :data="tablePaneList1"
                        tooltip-effect="dark"
                        style="width: 100%"
                        v-loading="loading"
                >
                    <el-table-column prop="tradeNo" min-width="220px" :label="$t('withdrawList.withdrawNumber')"/>
                    <el-table-column prop="merno" min-width="100" :label="$t('withdrawList.merchantNumber')"/>
<!--                    <el-table-column prop="subMerNo"  :label="$t('sysText.subMerchantAccount')"></el-table-column>-->
                    <el-table-column prop="bankNumber" min-width="170px" :label="$t('withdrawList.bankAccount')"/>

                    <el-table-column min-width="170px" :label="$t('withdrawDetails.amountCredited')">
                        <template slot-scope="scope">
                            {{ scope.row.receivedAmount + ' ' + scope.row.receivedCurrency }}
                        </template>
                    </el-table-column>
                    <el-table-column min-width="170px" :label="$t('withdrawDetails.withdrawals')">
                        <template slot-scope="scope">
                            {{ scope.row.amount + ' ' + scope.row.currency }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="beneficiaryType" min-width="170px" :label="$t('withdrawDetails.type')"/>
                    <el-table-column :label="$t('withdrawList.transactionStatus')">
                        <template slot-scope="scope">
                            <span v-if="scope.row.status==0">{{$t('sysText.bankProcessing')}}</span>
                            <span v-if="scope.row.status==1">{{$t('sysText.systemProcessing')}}</span>
                            <span v-if="scope.row.status==2">{{$t('withdrawDetails.Success')}}</span>
                            <span v-if="scope.row.status==3">{{$t('withdrawList.failed')}}</span>
                            <span v-if="scope.row.status==4">资料待补充</span>
                            <span v-if="scope.row.status==5">资料待审核</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="gmtCreate" min-width="160px" :label="$t('withdrawList.transactionTime')"/>

                    <el-table-column :label="$t('orderChange.action')" fixed="right">
                        <template slot-scope="scope">
                            <circular-dropdown
                              :list="getOperationList(scope.row)"
                              :row="scope.row"
                                               @command="operateScope"></circular-dropdown>
                        </template>
                    </el-table-column>
                </el-table>
                <pagination
                        :total="total"
                        :page.sync="form.pageNum"
                        :limit.sync="form.pageSize"
                        @pagination="$refs['order-search-form'].getList()"
                />
            </el-tab-pane>
        </el-tabs>
        <el-dialog :title="$t('withdrawList.prompt')"
                   :visible.sync="dialogVisible"
                   width="300px">
            <span>您确定要这么操作吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">{{$t('withdrawList.cancel')}}</el-button>
                <el-button type="primary" @click="dialogVisible = false">{{$t('withdrawList.confirm')}}</el-button>
            </span>
        </el-dialog>

        <!--        补充资料-->
        <el-dialog title="补充资料" :visible.sync="addPriceVisible" width="500px" class="custom-dialog">
            <!-- 由于要替换为不可输入的展示框，我们这里使用div来替代el-input -->
            <div style="display: flex; flex-direction: column; align-items: start; margin-bottom: 20px;">
                <!-- 移除留言标题 -->
                <div style="width: 436px; height: 67px; background: #F8F9FC; border-radius: 3px; border: 1px solid #DBDFEA; padding: 10px; overflow: auto;">
                    <span style="font-weight: 500;font-size: 14px;color: #526484;line-height: 16px;
text-align: left;
font-style: normal;">
                       {{this.priceMap.remark}}
                    </span>
                </div>
            </div>

            <!-- 添加上传按钮 -->
            <div style="margin-bottom: 12px;">
                <label style="font-size: 14px; color: #8094AE;">附件</label>
            </div>

            <!-- 文件上传部分 -->
            <div>
                <el-upload
                  action= "http://192.168.3.23:8180/merchant/file/upload"
                  :http-request="file => handleAvatarSuccess(file, fileList1)"
                  :headers=headers
                  :file-list="fileList1"
                  :auto-upload="true"
                  :before-upload="beforeUpload"
                  :on-preview="handlePreview"
                  :on-change="handleChange(1)"
                  :on-remove="handleRemove(1)"
                >

                <el-button slot="trigger"  type="primary">点击上传</el-button>
                </el-upload>
            </div>

            <!-- 文件列表展示部分 -->
<!--            <div>-->
<!--                <ul>-->
<!--                    <li v-for="file in fileList" :key="file.name">-->
<!--                        {{ file.name }}-->
<!--                    </li>-->
<!--                </ul>-->
<!--            </div>-->

            <div slot="footer" class="dialog-footer">
                <el-button @click="addPriceVisible = false">取 消</el-button>
                <el-button :loading="loading" type="primary" @click="addTraderPrice">确认</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
	import pagination from "@/components/Pagination";
	import {
        getwithdrawList
	} from "@/api/Settlement";
	import PageSizeSelect from "@/components/PageSizeSelect";
	import SearchForm from "@/components/SearchForm";
	import CircularDropdown from "@/components/CircularDropdown";
	import {downloadOrderList} from "@/api/download";
  import i18n from "@/i18n";
  import { addInformation, upload } from "@/api/certification";

	//todo 没翻译 1

	var gdList = [
		{label: i18n.t('withdrawList.alls'), value: undefined},
		{label: i18n.t('withdrawList.blended'), value: "1"},
		{label: i18n.t('withdrawList.unblended'), value: "0"}
	];
	var JYJG = [
		{label: i18n.t('withdrawList.alls'), value: null},
		{label: i18n.t('withdrawList.successful'), value: "1"},
		{label: i18n.t('withdrawList.failed'), value: "0"}
	];
  var ZT = [
      { label: i18n.t('sysText.bankProcessing'), value:'0' },
      { label: i18n.t('sysText.systemProcessing'), value: '1' },
      { label: i18n.t('withdrawDetails.Success'), value: '2' },
      { label: i18n.t('withdrawDetails.Failure'), value: '3' },
      { label: i18n.t('sysText.to_be_added'),  value: '4' },
      { label: i18n.t('sysText.Pending_review'),  value: '5' },

  ];
	var KZ = [
		{label: i18n.t('withdrawList.alls'), value: null},
		{label: "DINERS", value: "ae"},
		{label: "DISCOVER", value: "discover"},
		{label: "WALLET", value: "E-wallet"},
		{label: "JCB", value: "jcb"},
		{label: "MASTER", value: "mastercard"},
		{label: "ALIPAY", value: "alipay"},
		{label: "UNIONPAY", value: "unionpay"},
		{label: "Wechat", value: "wechat"},
		{label: "VISA", value: "visa"},
		{label: "DINERS", value: "diners"},
		{label: "TRC20", value: "TRC20"},
    {label: "BankTransfer", value: "bankTransfer"},
    {label: "PIX", value: "PIX"}
  ];
	export default {
		name: "OrderList",
		components: {
			PageSizeSelect,
			pagination,
			SearchForm,
			CircularDropdown
		},
		computed: {
			primaryAddressFlag() {
				return this.riskObj.primaryAddressValidityLevel === "valid_to_house_number" || this.riskObj.primaryAddressValidityLevel === "valid_to_street" || this.riskObj.primaryAddressValidityLevel === "valid_to_country" || this.riskObj.primaryAddressValidityLevel === "valid_to_city" || this.riskObj.primaryAddressValidityLevel === "valid_to_house_number_missing_apt" || this.riskObj.primaryAddressValidityLevel === "valid";
			}
		},
		data() {
			return {
				activeName: "0", // tabs active
          getOperationList(row) {
              if (row.status === 4) {
                  return this.operationList1;
              }else {
                  return this.operationList;
              }

          },

          dialogVisible:false,
          addPriceVisible:false,

          form: {
					pageNum: 1,
					pageSize: 15
				}, // 列表查询表单
				formProps: {},//保存搜索组件传过来的值
				tablePaneList1: [],
				showScreen: false,
				priceMap: {
            remark:'',
            imageUrl:'',
            id:'',

        },
          fileList1: [], // 这里存储已上传文件的信息

          total: 0, // 总条数
				multipleSelection: [], // table勾选列表
				loading: false, // table loading状态
				gdState: 0, // 勾兑复核申请
          headers: { Authorization: sessionStorage.getItem("JWT"),
          },
          canBlending: true, // 对应的multipleSelection中是否存在状态不同的订单判断是否可以勾兑复核
				// 订单搜索
				searchOption: {
					column: [
						{
							label: i18n.t('withdrawList.merchantId'),
							prop: "merno",
							type: "select",
							dicData:this.$store.state.order.userMerNo , //数据传输
							Vshow: this.$store.state.user.merType === 0,
						},

              {
                  label: "状态",
                  prop: "status",
                  type: "select",
                  multiple: true,
                  dicData: ZT, //数据传输
                  default:['0','1','4','5'], //select默认值，写的下标

              },
						// {
						// 	label:  i18n.t('withdrawList.transactionStatus'),
						// 	prop: "orderStatus",
						// 	type: "select",
						// 	dicData: this.$store.state.order.orderState //数据传输
						// },
						{
							label:  i18n.t('withdrawList.dateSearch'),
							prop: "time",
							type: "datetimerange",
               default:[
                   this.dayjs(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365)).format("YYYY-MM-DD 00:00:00"),
                   this.dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
                ]
						}
					]
				},
				operationList: [
					// {label: i18n.t('withdrawList.approved'),  value: 0},
					// {label: i18n.t('withdrawList.rejected'),  value: 1},
            {label: i18n.t('orderChange.view'),  value: 2},
        ],
          operationList1: [
					// {label: i18n.t('withdrawList.approved'),  value: 0},
					// {label: i18n.t('withdrawList.rejected'),  value: 1},
              {label: i18n.t('补充资料'),  value: 3},
              {label: i18n.t('orderChange.view'),  value: 2},
				], // 操作列表
			};
		},
		created() {
		},
		mounted() {
		},
		watch: {
			activeName: function () {
				// 每次切换tabs 初始化状态
				this.form = {
					pageNum: 1,
					pageSize: 15
				};
				this.showScreen = false;
				this.total = 0;
				this.tablePaneList1 = [];
				this.multipleSelection = [];
				this.loading = false;
			},
			multipleSelection: function (newVal) {
				if (newVal.length === 0) {
					this.canBlending = true;
					return false;
				}
				for (let i = 0; i < newVal.length; i++) {
					if (newVal[i]["checked"] != this.gdState) {
						this.canBlending = false;
						break;
					}
					this.canBlending = true;
				}
			},
			gdState: function (newVal) {
				for (let i = 0; i < this.multipleSelection.length; i++) {
					if (newVal != this.multipleSelection[i]["checked"]) {
						this.canBlending = false;
						break;
					}
					this.canBlending = true;
				}
			}
		},

		methods: {
			$downloadFn: function (type) {
				let data = {...this.formProps};
				this.$delete(data, "pageNum");
				this.$delete(data, "pageSize");
				if (type === "list") {
					data.statdate = this.formProps.time[0];
					data.enddate = this.formProps.time[1];
					this.$delete(data, "time");
					downloadOrderList({...data})
						.then(result => {
							this.$message.success(result.data);
						});
				}
			},
       async addTraderPrice() {
           this.loading = true;
           // 提醒填写留言
           if ( this.fileList1.length === 0){
              this.$message.error('请上传附件');
               this.loading = false;

               return ;
          }else {
              this.fileList1.forEach(item => {

                  this.priceMap.imageUrl += item.name +':@' + item.url +',';
              });
          }

          await addInformation(this.priceMap)
              .then(res => {
                  if (res.status === 200) {
                      this.$message.success(res.msg);
                      this.addPriceVisible = false; // 关闭弹窗
                  } else {
                      this.$message.error(res.msg);
                  }
              })
              .catch(err => {
                  console.error(err);
                  this.loading = false;

              }).finally(() => {         // 无论成功或失败都将执行
                this.loading = false;
            });
            this.$refs["order-search-form"].getList();

        },
			// 勾兑复核
			putUpdateBlendingAndReview() {
				if (!this.multipleSelection.length) return false;
				let arr = [];
				this.multipleSelection.forEach(item => {
					arr.push(item.tradeNo);
				});
				this.$confirm(i18n.t('withdrawList.confirmOperation'), i18n.t('withdrawList.prompt'), {
					confirmButtonText:  i18n.t('withdrawList.confirm'),
					cancelButtonText:  i18n.t('withdrawList.cancel'),
					type: "warning"
				}).then(() => {
					updateBlendingAndReview({
						tradeNo: arr,
						checked: this.gdState
					}).then(result => {
						if (result.status === 200) {
							this.$message({
								type: "success",
								message: result.data
							});
							this.multipleSelection = [];
							this.$refs.tablePaneList2.clearSelection();
							this.$refs["order-search-form"].getList();
						} else {
							this.$message({
								type: "error",
								message: result.msg
							});
						}
					});
				});
			},
			operateScope(params) {
				if (params.command.value === 2) {
            this.$router.push({path: "/details/withdrawals/" + params.data.id});
				} else if (params.command.value === 3) {
            this.addPriceVisible = true;
            this.priceMap.remark=params.data.remark;
            this.priceMap.id=params.data.id;
            this.priceMap.id=params.data.id;
        }else if (params.command.value === 1) {
                  // this.dialogVisible = true;

        }
			},
			// 勾选table
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
        handleChange(uploadId) {
            return (file, fileList) => {
                // 根据 uploadId 区分不同的上传组件
                this[`fileList${uploadId}`] = fileList;
            };
        },
        handleRemove(uploadId) {
            return (file, fileList) => {
                // 根据 uploadId 区分不同的上传组件
                this[`fileList${uploadId}`] = fileList;
            };
        },
        handlePreview(file) {
            // 预览图片

        },
        beforeUpload(file) {

        },

        handleAvatarSuccess(file, fileList, targetArray){
            console.info(fileList);
            console.info('1');
            console.info(targetArray);
            const formData = new FormData();
            formData.append('file', file.file); // 将文件对象添加到 FormData 中
            formData.append("type", "certification");

            upload(
              formData,
            ).then(res => {
                if (res.status === 200) {
                    // 遍历 fileList，将每个文件的名称和URL加入到数组中
                    if (Array.isArray(fileList)) {
                        fileList.forEach(item => {
                            console.info(item.name);
                            console.info(res.data.fileName);
                            if (item.name === res.data.fileName) {
                                item.url = res.data.url; // 将接口返回的url赋给匹配项的url属性
                                item.name = res.data.fileName; // 将接口返回的url赋给匹配项的url属性
                                item.imageUrl=res.data.fileName+':@'+res.data.url;
                            }
                        });
                    }
                }
                console.info(this.fileList);
            }).catch(err => {

                console.error(err);
            });
        },
			// 订单列表请求
			getJyList(pages) {
			    console.info(pages,'123');
				const data = {
					...pages,
                    beginTime: pages.time[0],
                    endTime: pages.time[1]
				};
				this.$delete(data, "time");
				this.loading = true;
                getwithdrawList(data)
					.then(result => {
						this.loading = false;
						this.tablePaneList1 = result.data.list;
						this.total = result.data.total;
					})
					.catch(error => {
						this.loading = false;
					});
			},
			// 分页请求
			getSearchForm(params) {
				this.formProps = params;//存储点击搜索按钮后的值
                // 提现列表
                this.getJyList(params);
			}
		}
	};
</script>

<style scoped lang="less">
    @import "../../assets/styles/template";
</style>
<style scoped lang="less">
    .risk-container {
        .risk-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            color: #364A63;
            font-weight: 500;
            line-height: 20px;
        }

        .email-risk {
            margin-top: 20px;

            .email-title {
                height: 30px;
                background: #F5F6FA;
                font-size: 14px;
                font-weight: 400;
                color: #364A63;
                line-height: 30px;
                padding-left: 12px;
            }

            .email-content {
                display: flex;
                flex-wrap: wrap;
                padding: 0 12px;

                .width-limit {
                    width: 100% !important;
                }

                .item {
                    width: 55%;
                    font-size: 12px;
                    color: #8094AE;
                    line-height: 17px;
                    margin-top: 20px;

                    &:nth-of-type(2n) {
                        width: 45%;
                    }

                    .span-limit {
                        width: 55% !important;
                    }

                    span {
                        display: inline-block;

                        &:nth-of-type(1) {
                            color: #8094AE;
                            width: 50%;
                        }

                        &:nth-of-type(2) {
                            color: #364A63;
                        }
                    }
                }
            }
        }
    }
</style>
<style scoped>
.custom-dialog /deep/ .el-dialog__footer {
    border-top: none ;
}
</style>