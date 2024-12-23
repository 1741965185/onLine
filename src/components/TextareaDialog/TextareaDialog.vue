<template>
  <el-dialog
          :title="$t('editMerchant.batchInput')"
      :visible.sync="textareaDialogVisible"
      width="30%"
      :before-close="handleClose">
    <el-input class="height_24" type="textarea" resize="none" v-model="textareaDialogStr"></el-input>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">{{$t('editMerchant.sure')}}</el-button>
    </span>
  </el-dialog>
</template>

<script>
	export default {
		name: "TextareaDialog",
		props: {
			type: {
				type: String,
				default: undefined,
			},
			textareaDialogVisible: {
				type: Boolean,
				default: false,
			},
			index:{
				type: Number,
				default: undefined,
			},
			prop:{
				type: String,
				default: undefined,
			},
			linkage:{
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				textareaDialogStr: undefined,
			}
		},
		computed: {},
		methods: {
			handleClose() {
				this.$emit("update:textareaDialogVisible", false)
				this.textareaDialogStr = undefined
			},
			submit() {
				if (!this.textareaDialogStr) {
					this.$emit("batch", { str: "", type: this.type, index: this.index, prop:this.prop, linkage:this.linkage })
					this.textareaDialogStr = undefined
					return false
				}
				let str = this.textareaDialogStr
				let str2 = str.replace(/[\s]+/g, ",")
				let str3 = str2.replace(/\n/g, ",")
				let cleanArr = []
				let arr = str3.split(",")
				arr.forEach(item => {
					if (item) cleanArr.push(item)
				})
				this.$emit("batch", { str: cleanArr.toString(), type: this.type, index: this.index, prop:this.prop, linkage:this.linkage })
				this.textareaDialogStr = undefined
			},
		},
	}
</script>

<style scoped lang="less">
  /deep/ .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 300px;
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
  }

  /deep/ .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;

    textarea {
      height: 100%;
    }
  }
</style>