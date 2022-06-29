<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
      </div>
      <!-- 设置height实现头部固定 -->
      <el-table ref="multipleTable" size="mini" border 
      style="margin:auto;width:780px" height="500px" 
      :data=" data"   >
        <el-table-column  label="商品名称" width="100" align="center">
          <template  slot-scope="scope">
            <a >{{scope.row.spname}}</a>
          </template>
        </el-table-column>
        <!-- 通过sortable添加排序功能 -->
        <el-table-column prop="star" label="星级"  width="100" align="center"></el-table-column>
        <el-table-column prop="text" label="评论"  width="180" align="center"></el-table-column>
        <el-table-column prop="username" label="账户"  width="80" align="center"></el-table-column>
        <el-table-column label="状态" width="100" align="center"
        :filters="[{text: '审核中', value: 0}, {text: '审核通过', value: 1}]"
        :filter-method="filtertype">
          <template slot-scope="scope">
            <div>{{changetype(scope.row.type) }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" circle @click="handleEdit(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.row.id)"></el-button>
            <el-button type="success" icon="el-icon-check" circle @click="setRow(scope.row.id)"></el-button>
            <!-- <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button> -->
            <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button> -->
            <!-- <el-button size="mini" @click="setRow(scope.row.id)">审核通过</el-button> -->
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
    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="400px">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品id" size="mini">
          {{form.spid}}
        </el-form-item>
        <el-form-item label="商品名称" size="mini">
          {{form.spname}}
        </el-form-item>
        <el-form-item label="账户" size="mini">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="星级" size="mini">
          <el-input v-model="form.star"></el-input>
        </el-form-item>
        <el-form-item label="评论" size="mini">
          <el-input v-model="form.text"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini"  @click="editVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
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
  },
  methods: {
    // 获取评论
    getData () {
      this.tableData = []
      this.tempData = []
      axios.post('api/chaoshi/getpinglun').then(res => {        
        console.log(res);
        this.tableData = res.data
        this.tempData = res.data     
      })
    },
    // 获取要删除列表的id
    handleDelete (id) {
      this.idx = id
      this.delVisible = true
    },
     // 审核通过
    setRow (id1) {
      let id=id1;
      let params={id}      
      console.log(params)
      axios.post('api/chaoshi/updatepinglun1',params).then(res => {
      console.log(res.data); 
          if (res) {
            this.getData()
            this.notify('审核通过成功', 'success')
          } else {
            this.notify('审核通过失败', 'error')
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.delVisible = false
    },
    // 确定删除
    deleteRow () {
      let id=this.idx;
      let params={id}      
      console.log(params)
      axios.post('api/chaoshi/deletepinglun',params).then(res => {
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
    // 编辑
    handleEdit (row) {
      this.editVisible = true
      this.idx = row.id
      this.form = {
        id: row.id,
        spid:row.spid,
        username: row.username,
        star: row.star,
        text: row.text,
        type: row.type,
        spname: row.spname,
      }
    },
    // 保存编辑
    saveEdit () {
      let id=this.form.id
      let spid=this.form.spid
      let username=this.form.username
      let star=this.form.star
      let text=this.form.text
      let type=this.form.type
      let spname=this.form.spname
      let params ={spid,username,star,text,type,spname,id}            
      console.log(params)
      axios.post('api/chaoshi/updatepinglun',params).then(res => {
        console.log(res); 
        if (res.data.affectedRows!= 0) {
            this.getData()
            this.notify('编辑成功', 'success')
          } else {
            this.notify('编辑失败', 'error')
          }
        })
        .catch(err => {

          console.log(err)
        })
      this.editVisible = false
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
        return '待审核'
      } else if (value === 1) {
        return '审核通过'
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
