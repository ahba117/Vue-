export const mixin = {
    methods: {
  
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
      // 获取要删除列表的id
      handleDelete (id) {
        this.idx = id
        this.delVisible = true
      },
      // 获取批量要删除的列表
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      // 批量删除
      delAll () {
        for (let item of this.multipleSelection) {
          this.handleDelete(item.id)
          this.deleteRow(item.id)
        }
        this.multipleSelection = []
      },
      attachBirth (val) {
        return val.substring(0,10); 
      },
      changeSex (value) {
        if (value === 0) {
          return '女'
        } else if (value === 1) {
          return '男'
        } else if (value === 2) {
          return '组合'
        } else if (value === 3) {
          return '不明'
        } else if (value === '男' || value === '女') {
          return value
        }
      },
      toggleSex (value) {
        if (value === '女') {
          return 0
        } else if (value === '男') {
          return 1
        }
      },
      // 更新图片
      handleAvatarSuccess (res, file) {
        let _this = this
        console.log(res)
        console.log(res.data)
        console.log(file)
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
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }
  