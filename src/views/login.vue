// The login and register form is implemented using Element UI.
<template>
  <div class="main-Login" :style="{ paddingTop: isLogin ? '202px' : '100px' }">
    <div class="content-wrapper">
      <img class="logo-image" src="../assets/logo/logo-login.png" alt="Logo" />

      <!-- 登录表单 -->
      <div class="form-card" v-if="isLogin">
        <div class="form-title">{{ $t('login.login') }}</div>
        <div class="form-container">
          <!-- 登录邮箱 -->
          <div class="form-item">
            <div class="text-email">{{ $t('login.emailUsername') }}</div>
            <el-input class="custom-input" v-model="loginForm.account" :placeholder="$t('login.enterUsername')"></el-input>
          </div>
          <!-- 登录密码 -->
          <div class="form-item">
            <div class="text-password">{{ $t('login.passwords') }}</div>
            <el-input class="custom-input" type="password"  show-password v-model="loginForm.password" :placeholder="$t('login.enterPassword')"></el-input>
          </div>
          <!-- 提交按钮 -->
          <div class="form-item">
            <el-button type="primary" class="submit-button-login" @click="submit">{{ $t('login.login') }}</el-button>
          </div>
        </div>
        <!-- 切换链接 -->
        <div class="footer-container">
          <div class="account-switch">
            {{ $t('login.newToOnlinePay') }}
            <a href="#" @click="switchForm">{{ $t('login.register') }}</a>
          </div>
          <!-- 语言切换等其他内容 -->
          <div class="language-switcher">
            <el-dropdown class="dropdown-button" @command="changeLanguage">
              <div class="dropdown-display" type="primary" size="large">
                <div class="language-display">
                  <span class="language-text">{{ getCountryName(currentLanguage) }}</span>
                  <img class="language-icon" src="https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng6e45870d41fcdcb1c0c722a75f76d616891e2b0cf029b7012b3dd2d89774d120" />
                </div>
              </div>
              <el-dropdown-menu class="dropdown-menu">
                <el-dropdown-item v-for="(country, languageCode) in getCountries" :key="languageCode" :index="languageCode" :command="languageCode">
                  {{ country }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

        </div>
      </div>

      <!-- 注册表单 -->
      <div class="form-card" v-if="!isLogin">
        <div class="form-title">{{ $t('login.register') }}</div>
        <div class="form-container">
          <!-- 用户名 -->
          <div class="form-item">
            <div class="text-username">{{ $t('account.username') }}</div>
            <el-input v-model="registerForm.username" :placeholder="$t('login.enterUsernameTwo')"></el-input>
          </div>
          <!-- 注册邮箱 -->
          <div class="form-item">
            <div class="text-email">{{ $t('account.email') }}</div>
            <div class="input-wrapper">
              <el-input v-model="registerForm.email" :placeholder="$t('login.please_email')" class="input-with-code" />
              <el-link class="code-button" :disabled="countdown" @click="getCode" type="primary">
                <span class="code-text">{{ countdown ? `${countdown}s` : $t('login.sendVerificationCode') }}</span>
              </el-link>
            </div>
          </div>
          <!-- 注册验证码 -->
          <div class="form-item">
            <div class="text-code">{{ $t('login.emailVerificationCode') }}</div>
            <el-input class="custom-input" v-model="registerForm.rand" :placeholder="$t('login.please_input_password')"></el-input>
          </div>
          <!-- 注册密码 -->
          <div class="form-item">
            <div class="text-password">{{ $t('login.passwords') }}</div>
            <el-input  class="custom-input" type="password" show-password v-model="registerForm.password" :placeholder="$t('manage.pwdRule')"></el-input>
          </div>
          <!-- 确认密码 -->
          <div class="form-item">
            <div class="text-confirmed-password">{{ $t('register.confirmPassword') }}</div>
            <el-input  class="custom-input" type="password"  show-password v-model="registerForm.confirmedPassword" :placeholder="$t('register.confirmPasswordRequired')"></el-input>
          </div>
          <!-- 同意协议 -->
          <div class="form-item agreement-item">
            <el-checkbox class="text-agreement" v-model="registerForm.agreement"></el-checkbox>
            <span class="text-read-agreement">{{$t('register.readAndAgree')}}</span><a style="color: #7F8DFF" class="text-read-agreement":href="currentLanguage === 'zh' ? '/html/serve.html' : '/html/serve-en.html'" target="_blank">{{$t('register.serviceAgreement')}}</a>
          </div>
          <!-- 提交按钮 -->
          <div class="form-item">
            <el-button type="primary" class="submit-button-register" @click="submit">{{$t('login.register')}}</el-button>
          </div>
        </div>
        <!-- 切换链接 -->
        <div class="footer-container">
          <div class="account-switch">
            {{ $t('login.alreadyHaveAccount') }}
            <a href="#" @click="switchForm">{{ $t('login.login') }}</a>
          </div>
          <!-- 语言切换等其他内容 -->
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {getMerchantInfo} from '@/api/account'
import i18n from "@/i18n";
import {mapGetters, mapMutations, mapState} from "vuex";
import { generateKey, getRand, merchantRegister } from "@/api/register";

export default {
  name: 'login',
  data() {
    return {
      flag: false,
      codeUrl: '',
      cookiePassword: '',
      // loginForm: {
      //   merNo: '',
      //   usname: '',
      //   passwd: '',
      // },
      isLogin: true,
      countdown: 0,
      message: '',
      loginForm: {
        account: '',
        password: '',
        // merNo: '104001001',
        // usname: 'vmpay',
        // passwd: '12345678',
      },
      registerForm: {
        username: '',
        email: '',
        password: '',
        confirmedPassword: '',
        rand: '',
        uuid: '',
        privateKey: '',
        agreement: false,
				identity:0,
				realMerNo:'',
      },
      loginRules: {
        merNo: [{ required: true, trigger: 'blur', message: this.$t('login.merchantIdRequired') }],
        usname: [{ required: true, trigger: 'blur', message: this.$t('login.usernameRequired') }],
        passwd: [{ required: true, trigger: 'blur', message: this.$t('login.passwordRequired') }],
      },
      loading: false,
      redirect: undefined,
      imgStyle: {
        width: '140px',
        height: '70px',
        marginBottom: '30px',
      },
      logoUrl: '',
    };
  },
  created() {
    // this.getInfo()
		const jumpType = this.$route.query.jumpType;
		const email = this.$route.query.email;
		const realMerNo = this.$route.query.realMerNo;
		if(jumpType&&Number(jumpType)===0){
			this.isLogin = false;
			if(email) {
				this.registerForm.email = email;
			}
		}
		if(jumpType&&Number(jumpType)===1){
			this.isLogin = false;
			this.registerForm.identity = 1;
			if(realMerNo) {
				this.registerForm.realMerNo = realMerNo;
			}
		}
    this.generateKeyToRegister();
  },

  computed: {
    ...mapGetters(['getCountryName']),
    ...mapGetters(['getCountries']),
    ...mapGetters({
      currentLanguage: 'getCurrentLanguage' // 获取当前语言代码
    }),
    type() {
      return this.flag ? 'text' : 'password';
    },
    elIcon() {
      return this.flag ? 'showpassword' : 'nopassword';
    },
    host() {
      return window.location.host;
    }
  },
  methods: {
    ...mapMutations(['changeLanguage']),
    switchForm() {
      this.isLogin = !this.isLogin;
    },
    generateKeyToRegister() {
      generateKey().then(result => {
        if (result.status === 200) {
          this.registerForm.privateKey = result.data.randomKey;
        }
      });
    },
    submit() {
      if (this.isLogin) {
        // 登录逻辑
        if (!this.loginForm.account) {
          this.$message.error(this.$t('login.enterUsername'));
          return;
        }
        if (!this.loginForm.password) {
          this.$message.error(this.$t('login.enterPassword'));
          return;
        }
        this.handleLogin();

        // 进行登录操作...
      } else {
        // 注册逻辑
        if (!this.registerForm.username) {
          this.$message.error(this.$t('login.enterUsernameTwo'));

          return;
        }
        if (!this.registerForm.email) {
          this.$message.error(this.$t('login.please_email'));
          return;
        }
        // 邮箱验证格式
        let emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailPattern.test(this.registerForm.email)) {
          this.$message.error(this.$t('login.incorrectEmailFormat'));

          return;
        }
        if (!this.registerForm.password) {
          this.$message.error(this.$t('login.enterPassword'));
          return;
        }
        if (!this.registerForm.confirmedPassword) {
          this.$message.error(this.$t('register.confirmPasswordRequired'));
          return;
        }
        // 密码对比
        if (this.registerForm.password !== this.registerForm.confirmedPassword) {
          this.$message.error(this.$t('register.passwordsNotMatch'));
          return;
        }
        if (!this.registerForm.rand) {
          this.$message.error(this.$t('login.please_input_password'));
          return;
        }
        if (!this.registerForm.agreement) {
          this.$message.error(this.$t('login.you_need_agree_protocol_to_register'));
          return;
        }
        this.handleRegister();

        // 进行注册操作...
      }
      console.log('提交表单', this.isLogin ? this.loginForm : this.registerForm);
    },
    getCode() {
      if (!this.registerForm.email) {
        this.$message.error(this.$t('login.please_email'));
        return;
      }
      getRand({email: this.registerForm.email}).then(result => {
        this.registerForm.uuid=result.uuid
      });
      // 开始倒计时
      this.countdown = 60;
      let interval = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) clearInterval(interval);
      }, 1000);
      // 发送验证码逻辑
    },
    handleLogin() {
      this.loading = true;
      this.$store
        .dispatch('Login', this.loginForm)
        .then((res) => {
          if (res.data.merType === 0) {
            this.$router.push({ path: this.redirect || '/' }).catch(() => {
            });
          } else {
            this.$router.push({ path: this.redirect || 'business/list' }).catch(() => {
            });
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
    handleRegister() {
      merchantRegister({
        ...this.registerForm,
      }).then(result => {
        if (result.status === 200) {
          this.isLogin = true;
          this.loginForm.account = this.registerForm.email;
          this.loginForm.password = this.registerForm.password;
          this.$router.push({ path: "/login" });
        } else {
          this.$message.error(result.msg);
        }
      });
    },
    isDevelopment() {
      // alert(process.env.NODE_ENV)
      return process.env.NODE_ENV === 'development';
    },
    handleClick() {
      if (this.isDevelopment()) {
        window.location.href = 'https://test.example.com'; // 跳转到测试环境链接
      } else {
        window.location.href = 'https://production.example.com'; // 跳转到生产环境链接
      }
    },
    async getInfo(){
      try {
        const res = await getMerchantInfo({domain: window.location.host});
        // 禁用状态
        if (res.data.status === 0) {
          await this.$router.replace({ path: '/404' });
          return;
        }
      }catch (e) {
        console.error(e);
      }
    }
  },
};
</script>
<style scoped>
/* ...保持原有样式不变... */
.main-Login {
    position: fixed;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    height: 100%;
    background-image: url("../assets/images/login/newbg.png") ;
    background-size: cover;
}

.content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.logo-image {
    width: 207px;
    height: 40px;
    margin-bottom: 20px;
}

.form-card {
    width: 420px;
    max-height: 644px;
    padding: 32px 50px;
    box-sizing: border-box;
    background: #FFFFFF;
    border-radius: 16px;
}

.form-title {
    font-family: PingFangSC, PingFang SC;
    font-weight: 600;
    font-size: 24px;
    color: #364A63;
    line-height: 26px;
    text-align: center;
    font-style: normal;

}


.submit-button-login {
    width: 100%;
    margin-top: 30px;
    margin-bottom: 16px;

}
.submit-button-register {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 16px;
}

.footer-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.account-switch {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #8094AE;
    line-height: 20px;
    text-align: left;
    font-style: normal;

}
.account-switch a {
    color: #7F8DFF;
}
.account-switch a:hover {
    text-decoration: underline;
}
.language-switcher {
    text-align: center;
    cursor: pointer;
}

.dropdown-display {
    display: flex;
    align-items: center;
}

.language-display {
    display: flex;
    align-items: center;
}

.language-text {
    margin-right: 8px;
}

.language-icon {
    width: 8px;
    height: 6px;
}

.input-with-code {
    position: relative;
}

.code-icon {
    position: absolute;
    right: 10px;
    cursor: pointer;
}

.code-countdown {
    position: absolute;
    right: 10px;
    color: #999;
}
.input-with-code .el-input-group__append {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    height: 20px;
}

/* 新增的样式类 */
.text-username,
.text-email,
.text-password,
.text-code,
.text-confirmed-password,
.text-agreement {
    /* 你可以在这里添加通用样式，或者为每个类单独设置样式 */
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #526484;
    line-height: 18px;
    text-align: left;
    font-style: normal;
    margin-bottom: 7px;
    margin-top: 20px;

}
.input-wrapper {
    position: relative;
}

.code-button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
}

.cursor-pointer {
    cursor: pointer;
}
.text-read-agreement {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #8094AE;
    line-height: 20px;
    text-align: left;
    font-style: normal;

}

.code-text {
    font-family: PingFangSC, PingFang SC;
    font-weight: 400;
    font-size: 14px;
    color: #7F8DFF;
    line-height: 18px;
    text-align: left;
    font-style: normal;
}

/*deep样式覆盖*/
.custom-input >>> .el-input__inner {
    height: 40px;

}

:deep .el-checkbox__inner {
    border-radius: 50% !important;
}

</style>



