<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" size="mini" class="handle-del mr10" @click="delAll">批量删除</el-button>
        <el-input v-model="select_word" size="mini" style="width:80px" placeholder="筛选关键词" class="handle-input"></el-input>
        <el-button type="primary" size="mini" @click="centerDialogVisible = true">添加用户</el-button>
      </div>
      <!-- 设置height实现头部固定 -->
      <el-table ref="multipleTable" size="mini" border 
      style="margin:auto;width:1000px" height="500px" 
      :data=" data"   
      @selection-change="handleSelectionChange" >
        <!--  type="selection"实现数据多选 -->
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column  label="账号" width="100" align="center">
          <template  slot-scope="scope">
            <a >{{scope.row.name}}</a>
          </template>
        </el-table-column>
        <!-- 通过sortable添加排序功能 -->
        <el-table-column prop="password" label="密码"  width="100" align="center"></el-table-column>
        <el-table-column prop="name1" label="用户姓名"  width="80" align="center"></el-table-column>
        <el-table-column prop="mailbox" label="邮箱"  width="80" align="center"></el-table-column>
        <el-table-column label="等级" width="100" align="center"
        :filters="[{text: '青铜会员', value: 1}, {text: '白银会员', value: 2}, {text: '黄金会员', value: 3}, {text: '铂金会员', value: 4}, {text: '钻石会员', value: 5}]"
        :filter-method="filtergrade">
          <template slot-scope="scope">
            <div>{{changegrade(scope.row.grade) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="地址" width="120" align="center"></el-table-column>
        <el-table-column prop="telephone" label="电话" width="120" align="center"></el-table-column>
        <el-table-column prop="num" label="消费" sortable width="120" align="center"></el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
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
    <!-- 添加弹出框 -->
    <el-dialog title="添加用户" :visible.sync="centerDialogVisible" width="400px" center>
      <el-form
        :model="registerForm"
        status-icon
        ref="registerForm"
        label-width="80px"
        class="demo-ruleForm"
        >
        <el-form-item prop="name" label="账号" size="mini">
          <el-input v-model="registerForm.name" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="test1" label="密码" size="mini">
          <el-input v-model="registerForm.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="等级" size="mini">
          <el-radio-group v-model="registerForm.grade">
            <el-radio :label="1">青铜会员</el-radio>
            <el-radio :label="2">白银会员</el-radio>
            <el-radio :label="3">黄金会员</el-radio>
            <el-radio :label="4">铂金会员</el-radio>
            <el-radio :label="5">钻石会员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="test1" label="姓名" size="mini">
          <el-input v-model="registerForm.name1" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item prop="test3" label="邮箱" size="mini">
          <el-input v-model="registerForm.mailbox" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item prop="test4" label="地址" size="mini">
          <el-input v-model="registerForm.address" placeholder="地址"></el-input>
        </el-form-item>
        <el-form-item prop="test5" label="电话" size="mini">
          <el-input v-model="registerForm.telephone" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item prop="test6" label="消费" size="mini">
          <el-input v-model="registerForm.num" placeholder="消费"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="addyh">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="400px">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号" size="mini">
          {{form.name}}
        </el-form-item>
        <el-form-item label="密码" size="mini">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="姓名" size="mini">
          <el-input v-model="form.name1"></el-input>
        </el-form-item>
        <el-form-item label="等级" size="mini">
          <el-radio-group v-model="form.grade">
            <el-radio :label="1">青铜会员</el-radio>
            <el-radio :label="2">白银会员</el-radio>
            <el-radio :label="3">黄金会员</el-radio>
            <el-radio :label="4">铂金会员</el-radio>
            <el-radio :label="5">钻石会员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱" size="mini">
          <el-input v-model="form.mailbox"></el-input>
        </el-form-item>
        <el-form-item label="地址" size="mini">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="电话" size="mini">
          <el-input v-model="form.telephone"></el-input>
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
      test4:{},
      test1:'',
      price:'',
      selected:'',
      // 添加框信息
      registerForm: {
        name: '',
        password: '',
        name1: '',
        mailbox: '',
        grade: '',
        address: '',
        telephone: '',
        num: '',
      },
      // 编辑框信息
      form: {
        id: '',
        name: '',
        password: '',
        name1: '',
        mailbox: '',
        grade: '',
        address: '',
        telephone: '',
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
          if (item.name1.includes(this.select_word)) {
            this.tableData.push(item)
          }
        }
      }
    }
  },
  methods: {
    // 获取用户
    getData () {
      this.tableData = []
      this.tempData = []
      axios.post('api/chaoshi/get').then(res => {        
        console.log(res);
        this.tableData = res.data
        this.tempData = res.data     
      })
    },
    //批量删除
    delAll () {
      for (let item of this.multipleSelection) {
        this.handleDelete(item.id)
        this.deleteRow()
      }
      this.multipleSelection = []
    },
    // 获取要删除列表的id
    handleDelete (id) {
      this.idx = id
      this.delVisible = true
    },
    // 确定删除
    deleteRow () {
      let id=this.idx;
      let params={id}      
      console.log(params)
      axios.post('api/chaoshi/delete',params).then(res => {
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
    // 添加用户
    addyh () {
      let name=this.registerForm.name
      let password=this.registerForm.password
      let name1=this.registerForm.name1
      let mailbox=this.registerForm.mailbox
      let grade=this.registerForm.grade
      let address=this.registerForm.address
      let telephone=this.registerForm.telephone
      let num=this.registerForm.num
      let params ={name,password,name1,mailbox,grade,address,telephone,num} 
      console.log(params)
      axios.post('api/chaoshi/adduser1',params).then(res => {
        console.log(res); 
          if (res.data.affectedRows!=0) {
            this.getData()
            this.registerForm = {}
            this.notify('添加成功', 'success')
          } else {
            this.notify('添加失败', 'error')
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.centerDialogVisible = false
    },
    // 编辑
    handleEdit (row) {
      this.editVisible = true
      this.idx = row.id
      this.form = {
        id: row.id,
        name:row.name,
        password: row.password,
        name1: row.name1,
        mailbox: row.mailbox,
        grade: row.grade,
        address: row.address,
        telephone: row.telephone
      }
    },
    // 保存编辑
    saveEdit () {
      let id=this.form.id
      let name=this.form.name
      let password=this.form.password
      let name1=this.form.name1
      let mailbox=this.form.mailbox
      let grade=this.form.grade
      let address=this.form.address
      let telephone=this.form.telephone
      let params ={name,password,name1,mailbox,grade,address,telephone,id}            
      console.log(params)
      axios.post('api/chaoshi/update',params).then(res => {
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
    //前端静态筛选用户类型
    filtergrade(value, row) {
      return row.grade === value;
    },
      // 更新图片
      handleAvatarSuccess (res, file) {
        let _this = this
        if(res.affectedRows!=0){
          _this.imageUrl = URL.createObjectURL(file.raw)
          _this.getData()
          _this.$notify({
            title: '上传成功',
            type: 'success'
          })
        } else {
          _this.$notify({
            title: '上传失败',
            type: 'error'
          })
        }
      },
      beforeAvatarUpload (file) {
        const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png')
        const isLt3M = file.size / 1024 / 1024 < 3
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt3M) {
          this.$message.error('上传头像图片大小不能超过 3MB!')
        }
        return isJPG && isLt3M
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
