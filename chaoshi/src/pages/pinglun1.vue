<template>
<div>
    <div>
        <img :src="getUrl(this.Data[0].url)" style="width:100px;height:100px"/>
        <div>{{this.Data[0].name}}</div>
        <div>{{this.Data[0].text}}</div>
        <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
        </el-rate>
    </div>
    <el-table
      :data="tableData"
      style="width: 500px;margin:auto">
      <el-table-column
        prop="username"
        label="账户"
        width="150px">
      </el-table-column>
      <el-table-column
        prop="star"
        label="星级"
        width="100px">
      </el-table-column>
      <el-table-column
        prop="text"
        label="评价"
        width="250px">
      </el-table-column>
    </el-table>
</div>
</template>
<script>
//导入axios
import axios from 'axios';
export default {
  name: 'pinglun1-page',
  data () {
    return {
      tableData: [],
      tempData: [],
      Data:[],
      value:5,
      sum:0,
      num:0,
      centerDialogVisible: false,
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

  },
  methods: {
    getData () {
      this.Data = []
      this.tableData = []
      this.tempData = []
      let spid = this.$route.query.spid;
      let params = {spid}
      console.log(params);
      //获取评论
      axios.post('api/chaoshi/selectpinglun',params).then(res => {        
        console.log(res);
        this.tableData = res.data
        this.tempData = res.data     
                console.log(this.tableData.length);
        if(this.tableData.length!=0){
            let i=0;
            for(i=0;i<this.tableData.length;i++){
                this.sum=this.sum+this.tableData[i].star
                this.num=i+1
            }
            console.log(this.sum);
            this.value=this.sum/this.num
            this.value=this.value.toFixed(2)
        }
      })
      //获取商品信息
      axios.post('api/chaoshi/selectshangpin',params).then(res => {        
        console.log(res);
        this.Data = res.data  
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
