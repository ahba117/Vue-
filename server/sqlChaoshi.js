

var sqlMap = {	    
    // 商品表（id，商品名称，类型，价格，介绍，图标，库存，销量）
    shangpin:{
        updateshangpinurl:'update shangpin set url=? where id=?',//更改图片
        getshangpin:'select * from shangpin',//获取商品
        selectshangpin:'select * from shangpin where id=?',//查询商品
        getshangpinASC:'select * from shangpin order by price ASC ',//升序（价格）
        getshangpinDESC:'select * from shangpin order by price DESC ',//降序（价格）
        getshangpin1ASC:'select * from shangpin order by num2 ASC ',//升序（销量）
        getshangpin1DESC:'select * from shangpin order by num2 DESC ',  //降序（销量）
        updateshangpin:'update shangpin set name=?,type=?,price=?,text=?,url=?,num1=?,num2=? where id=?',//编辑商品
        updateshangpin1:'update shangpin set num1=?,num2=? where id=?',//修改商品库存（与购物车关联）
        deleteshangpin:'delete from shangpin where id=?',//删除商品
        addshangpin:'insert into shangpin(name,type,price,text,url,num1,num2) values(?,?,?,?,?,?,?)'   //   添加商品      
    },
    // che:{        
    //     updateche:'update che set userid=?,spid=?,spurl=?,spname=?,num=?,spprice=?,ddid=? where id=?',
    //     deleteche:'delete from che where id=?',
    //     addche:'insert into che(userid,spid,spurl,spname,num,spprice,ddid) values(?,?,?,?,?,?,?)'   
    // },
    user: {
        adduser: 'insert into user (name,password,mailbox) values (?,?,?)',//注册
        adduser1: 'insert into user (name,password,name1,mailbox,grade,address,telephone,num) values (?,?,?,?,?,?,?,?)',//添加账号
        selectuser: 'select * from user where name=?',//验证账号
        getuser: 'select * from user',//获取数据
        updateuser:'update user set password=?,name1=?,mailbox=?,grade=?,address=?,telephone=? where id=?',//编辑
        deleteuser:'delete from user where id=?',//删除
    },
    che:{
        addche: 'insert into che (username,spid,spurl,spname,num,spprice,ddid) values (?,?,?,?,?,?,?)',//把商品添加到购物车
        deleteche:'delete from che where id=?',//删除购物车商品
        updateche:'update che set num=? where id=?',//修改商品购买数量
        getche: 'select * from che where username=? and ddid=?',//获取购物车（ddid=0）；查看订单详情（ddid=？）
        updateche1:'update che set ddid=? where username=? and ddid=?',//把购物车商品添加到订单（ddid=0）
    },
    pinglun:{
        addpinglun:'insert into pinglun(spid,username,star,text,type,spname) value (?,?,?,?,?,?)',//
        updatepinglun:'update pinglun set spid=?,username=?,star=?,text=?,spname=? where id=?',//
        updatepinglun1:'update pinglun set type=? where id=?',//
        getpinglun:'select * from pinglun',//
        selectpinglun:'select * from pinglun where type=? and spid=?',//
        deletepinglun:'delete from pinglun where id=?'//
    },
    //订单表（id，用户账号，用户地址，用户电话，订单总价，状态）
    dingdan:{
        adddingdan:'insert into dingdan(username,address,telephone,total,type) value (?,?,?,?,?)',//生成订单(type=0)
        getdingdan:'select * from dingdan',//获取订单
        getdingdan1:'select * from dingdan where username=?',//查询订单
        selectdongdan:'select id from dingdan where username=? order by id DESC',//获取新订单id（关联购物车）
        updatedingdan:'update dingdan set type=? where id=?',//改变订单状态
        deletedingdan:'delete from dingdan where id=?'//删除订单

    },
    gl:{
        getgl:'select * from gl where name=?'
    }
}

module.exports = sqlMap;
