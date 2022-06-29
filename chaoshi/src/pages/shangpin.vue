<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" size="mini" class="handle-del mr10" @click="delAll">批量删除</el-button>
        <el-input v-model="select_word" size="mini" style="width:80px" placeholder="筛选关键词" class="handle-input"></el-input>
        <el-button type="primary" size="mini" @click="centerDialogVisible = true">添加商品</el-button>
            <select v-model="selected" style="">
            <option disabled value="">请选择</option>
            <option>价格</option>
            <option>销量</option>
            </select>
        <el-button type="primary" size="mini" plain @click="getDataASC">升序排列</el-button>
        <el-button type="primary" size="mini" plain @click="getDataDESC">降序排列</el-button>
        <el-input v-model="price" size="mini" style="width:80px" placeholder="价格"></el-input>
        <el-button type="primary" size="mini" plain @click="getData1">价格查询</el-button>
      </div>
      <!-- 设置height实现头部固定 -->
      <el-table ref="multipleTable" size="mini" border 
      style="margin:auto;width:885px" height="500px" 
      :data=" data"   
      @selection-change="handleSelectionChange" >
        <!--  type="selection"实现数据多选 -->
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column label="商品图标" width="100" align="center">
          <template slot-scope="scope">
            <div class="school-img">
              <img :src="getUrl(scope.row.url)" alt="" style="width: 100%;"/>
            </div>            

            <el-upload      
              class="upload-demo"
              :action="uploadUrl(scope.row.id)"       
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"                           
              >
              <el-button size="mini">更新图片</el-button>
            </el-upload>
          </template>
        </el-table-column>
        <el-table-column  label="商品名称" width="100" align="center">
          <template  slot-scope="scope">
            <a >{{scope.row.name}}</a>
          </template>
        </el-table-column>
        <!-- 通过sortable添加排序功能 -->
        <el-table-column prop="price" label="价格" sortable width="100" align="center"></el-table-column>
        <el-table-column prop="num1" label="库存" sortable width="80" align="center"></el-table-column>
        <el-table-column prop="num2" label="销量" sortable width="80" align="center"></el-table-column>
        <el-table-column label="类型" width="100" align="center"
        :filters="[{text: '零食', value: 0}, {text: '饮料', value: 1}, {text: '水果', value: 2}, {text: '蔬菜', value: 3}, {text: '肉食', value: 4}]"
        :filter-method="filtertype">
          <template slot-scope="scope">
            <div>{{changetype(scope.row.type) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="text" label="介绍" width="120" align="center"></el-table-column>
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
    <el-dialog title="添加商品" :visible.sync="centerDialogVisible" width="400px" center>
      <el-form
        :model="registerForm"
        status-icon
        ref="registerForm"
        label-width="80px"
        class="demo-ruleForm"
        >
        <el-form-item prop="school_name" label="商品姓名" size="mini">
          <el-input v-model="registerForm.school_name" placeholder="商品姓名"></el-input>
        </el-form-item>

        <el-form-item label="类型" size="mini">
          <el-radio-group v-model="registerForm.test1">
            <el-radio :label="0">零食</el-radio>
            <el-radio :label="1">饮料</el-radio>
            <el-radio :label="2">水果</el-radio>
            <el-radio :label="3">蔬菜</el-radio>
            <el-radio :label="4">肉食</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="test1" label="价格" size="mini">
          <el-input v-model="registerForm.test2" placeholder="价格"></el-input>
        </el-form-item>
        <el-form-item prop="test3" label="介绍" size="mini">
          <el-input v-model="registerForm.test3" placeholder="介绍"></el-input>
        </el-form-item>
        <el-form-item prop="test4" label="图标" size="mini">
          <el-input v-model="registerForm.test4" placeholder="图标"></el-input>
        </el-form-item>
        <el-form-item prop="test5" label="库存" size="mini">
          <el-input v-model="registerForm.test5" placeholder="库存"></el-input>
        </el-form-item>
        <el-form-item prop="test6" label="销量" size="mini">
          <el-input v-model="registerForm.test6" placeholder="销量"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="addschool">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="400px">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称" size="mini">
          <el-input v-model="form.school_name"></el-input>
        </el-form-item>
        <el-form-item label="图标" size="mini">
          <el-input v-model="form.test4"></el-input>
        </el-form-item>
        <el-form-item label="价格" size="mini">
          <el-input v-model="form.test2"></el-input>
        </el-form-item>
        <el-form-item label="类别" size="mini">
          <el-radio-group v-model="form.test1">
            <el-radio :label="0">零食</el-radio>
            <el-radio :label="1">饮料</el-radio>
            <el-radio :label="2">水果</el-radio>
            <el-radio :label="3">蔬菜</el-radio>
            <el-radio :label="4">肉食</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="介绍" size="mini">
          <el-input v-model="form.test3"></el-input>
        </el-form-item>
        <el-form-item label="库存" size="mini">
          <el-input v-model="form.test5"></el-input>
        </el-form-item>
        <el-form-item label="销量" size="mini">
          <el-input v-model="form.test6"></el-input>
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
        school_name: '',
        test1: '',
        test2: '',
        test3: '',
        test4: '',
        test5: '',
        test6: '',
      },
      // 编辑框信息
      form: {
        id: '',
        school_name: '',
        test1: '',
        test2: '',
        test3: '',
        test4: '',
        test5: '',
        test6: '',
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
    // 获取商品
    getData () {
      this.tableData = []
      this.tempData = []
      axios.post('api/chaoshi/getshangpin').then(res => {        
        console.log(res);
        this.tableData = res.data
        this.tempData = res.data     
      })
    },
    // 获取升序（按价格或销量）排列商品
    getDataASC () {
      this.tableData = []
      this.tempData = []
      if(this.selected=='价格'){
        axios.post('api/chaoshi/getshangpinASC').then(res => {        
          console.log(res);
          this.tableData = res.data
          this.tempData = res.data     
        })
      }else if(this.selected=='销量'){
        axios.post('api/chaoshi/getshangpin1ASC').then(res => {        
          console.log(res);
          this.tableData = res.data
          this.tempData = res.data     
        })
      }
    },
    // 获取降序（按价格或销量）排列商品
    getDataDESC () {
      this.tableData = []
      this.tempData = []
      if(this.selected=='价格'){
        axios.post('api/chaoshi/getshangpinDESC').then(res => {        
         console.log(res);
          this.tableData = res.data
          this.tempData = res.data     
       })
      }else if(this.selected=='销量'){
        axios.post('api/chaoshi/getshangpin1DESC').then(res => {        
         console.log(res);
          this.tableData = res.data
          this.tempData = res.data     
       })
      }
    },
    //价格查询
    getData1() {
      this.tableData = []
      for (let item of this.tempData) {
        if (item.price<=this.price) {
          this.tableData.push(item)
        }
      }
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
      axios.post('api/chaoshi/deleteshangpin',params).then(res => {
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
    // 添加商品
    addschool () {
      let school_name=this.registerForm.school_name
      let test1=this.registerForm.test1
      let test2=this.registerForm.test2
      let test3=this.registerForm.test3
      let test4=this.registerForm.test4
      let test5=this.registerForm.test5
      let test6=this.registerForm.test6
      let params ={school_name,test1,test2,test3,test4,test5,test6} 
      console.log(params)
      axios.post('api/chaoshi/addshangpin',params).then(res => {
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
        school_name:row.name,
        test1: row.type,
        test2: row.price,
        test3: row.text,
        test4: row.url,
        test5: row.num1,
        test6: row.num2
      }
    },
    // 保存编辑
    saveEdit () {
      let id=this.form.id
      let school_name=this.form.school_name
      let test1=this.form.test1
      let test2=this.form.test2
      let test3=this.form.test3
      let test4=this.form.test4
      let test5=this.form.test5
      let test6=this.form.test6
      let params ={school_name,test1,test2,test3,test4,test5,test6,id}            
      console.log(params)
      axios.post('api/chaoshi/updateshangpin',params).then(res => {
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
        return '零食'
      } else if (value === 1) {
        return '饮料'
      }else if (value === 2) {
        return '水果'
      }else if (value === 3) {
        return '蔬菜'
      }else if (value === 4) {
        return '肉食'
      }
      
    },
    //前端静态筛选商品类型
    filtertype(value, row) {
      return row.type === value;
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
