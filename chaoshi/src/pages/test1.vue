
<template>
<div id="login">
<div class="T1">

    <div v-bind:class="[{tt11:isshow},'tt1']">
        <div class="tt111">
            <div style="width:20%;float:left">账号:</div>
            <input style="float:left;width:60%" placeholder="账号" v-model="account">
        </div>
        <div class="tt112">
            <div style="width:20%;float:left">密码:</div>
            <input style="float:left;width:60%" placeholder="密码" v-model="password">
        </div>
        <div class="tt113">
            <div style="width:20%;float:left">用户类型:</div>
            <select v-model="selected" style="">
            <option disabled value="">请选择</option>
            <option>用户</option>
            <option>管理员</option>
            </select>
        </div>
        <div style="text-align:center;margin-top:20px">
            <el-button @click="login" >登录</el-button>
        </div>
    </div>
    <div class="tt2" style="">
        <div style="text-align:center;margin-top:250px">      
            <a>欢迎来到超市管理系统</a>
        </div>
        <div style="text-align:center;margin-top:20px">
            <el-button @click="click1">{{text}}</el-button>
        </div>
    </div>
    <div v-bind:class="[{tt13:tt3},'tt3']">
        <div v-if="tt3">
        <div class="tt111">
            <div style="width:20%;float:left">账号:</div>
            <input style="float:left;width:60%" placeholder="请输入您的账号" v-model="account">
        </div>
        <div class="tt112">
            <div style="width:20%;float:left">邮箱:</div>
            <input style="float:left;width:60%" placeholder="请输入您的邮箱" v-model="email">
        </div>
        <div class="tt112">
            <div style="width:20%;float:left">密码:</div>
            <input style="float:left;width:60%" placeholder="请输入您的密码" v-model="password">
        </div>
        <div style="text-align:center;margin-top:20px">
            <el-button @click="login1" >注册</el-button>
        </div>
        </div>
    </div>
</div>
</div>
</template>
<script>
// {{account}}{{password}}{{email}}
import axios from 'axios';
export default {
    name: 'TT2',
   
data () {
    return {
      tableData: [],
      tempData: [],
      isshow:false,
      text:'注册',
      account:'',
      password:'',
      email:'',
      selected:'',//用户类型
      tt3:false,
    }
     
  },
  created () {

  },
  methods: {
    // 显示提示信息
    notify (title, type) {
      this.$notify({
        title: title,
        type: type
      })
    },
    click1(){
        if(this.text=='注册'){
            this.isshow=true
            this.text='登录'
            this.account=''
            this.password=''
            this.email=''
            setTimeout(() =>{
                this.tt3=true
            },500);
        }else{
            this.isshow=false
            this.text='注册'
            this.account=''
            this.password=''
            this.email=''
            this.tt3=false
        }
    },
        login() {
			if(this.account==''||this.password==''){
                this.$message.warning("请输入账号或密码");
                return;
            }
            let account = this.account
            let password = this.password
            let params ={account,password}            
            console.log(params)
            if(this.selected=='用户'){
                  axios.post('api/chaoshi/selectuser',params).then(res => {
                      if(res.data.loginstatus=='2'){
                                this.$router.push({
								path:'/user',
								query:{name:account}
							 });
                      }
                      else {this.$message.error("账号或密码错误");
                      }
                  })
        	.catch(err => {
          		console.log(err)
          		console.log('res.data.loginstatus')
        	})
            }else if(this.selected=='管理员'){
                  axios.post('api/chaoshi/getgl',params).then(res => {
                      if(res.data.loginstatus=='2'){
                             this.$router.push('/administrator');
                      }
                      else {this.$message.error("账号或密码错误");
                      }
                  })
        	.catch(err => {
          		console.log(err)
          		console.log('res.data.loginstatus')
        	})
            }else{
                this.$message.warning("请选择用户类型");
            }

	    },
        login1() {
			if(this.account==''||this.password==''||this.email==''){
                this.$message.warning("请输入账号或密码或邮箱");
                return;
            }
            let account = this.account
            let password = this.password
            let email = this.email
            let params ={account,password,email}            
            console.log(params)
                  axios.post('api/chaoshi/adduser',params).then(res => {
                      if(res.data.loginstatus=='3'){
                            this.$message.success("账号注册成功");
                      }
                      else {this.$message.error("账号注册失败，账号已存在");
                      }
                  })
        	.catch(err => {
          		console.log(err)
          		console.log('res.data.loginstatus')
        	})
	    },
  }
    
}


</script>

<style>
#login{
  background:url(".//031.png");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}

.T1{
    margin: auto;
    margin-top: 100px;
    width: 60%;
    height: 400px;
   
}
.tt1{
    float: left;
    width: 50%;
    height: 400px;
    background:url(".//2.png");
    background-size: 100% 100%;
    transition:height 1s,right 1s;
    -webkit-transition:width 1s,height 1s;

}
.tt11{
	width:0px;
	height:0px;
}
.tt111{
    width: 80%;
    margin: auto;
    margin-top: 100px;
    height: 30px;
}
.tt112{
    width: 80%;
    margin: auto;
    margin-top: 20px;
    height: 30px;
}
.tt113{
    width: 80%;
    margin: auto;
    margin-top: 20px;
    height: 30px;
}
.tt2{
    float: left;
    width: 50%;
    height: 400px;
    background:url(".//3.png");
    background-size: 100% 100%;
}
.tt3{
    float: left;
    width:0px;
	height:0px;
    background:url(".//4.png");
    background-size: 100% 100%;
    transition:height 1s,right 1s;
    -webkit-transition:width 1s,height 1s;
}
.tt13{
    width: 50%;
    height: 400px;
}
</style>