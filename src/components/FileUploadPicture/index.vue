<template>
  <div class="upload-file">
    <el-upload
        :action="uploadFileUrl + fileUrl"
        :before-upload="handleBeforeUpload"
        :file-list="fileList"
        :limit="limit"
        :on-error="handleUploadError"
        :on-exceed="handleExceed"
        :on-success="handleUploadSuccess"
        :headers="headers"
        class="upload-file-uploader"
        ref="upload"
    >
      <!-- 上传按钮 -->
      <el-button style="margin-left: 450px; margin-top: 10px"   >
        <svg-icon icon-class="updatePicture"/>
      </el-button>
      <!-- 上传提示 -->
      <div class="el-upload__tip" style="margin-left: 350px" slot="tip" v-if="showTip">
        请上传
        <template v-if="fileSize"> 大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b></template>
        <template v-if="fileType"> 格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b></template>
        的文件
      </div>
    </el-upload>

<!--&lt;!&ndash;     文件列表&ndash;&gt;-->
<!--    <transition-group class="upload-file-list el-upload-list el-upload-list&#45;&#45;text" name="el-fade-in-linear" tag="ul">-->
<!--      <li :key="file.uid" class="el-upload-list__item ele-upload-list__item-content" v-for="(file) in fileList">-->
<!--        <span class="el-icon-link"> {{ file.name }} </span>-->
<!--      </li>-->
<!--    </transition-group>-->
  </div>
</template>

<script>
	import { getToken } from "@/utils/auth";

	export default {
		name: "FileUploadPicture",
		props: {
			// 值
			value: [String, Object, Array],
			// 数量限制
			limit: {
				type: Number,
				default: 5,
			},
			// 大小限制(MB)
			fileSize: {
				type: Number,
				default: 5,
			},
			// 文件类型, 例如['png', 'jpg', 'jpeg']
			fileType: {
				type: Array,
				default: () =>['png', 'jpg', 'jpeg'],
			},
			// 是否显示提示
			isShowTip: {
				type: Boolean,
				default: true,
			},
			// upload file url
			fileUrl: {
				type: String,
				required: true,
			},
		},
		data() {
			return {
				baseUrl: process.env.VUE_APP_BASE_API,
				uploadFileUrl: process.env.VUE_APP_BASE_API, // 上传的图片服务器地址
				headers: {
					Authorization: sessionStorage.getItem("JWT"),
				},
				fileList: [],
			};
		},
		watch: {
			value: {
				handler(val) {
					if (val) {
						let temp = 1;
						// 首先将值转为数组
						const list = Array.isArray(val) ? val : this.value.split(",");
						// 然后将数组转为对象数组
						this.fileList = list.map(item => {
							if (typeof item === "string") {
								item = { name: item, url: item };
							}
							item.uid = item.uid || new Date().getTime() + temp++;
							return item;
						});
					} else {
						this.fileList = [];
						return [];
					}
				},
				deep: true,
				immediate: true,
			},
		},
		computed: {
			// 是否显示提示
			showTip() {
				return this.isShowTip && (this.fileType || this.fileSize);
			},
		},
		methods: {
			// 上传前校检格式和大小
			handleBeforeUpload(file) {
				// 校检文件类型
				if (this.fileType) {
					let fileExtension = "";
					if (file.name.lastIndexOf(".") > -1) {
						fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
					}
					const isTypeOk = this.fileType.some((type) => {
						if (file.type.indexOf(type) > -1) return true;
						if (fileExtension && fileExtension.indexOf(type) > -1) return true;
						return false;
					});
					if (!isTypeOk) {
						this.$message.error(`文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`);
						return false;
					}
				}
				// 校检文件大小
				if (this.fileSize) {
					const isLt = file.size / 1024 / 1024 < this.fileSize;
					if (!isLt) {
						this.$message.error(`上传文件大小不能超过 ${this.fileSize} MB!`);
						return false;
					}
				}
				return true;
			},
			// 文件个数超出
			handleExceed() {
				this.$message.error(`上传文件数量不能超过 ${this.limit} 个!`);
			},
			// 上传失败
			handleUploadError(err) {
				this.$message.error("上传失败, 请重试");
			},
			// 上传成功回调
			handleUploadSuccess(res, file) {
				console.log("1123",res);
				this.$message.success(res.data.msg ? res.data.msg : '上传成功');
				this.fileList.push({ name: res.data.fileName, url: res.data.url });
				this.$emit("input", this.listToString(this.fileList));
			},
			// 删除文件
			handleDelete(index) {
				this.fileList.splice(index, 1);
				this.$emit("input", this.listToString(this.fileList));
			},
			// 获取文件名称
			getFileName(name) {
				if (name.lastIndexOf("/") > -1) {
					return name.slice(name.lastIndexOf("/") + 1).toLowerCase();
				} else {
					return "";
				}
			},
			// 对象转成指定字符串分隔
			listToString(list, separator) {
				let strs = "";
				separator = separator || ",";
				for (let i in list) {
					strs += list[i].url + separator;
				}
				return strs != "" ? strs.substr(0, strs.length - 1) : "";
			},
		},
	};
</script>

<style scoped lang="scss">
  .upload-file {
		background: #FFFFFF;
		border-radius: 4px;
		border: 1px dashed #DBDFEA;
    ::v-deep .el-button {
      padding: 8px 20px;
    }
  }

  .upload-file-list .el-upload-list__item {
    border: 1px solid #e4e7ed;
    line-height: 2;
    margin-bottom: 10px;
    position: relative;
  }

  .upload-file-list .ele-upload-list__item-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: inherit;
  }

  .ele-upload-list__item-content-action .el-link {
    margin-right: 10px;
  }
</style>