<template>
  <div class="app-container">
    <h3 class="page-title mb28">{{$t('manage.rightsManagement')}}</h3>
    <el-tabs v-model="activeName">
      <el-tab-pane name="0">
        <span slot="label"><svg-icon icon-class="person"/>{{$t('manage.characterSettings')}}</span>
        <div class="Flex spaceB alignC card-tools-toggle" style="justify-content: flex-end;">
          <el-button
              class="air-btn-add"
              type="primary"
              icon="el-icon-plus"
              @click="showUserDialog=true"
          >
          </el-button>
        </div>
        <el-table
            :data="userTableList"
            tooltip-effect="dark"
            style="width: 100%"
            v-loading="loading"
            ref="userTableList"
            @selection-change="handleSelectionChange">
<!--          <el-table-column-->
<!--              type="selection"-->
<!--              width="55">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--              prop="id"-->
<!--              :label="$t('manage.roleNumber')">-->
<!--          </el-table-column>-->
          <el-table-column
              prop="name"
              :label="$t('manage.name')">
          </el-table-column>
          <el-table-column
              :label="$t('manage.status')">
            <template slot-scope="scope">
              {{scope.row.status == "1"? $t('manage.enable'):$t('manage.disable')}}
            </template>
          </el-table-column>
          <el-table-column
              min-width="160"
              :label="$t('manage.creadTime')">
            <template slot-scope="scope">
              {{ scope.row.createTime ? dayjs(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss") : "-" }}
            </template>
          </el-table-column>
          <el-table-column
              :label="$t('manage.operate')"
              fixed="right">
            <template slot-scope="scope">
              <circular-dropdown
                  :list="operationList"
                  :row="scope.row"
                  @command="operateScope"
              ></circular-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane name="1">
        <span slot="label"><svg-icon icon-class=""/> {{$t('manage.adminList')}}</span>
        <div class="Flex spaceB alignC card-tools-toggle" style="justify-content: flex-end;">
          <el-button
              class="air-btn-add"
              type="primary"
              icon="el-icon-plus"
              @click="showAdminDialog = true">
          </el-button>
        </div>
        <el-table
            :data="manageTableList"
            tooltip-effect="dark"
            style="width: 100%"
            v-loading="loading"
            @selection-change="handleSelectionChange">
					<el-table-column
						prop="email"
						label="Email">
					</el-table-column>
          <el-table-column
              prop="userName"
              :label="$t('manage.userName')">
          </el-table-column>
          <el-table-column
              prop="roleName"
              :label="$t('manage.name')">
          </el-table-column>
          <el-table-column
              :label="$t('manage.status')">
            <template slot-scope="scope">
              {{scope.row.status == "1"? $t('manage.enable'):$t('manage.enable')}}
            </template>
          </el-table-column>
          <el-table-column
              min-width="160"
              :label="$t('manage.creadTime')">
            <template slot-scope="scope">
              {{ scope.row.createTime ? dayjs(scope.row.createTime).format("YYYY-MM-DD HH:mm:ss") : "-" }}
            </template>
          </el-table-column>
          <el-table-column
              :label="$t('manage.operate')"
              fixed="right">
            <template slot-scope="scope">
              <circular-dropdown
                  :list="operationList2"
                  :row="scope.row"
                  @command="operateScope2"
              ></circular-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <pagination
          :total="total"
          :page.sync="form.pageNum"
          :limit.sync="form.pageSize"
          @pagination="getList"
      ></pagination>

    </el-tabs>

    <!-- 添加修改角色 -->
    <el-dialog
        :title=" (userForm.id? $t('manage.edit'):$t('manage.add') ) + $t('manage.rules') "
        :visible.sync="showUserDialog"
        width="500px"
    >
      <el-form ref="userForm" :model="userForm" :rules="userRules" label-width="120px" label-position="left">
        <el-form-item :label="$t('manage.name')" prop="name">
          <el-input v-model="userForm.name" :placeholder="$t('manage.qsr14djsmc')" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item :label="$t('manage.status')" prop="status">
          <el-select v-model="userForm.status" :placeholder="$t('manage.selectStatus')">
            <el-option :label="$t('manage.enable')" :value="1"></el-option>
            <el-option :label="$t('manage.disable')" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('manage.ruleMenu')">
          <el-checkbox v-model="menuExpand" @change="handleCheckedTreeExpand($event, 'menu')">{{$t('manage.expandcollapse')}}</el-checkbox>
          <el-checkbox v-model="menuNodeAll" @change="handleCheckedTreeNodeAll($event, 'menu')">{{$t('manage.AllDont')}}</el-checkbox>
        </el-form-item>
        <el-form-item class="border">
          <el-tree
              class="tree-border"
              :data="treeData"
              show-checkbox
              ref="menu"
              node-key="id"
              empty-text=""
              :props="defaultProps"
          ></el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="air-btn-cancel" @click="showUserDialog=false">{{$t('manage.cancellation')}}</el-button>
        <el-button class="air-btn-save" type="primary" @click="putUserForm('userForm')">{{$t('manage.confirmSave')}}</el-button>
      </div>
    </el-dialog>

    <!-- 添加修改管理员 -->
    <el-dialog
        :title=" (adminForm.webOp===0? $t('manage.updateInfo'):$t('manage.add')) + $t('manage.adminInfo') "
        :visible.sync="showAdminDialog"
        width="500px"
    >
      <el-form ref="adminForm" :model="adminForm" :rules="adminRules" label-width="120px" label-position="left">
				<el-form-item label="Email" prop="email">
					<el-input v-model="adminForm.email" :disabled="adminForm.webOp===0?true:false" :placeholder="$t('manage.qsr15em')" maxlength="100"></el-input>
				</el-form-item>
        <el-form-item :label="$t('manage.userName')" prop="userName">
          <el-input v-model="adminForm.userName" :disabled="adminForm.webOp===0?true:false" :placeholder="$t('manage.qsr15uhm')" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item :label="$t('manage.password')" prop="password" v-if="adminForm.webOp===0?false:true">
          <el-input show-password v-model="adminForm.password" :placeholder="$t('manage.pwdRule')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('manage.confirmPassword')" prop="passwordAg" v-if="adminForm.webOp===0?false:true">
          <el-input show-password v-model="adminForm.passwordAg" :placeholder="$t('manage.confirmPwdRule')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('manage.status')" prop="status">
          <el-select v-model="adminForm.status" :placeholder="$t('manage.selectStatus')">
            <el-option :label="$t('manage.enable')" :value="1"></el-option>
            <el-option :label="$t('manage.disable')" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('manage.rules')" prop="roleId">
          <el-select v-model="adminForm.roleId" :placeholder="$t('manage.selectRule')">
            <el-option v-for="item in roleSelect" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" :row="3" v-model="adminForm.remark" :placeholder="$t('manage.remarkRule')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="air-btn-cancel" @click="showAdminDialog=false">{{$t('manage.cancellation')}}</el-button>
        <el-button class="air-btn-save" type="primary" @click="putAdminForm('adminForm')">{{$t('manage.confirmSave')}}</el-button>
      </div>
    </el-dialog>

    <!-- 修改密码弹窗 -->
    <el-dialog :title="$t('manage.updatePwd')"
               :visible.sync="showPasswordDialog"
               width="500px">
      <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules" label-width="120px"
               label-position="left">
        <el-form-item :label="$t('manage.userName')" prop="userName">
          <el-input v-model="passwordForm.userName" :disabled="true" :placeholder="$t('manage.qsr15uhm')"> maxlength="15"></el-input>
        </el-form-item>
        <el-form-item :label="$t('manage.rules')" prop="roleName">
          <el-input v-model="passwordForm.roleName" :disabled="true" :placeholder="$t('manage.qsrRule')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('manage.newpwd')" prop="password">
          <el-input show-password v-model="passwordForm.password" :placeholder="$t('manage.newpwdRule')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('manage.confirmPassword')" prop="passwordAg">
          <el-input show-password v-model="passwordForm.passwordAg" :placeholder="$t('manage.confirmPwdRule')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="air-btn-cancel" @click="showPasswordDialog=false">{{$t('manage.cancellation')}}</el-button>
        <el-button class="air-btn-save" type="primary" @click="putPassword('passwordForm')">{{$t('manage.confirmSave')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
	import pagination from "@/components/Pagination";
	import CircularDropdown from "@/components/CircularDropdown";
	import {
		getAdminList,
		getRoleList,
		addAdmin,
		delAdmin,
		updateAdmin,
		getTree,
		addRole,
		delRole,
		roleMenuTreeselect,
		updateRole,
		changePassword,
	} from "@/api/auth";

	export default {
		name: "Auth",

		components: {
			CircularDropdown,
			pagination,
		},

		data() {
			const equalPassword = (rule, value, callback) => {
        let reg = /^[^\s]{8,20}$/;
				if (value === "") {
					callback(new Error(this.$t('manage.pwdRule')));
				} else {
					if (!reg.test(value)) {
						callback(new Error(this.$t('manage.pwdRule2')));
					} else {
						if (this.adminForm.passwordAg !== "") {
							this.$refs.adminForm.validateField("passwordAg");
						}
						callback();
					}
				}
			}
			const equalToPassword = (rule, value, callback) => {
        let reg = /^[^\s]{8,20}$/;
				if (value === "") {
					callback(new Error(this.$t('manage.pwdRule2')));
				} else {
					if (!reg.test(value)) {
						callback(new Error(this.$t('manage.pwdRule2')));
					} else {
						if (value !== this.adminForm.password) {
							callback(new Error(this.$t('manage.twopwdRule')));
						} else {
							callback();
						}
					}
				}
			};
			const equalPassword2 = (rule, value, callback) => {
				let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
				if (value === "") {
					callback(new Error(this.$t('manage.pwdRule')));
				} else {
					if (!reg.test(value)) {
						callback(new Error(this.$t('manage.pwdRule2')));
					} else {
						if (this.passwordForm.passwordAg !== "") {
							this.$refs.passwordForm.validateField("passwordAg");
						}
						callback();
					}
				}
			}
			const equalToPassword2 = (rule, value, callback) => {
				let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
				if (value === "") {
					callback(new Error(this.$t('manage.pwdRule3')));
				} else {
					if (!reg.test(value)) {
						callback(new Error(this.$t('manage.pwdRule2')));
					} else {
						if (value !== this.passwordForm.password) {
							callback(new Error(this.$t('manage.twopwdRule')));
						} else {
							callback();
						}
					}
				}
			};
			return {
				activeName: "0",
				userTableList: [],
				manageTableList: [],
				multipleSelection: [],
				loading: false,
				operationList: [
					{ "label": this.$t('manage.edit') , icon: "edit", value: 0 },
					{ "label": this.$t('manage.delete'), icon: "remove", value: 1 },
				],
				operationList2: [
					{ "label": this.$t('manage.edit'), icon: "edit", value: 0 },
					{ "label": this.$t('manage.delete'), icon: "remove", value: 1 },
					{ "label":  this.$t('manage.updatePwd'), icon: "review", value: 2 },
				],
				total: 0,
				form: {
					pageNum: 1,
					pageSize: 15,
				},
				userForm: {},
				userRules: {
					name: [{ required: true, message: this.$t('manage.ruleName'), trigger: "blur" }],
					status: [{ required: true, message: this.$t('manage.selectStatus'), trigger: "change" }],
				},
				showUserDialog: false,
				showPasswordDialog: false,
				passwordForm: {},
				passwordRules: {
					password: [
						{ required: true, message: this.$t('manage.pwdRule') , trigger: "blur" },
						{ required: true, validator: equalPassword2, trigger: "blur" },
					],
					passwordAg: [
						{ required: true, message: this.$t('manage.pwdRule3'), trigger: "blur" },
						{ required: true, validator: equalToPassword2, trigger: "blur" },
					],
				},
				menuOptions: [],
				menuExpand: false,
				menuNodeAll: false,
				showAdminDialog: false, // 添加修改管理员弹窗
				adminForm: {},
				adminRules: {
					userName: [{ required: true, message: this.$t('manage.adminRule'), trigger: "blur" }],
					email: [{ required: true, message: this.$t('manage.emailRule'), trigger: "blur" }],
					password: [
						{ required: true, message: this.$t('manage.pwdRule'), trigger: "blur" },
						{ required: true, validator: equalPassword, trigger: "blur" },
					],
					passwordAg: [
						{ required: true, message: this.$t('manage.pwdRule3'), trigger: "blur" },
						{ required: true, validator: equalToPassword, trigger: "blur" },
					],
					status: [{ required: true, message:  this.$t('manage.selectStatus'), trigger: "change" }],
					roleId: [{ required: true, message:  this.$t('manage.selectRule'), trigger: "change" }],
					departmentId: [{ required: true, message: this.$t('manage.selectBm'), trigger: "change" }],
				},
				treeData: [],
				defaultProps: {
					children: "permissionList",
					label: "name",
				},
				roleSelect: [],
			};
		},

		created() {
			this.getList();

			getTree().then(result => {
				this.treeData = result.data;
			});

			getRoleList({ pageNum: 1, pageSize: 9999 })
				.then(result => {
					if (result.status === 200)
						this.roleSelect = result.data.list;
				});
		},

		watch: {
			activeName: function(newVal, oldVal) {
				// 每次切换tabs 初始化状态
				this.form = {
					pageNum: 1,
					pageSize: 15,
				};
				this.showScreen = false;
				this.total = 0;
				this.userTableList = [];
				this.manageTableList = [];
				this.multipleSelection = [];
				this.loading = false;
				this.getList();
			},
			showAdminDialog: function(newVal, oldVal) {
				if (!newVal) {
					this.adminForm = {};
					this.$refs["adminForm"].resetFields();
					this.$nextTick(() => {
						this.$refs["adminForm"].clearValidate();
					});
				}
			},
			showUserDialog: function(newVal, oldVal) {
				if (!newVal) {
					this.userForm = {};
					this.$refs["userForm"].resetFields();
					this.$nextTick(() => {
						this.$refs["userForm"].clearValidate();
					});
				}
			},
			showPasswordDialog: function(newVal, oldVal) {
				if (!newVal) {
					this.passwordForm = {};
					this.$refs["passwordForm"].resetFields();
					this.$nextTick(() => {
						this.$refs["passwordForm"].clearValidate();
					});
				}
			},
		},

		methods: {
			putPassword(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$changePassword();
					} else {
						return false;
					}
				});
			},

			$changePassword: function() {
				changePassword({
					id: this.passwordForm.id,
					password: this.passwordForm.password,
				}).then(result => {
					if (result.status === 200) {
						this.showPasswordDialog = false;
						this.$message.success(result.data);
						this.getList();
					}
				});
			},

			// 所有菜单节点数据
			getMenuAllCheckedKeys() {
				// 目前被选中的菜单节点
				let checkedKeys = this.$refs.menu.getCheckedKeys();
				// 半选中的菜单节点
				let halfCheckedKeys = this.$refs.menu.getHalfCheckedKeys();
				checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
				return checkedKeys;
			},

			putAdminForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if (this.adminForm.id) {
							this.$updateAdmin();
						} else {
							this.$addAdmin();
						}
					} else {
						return false;
					}
				});
			},

			$addAdmin: function() {
				addAdmin(this.adminForm).then(result => {
					if (result.status === 200) {
						this.showAdminDialog = false;
						this.$message.success(result.data);
						this.getList();
					}
				});
			},

			$updateAdmin: function() {
				updateAdmin({
					id: this.adminForm.id,
					status: this.adminForm.status,
					roleId: this.adminForm.roleId,
					departmentId: this.adminForm.departmentId,
					remark: this.adminForm.remark,
				}).then(result => {
					if (result.status === 200) {
						this.showAdminDialog = false;
						this.$message.success(result.data);
						this.getList();
					}
				});
			},

			putUserForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if (this.userForm.id) {
							this.$updateRole();
						} else {
							this.$addRole();
						}
					} else {
						return false;
					}
				});
			},
			$updateRole: function() {
				updateRole({
					id: this.userForm.id,
					name: this.userForm.name,
					status: this.userForm.status,
					permissionIds: this.getMenuAllCheckedKeys(),
				}).then(result => {
					if (result.status === 200) {
						this.$message.success(result.data);
						this.showUserDialog = false;
						this.getList();
					}
				});
			},

			$addRole: function() {
				addRole({
					name: this.userForm.name,
					status: this.userForm.status,
					permissionIds: this.getMenuAllCheckedKeys(),
				}).then(result => {
					if (result.status === 200) {
						this.$message.success(result.data);
						this.showUserDialog = false;
						this.getList();
					}
				});
			},

			// 勾选table
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},

			// 根据角色Id请求树形结构
			getRoleMenuTreeselect(roleId) {
				return roleMenuTreeselect({ id: roleId }).then(response => {
					this.menuOptions = response.data.permissionList;
					return response;
				});
			},

			operateScope(params) {
				if (params.command.value === 0) {
					let data = this._.cloneDeep(params.data);
					data["webOp"] = 0;
					this.userForm = data;
					const roleId = params.data.id;
					const roleMenu = this.getRoleMenuTreeselect(roleId);
					this.showUserDialog = true;
					this.$nextTick(() => {
						roleMenu.then(res => {
							let checkedKeys = res.data.permissionList;
							checkedKeys.forEach((v) => {
								this.$nextTick(() => {
									this.$refs.menu.setChecked(v, true, false);
								});
							});
						});
					});
				} else if (params.command.value === 1) {
					// 删除角色
					this.$confirm(this.$t('manage.confirmDeleteRule'), this.$t('manage.prompt'), {
						confirmButtonText: this.$t('manage.determine'),
						cancelButtonText: this.$t('manage.close'),
						type: "warning",
					}).then(() => {
						delRole({
							id: params.data.id,
						}).then(result => {
							if (result.status === 200) {
								this.$message.success(result.data);
								this.getList();
							}
						});
					});
				}
			},
			async operateScope2(params) {
				if (params.command.value === 0) {
					// 编辑管理员
					let data = this._.cloneDeep(params.data);
					data["webOp"] = 0;
					this.adminForm = data;
					this.showAdminDialog = true;
				} else if (params.command.value === 1) {
					// 删除管理员
					this.$confirm(this.$t('manage.confirmDeleteAdmin'), this.$t('manage.prompt'), {
						confirmButtonText: this.$t('manage.determine'),
						cancelButtonText:  this.$t('manage.close'),
						type: "warning",
					}).then(() => {
						delAdmin({
							id: params.data.id,
						}).then(result => {
							if (result.status === 200) {
								this.$message.success(result.data);
								this.getList();
							}
						});
					});
				} else if (params.command.value === 2) {
					// 修改密码
					let data = this._.cloneDeep(params.data);
					this.passwordForm = data;
					this.showPasswordDialog = true;
				}
			},

			getList() {
				if (this.activeName === "0") {
					this.$getRoleList();
				} else if (this.activeName === "1") {
					this.$getAdminList();
				}
			},

			$getAdminList() {
				this.loading = true;
				getAdminList({
					...this.form,
				}).then(result => {
					if (result.status === 200) {
						this.loading = false;
						this.manageTableList = result.data.list;
						this.total = result.data.total;
					}
				});
			},

			$getRoleList() {
				getRoleList({
					...this.form,
				}).then(result => {
					if (result.status === 200) {
						this.loading = false;
						this.userTableList = result.data.list;
						this.total = result.data.total;
					}
				});
			},

			// 树权限（展开/折叠）
			handleCheckedTreeExpand(value, type) {
				if (type === "menu") {
					let treeList = this.treeData;
					for (let i = 0; i < treeList.length; i++) {
						this.$refs.menu.store.nodesMap[treeList[i].id].expanded = value;
					}
				}
			},
			// 树权限（全选/全不选）
			handleCheckedTreeNodeAll(value, type) {
				if (type === "menu") {
					this.$refs.menu.setCheckedNodes(value ? this.treeData : []);
				}
			},
			// 树权限（父子联动）
			handleCheckedTreeConnect(value, type) {
				if (type == "menu") {
					this.form.menuCheckStrictly = value ? true : false;
				} else if (type == "dept") {
					tssshis.form.deptCheckStrictly = value ? true : false;
				}
			},
		},
	};
</script>

<style scoped lang="less">
  @import "../../assets/styles/template";
</style>
