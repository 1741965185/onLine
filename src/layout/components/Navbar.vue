<template>
  <div class="navbar">
    <img v-if="logoUrl" class="logo" :src="logoUrl" alt=""/>
    <img v-else class="logo" src="../../assets/logo/logo@2x.png" alt=""/>

    <el-menu
        :default-active="activeIndex"
        class="el-menu-top"
        mode="horizontal"
        @select="handleSelect"
        text-color="#526484"
        active-text-color="#7F8DFF"
    >

      <!-- <el-menu-item index="/index">
        <div>首页</div>
      </el-menu-item>
      <el-menu-item index="/business/list">
        <div>交易</div>
      </el-menu-item>
      <el-menu-item v-if="merType === 0" index="/settlement/basics">
        <div>结算</div>
      </el-menu-item>
      <el-menu-item v-if="merType === 0" index="/serve/logistics">
        <div>物流</div>
      </el-menu-item> -->

<!--      <el-menu-item index="/business/list">-->
<!--        <router-link :to="{ path: '/business/list' }">{{$t('navbar.transactions')}}</router-link>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item v-if="merType === 0" index="/settlement/basics">-->
<!--        <router-link :to="{ path: '/settlement/basics' }">{{$t('navbar.settlement')}}</router-link>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item v-if="merType === 0" index="/serve/logistics">-->
<!--        <router-link :to="{ path: '/serve/logistics' }">{{$t('navbar.logistics')}}</router-link>-->
<!--      </el-menu-item>-->
<!--      <el-menu-item index="/other/downloadapi">-->
<!--        <router-link :to="{ path: '/other/downloadapi' }">{{$t('navbar.api')}}</router-link>-->
<!--      </el-menu-item>-->
    </el-menu>

    <div class="right-menu">
      <el-popover placement="bottom" width="442" trigger="hover" popper-class="custom-border-radius" ref="popover" @show="showMsg">
        <!--			<el-popover placement="bottom-end" width="450" border-radius="40px"  v-model="ture" popper-class="custom-border-radius" ref="popover" @show="showMsg">-->
        <!--			<el-popover placement="bottom" width="450" trigger="hover" ref="popover" @show="showLog">-->
        <div class="popover-message">
          <div class="popover-message-header">
            <el-tabs v-model="activeName" class="tabs-container">
              <el-tab-pane label="通知" name="notice"></el-tab-pane>
