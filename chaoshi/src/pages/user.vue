<template>
  <el-container>
  <el-header>
      <div style="width:40%;float:right">
<el-menu 
 default-active="1" 
 class="el-menu-demo" 
 mode="horizontal" 
 @select="menuClick">
  <el-menu-item index="/">退出</el-menu-item>
  <el-submenu index="2">
    <template slot="title">超市服务</template>
    <el-menu-item index="/shangpin1">商品浏览</el-menu-item>
    <el-menu-item index="/che">购物车</el-menu-item>
    
  </el-submenu>
  <el-menu-item index="/geren">个人信息</el-menu-item>
  <el-menu-item index="/dingdan1">订单管理</el-menu-item>
</el-menu>
      </div>
  </el-header>
  <el-main>    
<router-view/>
  </el-main>
</el-container>
</template>

<script>
export default {
  name: 'user',
  data () {
      return{
          id:''
   }
  },
  created () {
      this.menuClick("/shangpin1")
  },
  methods: {
    // 导航菜单点击事件
    menuClick(index){
      this.id = this.$route.query.name;
      this.$router.push({
        path: index,
        query:{name:this.id},
        
      });
      console.log(this.id)
    },
  }
}
</script>

<style>
  .el-header, .el-footer {
    /* background-color: #B3C0D1; */
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /* line-height: 160px; */
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