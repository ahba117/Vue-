<template>
  <div class="table">
    <div class="container">

      <div class="handle-box">
      </div>
      
      <!-- 设置height实现头部固定 -->
      <el-table ref="multipleTable" size="mini" border 
      style="margin:auto;width:380px" height="400px" 
      :data=" data"   
     >
        <!--  type="selection"实现数据多选 -->
        <!-- <el-table-column type="selection" width="40"></el-table-column> -->
        <el-table-column label="商品图标" width="100" align="center">
          <template slot-scope="scope">
            <div class="school-img">
              <img :src="getUrl(scope.row.spurl)" alt="" style="width: 100%;"/>
            </div>            
          </template>
        </el-table-column>
        <el-table-column  label="商品名称" width="100" align="center">
          <template  slot-scope="scope">
            <a >{{scope.row.spname}}</a>
          </template>
        </el-table-column>
        <!-- 通过sortable添加排序功能 -->
        <el-table-column prop="spprice" label="单价" sortable width="80" align="center"></el-table-column>
        <el-table-column prop="num" label="购买数量"  width="80" align="center"></el-table-column>
      </el-table>
      <!-- 分页实现 -->
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          background 
          layout="total, prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="tableData.length">
        </el-pagination>
      </div> 
  
    </div>
       
  </div>
</template>
<script>
//导入axios
import axios from 'axios';
export default {
  name: 'che-page',
  data () {
    return {
      tableData: [],
      tempData: [],
      Data:[],
      Data1:[],
      grade:0,
      selected:'',
      num0:'',
      sum:0,
      sum1:0,
      // 编辑框信息
      form: {
        id: '',
        spname: '',
        spprice: '',
        num:'',
      },
      form1: {
            name:'',
            password:'',
            name1:'',
            mailbox:'',
            grade:'',
            address:'',
            telephone:'',
            num:'',
      },
      select_word:'',
      centerDialogVisible: false,
      multipleSelection: [],//多选获取
      pageSize: 6, //页面条目数
      currentPage: 1, // 当前页数
      idx:-1,
     }
  },
  created () {
    this.getData()
  },
  computed: {
    // 计算当前表格中的数据，用于分页。
    data () {
  //slice方法通过索引位置获取并返回一个新的子数组。
  //用法：arrayObj.slice(start,end)，其中，arrayObj 为原数组，
//start设定新数组的起始位置，end设定新数组的结束位置。
      return this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      
    }
  },
  watch: {
    //select_word监听数据变化，实现快速实时查询功能

  },
  methods: {
    // 获取购物车
    getData () {
      let username= this.$route.query.name;
      let ddid = this.$route.query.ddid;
      let params={username,ddid}      
      this.tableData = []
      this.tempData = []
      axios.post('api/chaoshi/getche',params).then(res => {        
        this.tableData = res.data
        this.tempData = res.data     
      })

    },


    // 显示提示信息
    notify (title, type) {
      this.$notify({
        title: title,
        type: type
      })
    },
    getUrl (url) {
      return `http://127.0.0.1:8888${url}` 
    },
    uploadUrl (id) {
      return `/api/chaoshi/updateshangpinurl?id=${id}` 
    },
    // 获取当前页
    handleCurrentChange (val) {
      this.currentPage = val
    },  
      attachBirth (val) {
        return val.substring(0,10); 
      },
  }
}
</script>
<style >
.cc{
  text-decoration:none;
}
.handle-box {
  margin-bottom: 20px;
}
.handle-input {
  width: 300px;
  display: inline-block;
}
.school-img {
  width: 100%;
  height: 80px;
  border-radius: 5px;
  margin-bottom: 5px;
  overflow: hidden;
}
.pagination {
  display: flex;
  justify-content: center;
}
</style>
