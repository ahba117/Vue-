<template>
  <div>
    <el-container style="height: 700px; border: 1px solid #eee">

      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="[]">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>我的账号</template>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>隐私设置</template>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-message"></i>我的收藏</template>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-setting"></i>我的足迹</template>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>我的数据</template>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-message"></i>我的订单</template>
          </el-submenu>



        </el-menu>
      </el-aside>

      <el-container>
        <!--        <el-header style="text-align: right; font-size: 12px">-->
        <!--          <el-dropdown>-->
        <!--            <i class="el-icon-setting" style="margin-right: 15px"></i>-->
        <!--            <el-dropdown-menu slot="dropdown">-->
        <!--              <el-dropdown-item>查看</el-dropdown-item>-->
        <!--              <el-dropdown-item>新增</el-dropdown-item>-->
        <!--              <el-dropdown-item>删除</el-dropdown-item>-->
        <!--            </el-dropdown-menu>-->
        <!--          </el-dropdown>-->
        <!--          <span>王小虎</span>-->
        <!--        </el-header>-->

        <el-main>
          <div style="width:40%;margin:auto;">
            <el-form :label-position="labelPosition" label-width="80px" >
              <el-form-item label="账号">
                {{form.name}}
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input class="at" v-model="form.mailbox"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input class="at" v-model="form.password"></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input class="at" v-model="form.name1"></el-input>
              </el-form-item>
              <el-form-item label="等级">
                {{changegrade(form.grade)}}
              </el-form-item>
              <el-form-item label="地址">
                <el-input class="at" v-model="form.address"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input class="at" v-model="form.telephone"></el-input>
              </el-form-item>
              <el-form-item label="已消费">
                {{form.num}}
              </el-form-item>
              <el-button size="mini" @click="saveEdit()">保存信息</el-button>
            </el-form>
          </div>
        </el-main>

      </el-container>

    </el-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      labelPosition: 'right',
      form:{
        name:'',
        password:'',
        name1:'',
        mailbox:'',
        grade:'',
        address:'',
        telephone:'',
        num:'',
      }
    };
  },
  created () {
    this.click()
  },
  methods: {
    changegrade (value) {
      if (value === 5) {
        return '钻石会员'
      } else if (value === 1) {
        return '青铜会员'
      }else if (value === 2) {
        return '白银会员'
      }else if (value === 3) {
        return '黄金会员'
      }else if (value === 4) {
        return '铂金会员'
      }

    },
    click(){
      // 获取个人信息
      let account = this.$route.query.name;
      let params={account}
      console.log(account)
      axios.post('api/chaoshi/selectuser1',params).then(res => {
        this.form = res.data[0]
      })
    },
    // 保存编辑
    saveEdit () {
      let id=this.form.id
      let password=this.form.password
      let name1=this.form.name1
      let mailbox=this.form.mailbox
      let grade=this.form.grade
      let address=this.form.address
      let telephone=this.form.telephone
      let params ={password,name1,mailbox,grade,address,telephone,id}
      console.log(params)
      axios.post('api/chaoshi/update',params).then(res => {
        console.log(res);
        if (res.data.affectedRows!= 0) {
          this.notify('编辑成功', 'success')
        } else {
          this.notify('编辑失败', 'error')
        }
      })
        .catch(err => {

          console.log(err)
        })
    },
    // 显示提示信息
    notify (title, type) {
      this.$notify({
        title: title,
        type: type
      })
    },
  }
}
</script>


<style>
/*.el-header {*/
/*  background-color: #B3C0D1;*/
/*  color: #333;*/
/*  line-height: 60px;*/
/*}*/

/*.el-aside {*/
/*  color: #333;*/
/*}*/


.at {
         height: 52px;
         background: #cce7e7;
         
         font-size: 14px;
         font-family: PingFangSC-Regular, PingFang SC;
         font-weight: 400;
         
         color: #117de2;
     }

</style>

