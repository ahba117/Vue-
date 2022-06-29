<template>
  <div class="table">
    <div class="container">

      <div class="handle-box">
        总价格{{sum}}
        会员折扣价{{sum1}}
        <el-button size='mini' @click="click()" type="primary" round>生成订单</el-button>
      </div>
            <div></div>  
      
      <!-- 设置height实现头部固定 -->
      <el-table ref="multipleTable" size="mini" border 
      style="margin:auto;width:663px" height="400px" 
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
        <el-table-column label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">修改数量</el-button>
            <el-button size="mini" type="danger" @click="deleteRow(scope.row)">清除商品</el-button>
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
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="商品名称:" size="mini">
          {{form.spname}}
        </el-form-item>
        <el-form-item label="价格:" size="mini">
          {{form.spprice}}
        </el-form-item>
        <el-form-item label="购买数量" size="mini">
          <el-input v-model="num0"></el-input>
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
          if (item.username.includes(this.select_word)) {
            this.tableData.push(item)
          }
        }
      }
    }
  },
  methods: {
    click(){
      // 获取个人信息
      let account = this.$route.query.name;
      let params={account}
      console.log(account)
      axios.post('api/chaoshi/selectuser1',params).then(res => {
        this.form1 = res.data[0]   
        console.log(res.data[0]);      
              console.log(this.form1);
      let username = this.form1.name
      let address = this.form1.address
      let telephone = this.form1.telephone
      let total = this.sum1
      let params1={username,address,telephone,total}
      console.log(params1);
      axios.post('api/chaoshi/adddingdan',params1).then(res => {
          if (res) {
            this.getData()
            this.notify('订单生成成功', 'success')
          } else {
            this.notify('订单生成失败', 'error')
          }
      }) 
      })

    },
    // 获取购物车
    getData () {
      let username= this.$route.query.name;
      let account = this.$route.query.name;
      let ddid=0;
      let params={username,ddid,account}      
      this.tableData = []
      this.tempData = []
      axios.post('api/chaoshi/getche',params).then(res => {        
        this.tableData = res.data
        this.tempData = res.data     
        console.log(this.tableData.length);
        if(this.tableData.length!=0){
            let i=0;
            for(i=0;i<this.tableData.length;i++){
                this.sum=this.sum+this.tableData[i].spprice*this.tableData[i].num
            }
            console.log(this.sum);
        }
      })
      axios.post('api/chaoshi/selectuser1',params).then(res => {        
        this.Data = res.data
        console.log(this.Data[0].grade);
        if(this.Data.length!=0){
          if(this.Data[0].grade==2){
            this.sum1=this.sum*0.9
          }else if(this.Data[0].grade==3){
            this.sum1=this.sum*0.8
          }else if(this.Data[0].grade==4){
            this.sum1=this.sum*0.7
          }else if(this.Data[0].grade==5){
            this.sum1=this.sum*0.65
          }else if(this.Data[0].grade==1){
            this.sum1=this.sum
          }
          this.sum1=this.sum1.toFixed(2)
        }
      })
    },

    // 确定删除
    deleteRow (row) {
      let id=row.id;
      let spid =row.spid;
      let num1=-row.num;
      let num2=num1;
      let params={id,num1,num2,spid}      
      console.log(params)
        axios.post('api/chaoshi/updateshangpin1',params).then(res => {
        })
        .catch(err => {
          console.log(err)
        })
      axios.post('api/chaoshi/deleteche',params).then(res => {
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
        spname:row.spname,
        spid: row.spid,
        spprice: row.spprice,
        num: row.num,

      }
    },
    // 保存编辑
    saveEdit () {
      let id = this.form.id;
      let num = this.num0;
      let num1 = this.num0-this.form.num
      let num2 = num1
      let spid = this.form.spid
      let params ={num,id,num1,num2,spid}            
      console.log(params)
      axios.post('api/chaoshi/updateshangpin1',params).then(res => {
        })
        .catch(err => {
          console.log(err)
        })

      axios.post('api/chaoshi/updateche',params).then(res => {
        console.log(res); 
        if (res.data.affectedRows!= 0) {
            this.getData()
            this.notify('修改数量成功', 'success')
          } else {
            this.notify('修改数量失败', 'error')
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
