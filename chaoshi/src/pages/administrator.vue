<template>
<div>
<el-container>
  <!-- 头部 -->
  <el-header>超市系统后台管理
    <el-button style="" size="mini" @click="menuClick('/')">退出登录</el-button>
  </el-header>

  <el-container >
    <!-- 左导航栏 -->
    <el-aside width="200px" ><el-row class="tac">

  <el-col >
    <el-menu @select="menuClick"
      default-active="2"
      height="100%"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>系统后台管理</span>
        </template>
          <el-menu-item index="/shangpin">商品管理</el-menu-item>
          <el-menu-item index="/pinglun">评论管理</el-menu-item>
          <el-menu-item index="/dingdan">订单管理</el-menu-item>
      </el-submenu>
      <el-menu-item index="/yh">
        <i class="el-icon-menu"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="/test1">
        <i class="el-icon-setting"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="/baokao">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
</el-aside>
    <el-main>
    <div>
<router-view/>
    </div>
    </el-main>
  </el-container>
</el-container>
  </div>
</template>
<script>
export default {
  name: 'administrator',
  data () {
      return{

   }
  },
  methods: {
    // 导航菜单点击事件
    menuClick(index){
      this.$router.push(index);
    },
   
  }
}
</script>
<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;

  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

