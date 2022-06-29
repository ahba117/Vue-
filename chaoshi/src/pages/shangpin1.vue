<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-input v-model="select_word" size="mini" style="width:80px" placeholder="筛选关键词" class="handle-input"></el-input>
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
      style="margin:auto;width:825px" height="500px" 
      :data=" data"   
     >
        <!--  type="selection"实现数据多选 -->
        <!-- <el-table-column type="selection" width="40"></el-table-column> -->
        <el-table-column label="商品图标" width="100" align="center">
          <template slot-scope="scope">
            <div class="school-img">
              <img :src="getUrl(scope.row.url)" alt="" style="width: 100%;" @click="menuClick(scope.row)"/>
            </div>            

          </template>
        </el-table-column>
        <el-table-column  label="商品名称" width="100" align="center">
          <template  slot-scope="scope">
            <a >{{scope.row.name}}</a>
          </template>
        </el-table-column>
        <!-- 通过sortable添加排序功能 -->
        <el-table-column prop="price" label="价格" sortable width="80" align="center"></el-table-column>
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
            <el-button size="mini" @click="handleEdit(scope.row)">购买商品</el-button>
            <el-button size="mini" style="marg" @click="handleEdit1(scope.row)">添加评论</el-button>
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
    <!-- 添加评论 -->
    <el-dialog title="编辑" :visible.sync="editVisible1" width="400px">
      <el-form ref="form1" :model="form1" label-width="100px">
        <el-form-item label="商品名称:" size="mini">
          {{form1.name}}
        </el-form-item>
        <el-form-item label="介绍:" size="mini">
          {{form1.text}}
        </el-form-item>
        <el-form-item label="星级" size="mini">
          <el-radio-group v-model="form1.test1">
            <el-radio :label="1">一星</el-radio>
            <el-radio :label="2">二星</el-radio>
            <el-radio :label="3">三星</el-radio>
            <el-radio :label="4">四星</el-radio>
            <el-radio :label="5">五星</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="评论">
          <el-input type="textarea" v-model="form1.text1"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini"  @click="editVisible1 = false">取 消</el-button>
        <el-button type="primary" size="mini" @click="saveEdit1">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 购买商品 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="400px">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="商品名称:" size="mini">
          {{form.school_name}}
        </el-form-item>
        <el-form-item label="价格:" size="mini">
          {{form.test2}}
        </el-form-item>
        <el-form-item label="库存" size="mini">
          {{form.test5}}
        </el-form-item>
        <el-form-item label="购买数量" size="mini">
          <el-input v-model="num"></el-input>
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
  name: 'shangpin1-page',
  data () {
    return {
      num:'',//购买数量
      tableData: [],
      tempData: [],
      test4:{},//城市查询数据
      test1:'',//分数查询数据
      price:'',//价格查询数据
      selected:'',
      // 添加框信息
      registerForm: {
        num: '',
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
      // 评论信息
      form1: {
        id: '',
        name: '',
        text: '',
        text1:'',
        test1: '',
        test2: '',
        test3: '',
        test4: '',
      },
      select_word:'',
      centerDialogVisible: false,
      editVisible: false,
      editVisible1: false,
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
        path: 'pinglun1',
        query:{spid:row.id,name:this.name},
        
      });
      console.log(row.id)
    },
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
    //分数查询
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
        // 编辑
    handleEdit1 (row) {
      this.editVisible1 = true
      this.idx = row.id
      this.form1 = {
        id: row.id,
        name:row.name,
        text: row.text,
      }
    },
    // 保存编辑
    saveEdit () {
      let username = this.$route.query.name;
      let num = this.num;
      let spid=this.form.id
      let spurl=this.form.test4
      let spname=this.form.school_name
      let spprice=this.form.test2
      let ddid=0
      let num1 = this.num
      let num2 = num1
      let params ={username,num,spid,spurl,spname,spprice,ddid,num1,num2}            
      console.log(params)
      if(num<=this.form.test5){

      axios.post('api/chaoshi/updateshangpin1',params).then(res => {
        })
        .catch(err => {
          console.log(err)
        })

        axios.post('api/chaoshi/addche',params).then(res => {
          console.log(res); 
          if (res.data.affectedRows!= 0) {
            this.getData()
            this.notify('添加入购物车成功', 'success')
          } else {
            this.notify('添加入购物车失败', 'error')
          }
        })
        .catch(err => {
          console.log(err)
        })
      }else {
        this.notify('商品库存不足', 'error')
      }
      this.editVisible = false
    },

    // 保存编辑
    saveEdit1 () {
      let spid=this.form1.id
      let username=this.$route.query.name
      let spname = this.form1.name
      let star=this.form1.test1
      let text=this.form1.text1
      let params ={spid,username,star,text,spname}            
      console.log(params)
      axios.post('api/chaoshi/addpinglun',params).then(res => {
        console.log(res); 
        if (res.data.affectedRows!= 0) {
            this.getData()
            this.notify('评论添加成功', 'success')
          } else {
            this.notify('评论添加失败', 'error')
          }
        })
        .catch(err => {

          console.log(err)
        })
      this.editVisible1 = false
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
.el-button--mini, .el-button--mini.is-round {
    padding: 7px 15px;
    margin-top: 5px;
}
</style>