<!--              <el-tab-pane label="日志" name="log"></el-tab-pane>-->
            </el-tabs>

            <div class="more">
              <span class="more-test" @click=clearMsg>更多</span>
              <span class="more-icon el-icon-refresh-right" @click="handleLoad"></span>
            </div>

          </div>
          <div style="height: 1px;width: 100%;background-color: #EBEBEB;margin-top: 12px"></div>

          <div class="popover-message-content" v-show="activeName === 'log'">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="activity.timestamp"
              >
                {{ activity.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
          <div class="popover-message-content-two" v-show="activeName === 'notice'">
            <div v-for="(warning, index) in warnings" :key="index" class="popover-message-content-two-item" @click="navigateToWarningPage(warning)">
              <div style="font-family: PingFangSC, PingFang SC;
               font-weight: 500;
               font-size: 14px;
               color: #526484;
               line-height: 17px;
               text-align: left;
               margin-bottom: 8px;
               font-style: normal;">
                {{warning.title}}
              </div>
              <div style="font-family: PingFangSC, PingFang SC;
               font-weight: 400;
               font-size: 14px;
               color: #526484;
               line-height: 20px;
               text-align: left;
               font-style: normal;
               overflow: hidden;
               white-space: nowrap;
               max-width: 100%;
               text-overflow: ellipsis;">
                {{warning.content}}
              </div>
            </div>
          </div>        </div>

        <!-- 在你的 HTML 文件中添加这个结构 -->
        <div class="notice-icon" slot="reference">
          <img class="notice-img" style="width: 21px; height: 24px; margin-right: 25px" src="@/assets/images/noctice.png" />
          <span v-show="count > 0" class="notice-count" :class="{ 'circle': count <= 9, 'ellipse': count > 9, 'max-count': count >= 100 }" :style="{ visibility: count ? 'visible' : 'hidden' }">
    {{ count >= 100 ? '99+' : count }}
  </span>
        </div>

      </el-popover>

      <el-dropdown class="float-button" @command="changeLanguage">
            <div class="float-button" type="primary" size="large">
                <div class="box_3 flex-row justify-between">
                    <span class="text_6">{{ getCountryName(currentLanguage) }}</span>
                    <img
                            class="thumbnail_4"
                            referrerpolicy="no-referrer"
                            src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng6e45870d41fcdcb1c0c722a75f76d616891e2b0cf029b7012b3dd2d89774d120"
                    />
                </div>
            </div>
            <el-dropdown-menu class="custom-dropdown">
                <el-dropdown-item v-for="(country, languageCode) in getCountries" :key="languageCode" :index="languageCode" :command="languageCode">
                    {{ country }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <el-popover
          placement="bottom"
          width="202"
          class="avatar-container right-menu-item"
          popper-class="popper-style"
          trigger="hover"
      >
        <el-col>

          <div style="	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #F5F6FA;
width: 100%;
padding-bottom: 11px;
	">
              <div style="font-family: PingFangSC, PingFang SC;
font-weight: 600;
font-size: 18px;
padding-top: 15px;
padding-bottom: 6px;
color: #526484;
line-height: 16px;
text-align: center;
font-style: normal;
">{{ merNo }}</div>
              <div :class="['myDiv', {'unverified': identity === 0, 'personalAccount': identity === 2, 'businessAccount': identity === 1}]">
                <div style="font-family: PingFangSC, PingFang SC;
font-weight: 500;
font-size: 10px;
height: 14px;
color: #FFFFFF;
font-style: normal;
" v-if="identity === 0">
                  {{this.$t('translations.certificationPending')}}
                </div>

                <div style="font-family: PingFangSC, PingFang SC;
font-weight: 500;
font-size: 10px;
color: #FFFFFF;
text-align: center;
font-style: normal;" v-else-if="identity === 1">
                  {{this.$t('translations.businessAccount')}}
                </div>

                <div style="font-family: PingFangSC, PingFang SC;
font-weight: 500;
font-size: 10px;
color: #FFFFFF;
text-align: center;
font-style: normal;" v-else-if="identity === 2">
                  {{this.$t('translations.personalAccount')}}
                </div>
              </div>
         </div>

          <el-row
            v-if="permissionMap.information === 1"
            class="tabs-ment"
            @click.native="$router.push({ path: '/passageway/configure'})">
            <svg-icon class="svg-tabs" icon-class="geren"/>
            <span class="text-tabs">{{$t('sysText.Settings_nav')}}</span>
          </el-row>
            <el-row             v-if="permissionMap.download === 1"
                                class="tabs-ment"
                    @click.native="$router.push({ path: '/serve/download'})">
                <svg-icon class="svg-tabs" icon-class="send"/>
                <span class="text-tabs">{{$t('download.downLoadCenter')}}</span>
            </el-row>
          <el-row
            v-if="permissionMap.website === 1"
            class="tabs-ment"
            @click.native="$router.push({ path: '/passageway/cashier'})">
            <svg-icon class="svg-tabs" icon-class="wangzhi"/>
            <span class="text-tabs">{{$t('sysText.settings_whitelist_url')}}</span>
          </el-row>
          <el-row
            v-if="permissionMap.submerchant === 1"
            class="tabs-ment"
            @click.native="$router.push({ path: '/passageway/account'})">
            <svg-icon class="svg-tabs" icon-class="zishanghu"/>
            <span class="text-tabs">{{$t('sysText.settings_sub_merchant')}}</span>
          </el-row>


          <el-row
            v-if="permissionMap.permission === 1"
              class="tabs-ment"
              @click.native="$router.push({ path: '/auth/manage' })">
                <svg-icon class="svg-tabs" icon-class="quanxian"/>
              <span class="text-tabs">{{$t('navbar.permissionManagement')}}</span>
          </el-row>
          <el-row               class="tabs-ment"
                                @click.native="logout">
            <svg-icon class="svg-tabs" icon-class="tuichu"/>
            <div class="text-tabs">{{$t('navbar.logout')}}</div>
          </el-row>
        </el-col>
        <div class="avatar-wrapper" slot="reference">
          <div style="width: 40px; height: 40px; background: #7f8dff; border-radius: 50%" class="Flex spaceC alignC">
            <svg-icon style="font-size: 26px" icon-class="person1"/>


          </div>
        <div style="display: flex;justify-content: center;align-items: center">
          <div style="font-family: PingFangSC, PingFang SC;
font-weight: 400;
font-size: 14px;
color: #526484;
margin-left: 10px;
margin-right: 10px;
line-height: 14px;

text-align: center;
font-style: normal;">{{ name }}</div>
          <img
            class="thumbnail_4"
            referrerpolicy="no-referrer"
            src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng6e45870d41fcdcb1c0c722a75f76d616891e2b0cf029b7012b3dd2d89774d120"
          />
        </div>
        </div>
      </el-popover>


    </div>
  </div>
</template>

<script>
import Bus from '@/utils/bus';
import {mapGetters, mapMutations} from 'vuex';
import { allRead, getCountandList } from "@/api/home";
// import { constantRoutes } from "@/router";
export default {
  data() {
    return {
      activeIndex: '1',
      host: '',
      logoUrl: '',
      activeName: "notice",
      count: "",
      activities: [], //日志列表
      warnings: [],
      merNo: sessionStorage.getItem("merNo"),
      menuItems: [
        { id: 1, label: '菜单项1' },
        { id: 2, label: '菜单项2' },
        { id: 3, label: '菜单项3' }
      ]
    };
  },
  computed: {
    ...mapGetters(['permissionMap']),
    ...mapGetters(['getCountryName']),
      ...mapGetters(['getCountries']),
      ...mapGetters({
          currentLanguage: 'getCurrentLanguage' // 获取当前语言代码
      }),
    ...mapGetters(['sidebar', 'device', 'name', 'merType', 'identity']),
    setting: {
      get() {
        return this.$store.state.settings.showSettings;
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val,
        });
      },
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav;
      },
    },
  },
  created() {
    let _this = this;
    Bus.$on('activeMenu', function (params) {
      _this.activeIndex = params;
    });
    this.host = window.location.host;
    this.showNotice();

    const domainInfo = window.sessionStorage.getItem('domainInfo');
    if (domainInfo) {
      this.logoUrl = JSON.parse(domainInfo).logo;
    }
  },
  methods: {
      ...mapMutations(['changeLanguage']),

      handleSelect(key, keyPath) {
      // this.handleRouter(false);
      // sessionStorage.removeItem("reference");
      // this.$router.push({ path: key });
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    },
    handleLoad() {
      this.showMsg();
      this.clearMsg();

    },
    // 显示日志
    showMsg() {
      // this.showLog();
      this.showNotice();
    },
    clearMsg() {
      this.$router.push({ path: '/operation/operationlog' })
      allRead().then(res => {
        this.count=0;
      });

    },
    navigateToWarningPage(warning) {
      switch (warning.type) {
        case 3:
          this.$router.push({ path: "/details/info/" + warning.contentNo });
          break;
          case 4:
          break;
        default:
          this.$router.push({path: "/details/withdrawals/" + warning.contentid});
          break;
      }
      allRead().then(res => {
        this.count=0;
      });
    },
    // 显示通知
    showNotice() {
      getCountandList({merNo:this.merNo}).then(res => {
        this.count=res.data.count;
        this.warnings=res.data.list;

      });
    },
    async logout() {
      this.$confirm(this.$t('navbar.confirmLogout'), '提示', {
        confirmButtonText: this.$t('navbar.confirm'),
        cancelButtonText: this.$t('navbar.cancel'),
        type: 'warning',
      })
          .then(() => {
            this.$store.dispatch('FedLogOut').then(() => {
              location.href = '/login';
            });
          })
          .catch(() => {
          });
    },
    handleSupportHelp() {
      // this.handleRouter(true);
      // sessionStorage.setItem("reference", true);
      // this.$router.push({ path: "/reference" });
    },
    // 处理路由
    handleRouter(flag) {
      // // 处理商户的侧边栏
      // let addRoutes = this.$store.state.permission.addRoutes.filter(item => item.redirect != "/404");
      // // 处理支持与帮助侧边栏
      // let flagList = constantRoutes.filter(item => item.isFlag);
      // // 返回其他不显示的页面
      // let newConstantRoutes = constantRoutes.filter(item => !item.isFlag);
      // if (flag) {
      // 	addRoutes.map((item, index) => {
      // 		addRoutes[index].hidden = true;
      // 	});
      // 	flagList[0].hidden = false;
      // } else {
      // 	addRoutes.map((item, index) => {
      // 		addRoutes[index].hidden = false;
      // 	});
      // 	flagList[0].hidden = true;
      // }
      // // 存入vuex
      // this.$store.commit("SET_SIDEBAR_ROUTERS", [...addRoutes, ...flagList, ...newConstantRoutes]);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  padding: 0 5% 0 110px;
  height: 64px;
  overflow: hidden;
  background: #fff;
  border-bottom: 1px solid #e5e9f2;
  position: relative;
  min-width: 100%;
  box-sizing: border-box;
  z-index: 2000;

  .el-menu-top {
    display: inline-block;
    float: left;
    height: 100%;
    border-bottom: none;
    margin-left: 65px;

    li {
      padding: 0;
      margin-right: 26px;
      font-weight: 500;
      height: 63px;
      line-height: 63px;
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    align-items: center;
    justify-content: space-between;
    display: flex;
    float: right;
    height: 100%;
    line-height: 50px;
    cursor: pointer;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {

      .avatar-wrapper {
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;

        /*.user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }*/
      }
    }
  }
  .box_3 {
    cursor: pointer;

    .text_6 {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #526484;
      line-height: 16px;
    }
    .thumbnail_4 {
      margin-left: 8px;
      margin-right: 14px;
      width: 8px;
      height: 6px;
      /*margin-top: 6px;*/
    }
  }

  .logo {
    height: 36px;
    position: relative;
    top: 50%;
    margin-top: -20px;
    float: left;
  }
  .popper-style {
    background: #FFFFFF;
    box-shadow: 0px 2px 6px 0px #DBDFEA;
    border-radius: 10px;
    border: 1px solid #DBDFEA;
  }
  .popper-style:hover {
    /* 鼠标移入时的样式 */
    background: #7F8DFF;
  }

}
.svg-tabs {
  width: 18px;
  height: 18px;
  padding: 11px 5px;
}
.text-tabs {
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 14px;
  color: #526484;
  line-height: 14px;
  text-align: left;
  font-style: normal;
}
.tabs-ment {
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  padding: 0 10px;
  border-radius: 4px;
  cursor: pointer;


}

.tabs-ment:hover {
  background-color: #F3F6FD; /* 修改为你想要的背景色 */
  /* 添加其他样式，如颜色、边框等 */
}
.tabs-ment:hover .svg-tabs {
  color:#7F8DFF; /* 修改为你想要的 SVG 填充色 */
}

.tabs-ment:hover .text-tabs {
  color: #7F8DFF; /* 修改为你想要的文本颜色 */
}
.myDiv {
  border-radius: 9px;
  padding: 2px 10px;
  height: 18px;
  box-sizing: border-box; /* 让 padding 不会增加元素的总宽度 */
  text-align: center;
  align-items: center;
  justify-content: center;

}

.unverified {
  background: linear-gradient(180deg, #DEE6F1 0%, #A4AEBB 100%);
  /* 未认证对应的样式 */

}

.personalAccount {
  background: linear-gradient(180deg, #B3DBFE 0%, #73BCF6 100%);
  /* 个人账户对应的样式 */

}

.businessAccount {
  background: linear-gradient(180deg, #FCBE3B 0%, #FC8306 100%);
  /* 企业账户对应的样式 */
}

</style>
<style>
.el-popover.popper-style{
    padding: 0;
    border-radius: 10px;
    width: 202px;
}
.popover-message {
    .popover-message-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 30px;
        padding-left: 18px;
        .title {
            font-size: 16px;
        }
        .more {
            font-weight: 400;
            font-size: 14px;
            color: #526484;
            .more-test {
                cursor: pointer;
            }
            .more-icon {
                cursor: pointer;
                margin: 0 0 0 10px;
                width: 15px;
                height: 14px;

            }
        }
    }
    .popover-message-content {
        height: 280px;
        overflow: auto;
        padding: 20px 0 0 140px;
        font-size: 12px;
        ::v-deep .el-timeline-item__timestamp {
            position: absolute;
            left: -135px;
            top: -5px;
        }
        ::v-deep .el-timeline {
            font-size: 12px;
            margin-top: 8px;

            .el-timeline-item {
                padding-bottom: 8px;
            }
            .el-timeline-item__node--normal {
                left: 1px;
                width: 8px;
                height: 8px;
                background: #8094ae;
            }
            .el-timeline-item__node--large {
                left: 0px;
                width: 10px;
                height: 10px;
                box-shadow: 0px 0px 5px 1px rgb(127 141 255);
            }
            .el-timeline-item__content {
                width: 250px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
    .popover-message-content-two {
        margin-top: 20px;
        height: 280px;
        overflow: auto;
        font-size: 12px;
        box-sizing: border-box;
    }
    .popover-message-content-two-item {
        cursor: pointer;
        justify-content: space-between;align-items: start;display: flex;flex-direction: column;padding-left: 17px;padding-right: 17px;padding-top: 12px;padding-bottom: 11px;box-sizing: border-box;
    }
    .popover-message-content-two-item:hover {
        background: #F7F9FE;
        border-radius: 6px;
    }
}
/* 重置样式 */
.notice-icon {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

.notice-img {
    display: inline-block;
}

.notice-count {
    text-align: center;
    position: absolute;
    top: 20px; /* 调整这个值来改变红点与图片顶部的距离 */
    right: 15px; /* 调整这个值来改变红点与图片右侧的距离 */
    font-size: 12px;
    line-height: 18px;
    color: #fff;
    background-color: red;
    border-radius: 50%;
    visibility: hidden;
    transform: translateY(-50%);
    transition: all 0.2s ease;
}

/* 圆形 */
.notice-count.circle {
    width: 18px;
    height: 18px;
}

/* 椭圆 */
.notice-count.ellipse {
    width: 24px;
    height: 18px;
    border-radius: 10px 10px 10px 10px;
}

/* 显示红点 */
.notice-count:empty {
    visibility: hidden;
}

/* 新增 max-count 类，用于处理 "99+" 的情况 */
.notice-count.max-count {
    width: 36px;
    height: 24px;
    line-height: 24px;
    border-radius: 50%;
    font-size: 14px; /* 可以适当调整字体大小 */
}
</style>
<style >
.el-popover.custom-border-radius  {
    border-radius: 10px; /* 修改为你想要的圆角半径 */
    width: 442px;
    boz-sizing: border-box;

}
.tabs-container .el-tabs__nav-wrap::after {
    display: none;
}
</style>
<style scoped>
.tabs-container /deep/ .el-tabs__nav-scroll {
    line-height: 40px;
    padding: 0;

}

.el-tabs {
    border: none; /* Remove border */

}

</style>