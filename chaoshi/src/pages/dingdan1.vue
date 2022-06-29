<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
      </div>
      <!-- 设置height实现头部固定 -->
      <el-table ref="multipleTable" size="mini" border 
      style="margin:auto;width:780px" height="500px" 
      :data=" data"   >
        <el-table-column  label="账户名" width="100" align="center">
          <template  slot-scope="scope">
            <a  @click="menuClick(scope.row)">{{scope.row.username}}</a>
          </template>
        </el-table-column>
        <!-- 通过sortable添加排序功能 -->
        <el-table-column prop="address" label="地址"  width="130" align="center"></el-table-column>
        <el-table-column prop="telephone" label="电话"  width="150" align="center"></el-table-column>
        <el-table-column prop="total" label="总价"  width="80" align="center"></el-table-column>
        <el-table-column label="状态" width="100" align="center"
        :filters="[{text: '新订单', value: 0}, {text: '已发货', value: 1}, {text: '已送达', value: 2}]"
        :filter-method="filtertype">
          <template slot-scope="scope">
            <div>{{changetype(scope.row.type) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="deleteRow(scope.row)">删除订单</el-button>
          </template>
        </el-table-column>   
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
    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt" align="center">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="delVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>    
  </div>
</template>
<script>
//导入axios
import axios from 'axios';
export default {
  name: 'shangpin-page',
  data () {
    return {
      tableData: [],
      tempData: [],
      selected:'',
      // 编辑框信息
      form: {
        id: '',
        spid: '',
        username: '',
        star: '',
        text: '',
        spname: '',
        type: '',
      },
      select_word:'',
      centerDialogVisible: false,
      editVisible: false,
      delVisible: false,
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
    select_word: function () {
      if (this.select_word === '') {
        this.tableData = this.tempData
      } else {
        this.tableData = []
        for (let item of this.tempData) {
          if (item.name.includes(this.select_word)) {
            this.tableData.push(item)
          }
        }
      }
    }
  },
  methods: {
    menuClick(row){
      this.name = this.$route.query.name;
      this.$router.push({
        path: 'dd1',
        query:{ddid:row.id,name:this.name},
        
      });
      console.log(row.id)
    },
    // 获取订单
    getData () {
      let username = this.$route.query.name;
      this.tableData = []
      this.tempData = []
      let params={username}
      axios.post('api/chaoshi/getdingdan1',params).then(res => {        
        console.log(res);
        this.tableData = res.data
        this.tempData = res.data     
      })
    },

     // 审核通过
    setRow (row,type1) {
      let id=row.id;
      let type = type1;
      let params={id,type}      
      console.log(params)
      axios.post('api/chaoshi/updatedingdan',params).then(res => {
      console.log(res.data); 
          if (res) {
            this.getData()
            this.notify('修改成功', 'success')
          } else {
            this.notify('修改失败', 'error')
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.delVisible = false
    },
    // 确定删除
    deleteRow (row) {
        let id=row.id
      let params={id}      
      console.log(params)
      axios.post('api/chaoshi/deletedingdan',params).then(res => {
      console.log(res.data); 
          if (res) {
            this.getData()
            this.notify('删除成功', 'success')
          } else {
            this.notify('删除失败', 'error')
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.delVisible = false
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
    //多选暂存
    handleSelectionChange(val) {
        this.multipleSelection = val;//把这一整条数据存入multipleSelection
        console.log(this.multipleSelection);
    },
    //商品类型转换
    changetype (value) {
      if (value === 0) {
        return '新订单'
      } else if (value === 1) {
        return '已发货'
      }else if (value === 2) {
        return '已送达'
      }
      
    },
    //前端静态筛选学校类型
    filtertype(value, row) {
      return row.type === value;
    },
      attachBirth (val) {
        return val.substring(0,10); 
      },
  }
}
</script>
<style >

.element.style {


    height: 500px;
}
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
