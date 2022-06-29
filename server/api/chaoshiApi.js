const express = require('express');
const router = express.Router();	
const sql_cs = require('../sqlChaoshi');
const DBchaoshi = require('../utils/DBchaoshi');
const app = express()
const multer = require('multer')
const upload = multer({ dest: __dirname + '/../img/chaoshiPic' })
// 该中间件将文件赋值到req.file
router.post('/updateshangpinurl', upload.single('file'), async (req, res) => {
    const file = req.file        
    let id=req.query.id;    
    let url="/img/chaoshiPic/"+file.filename;
    console.log(url)      
    let sqlStr = sql_cs.shangpin.updateshangpinurl;
    let conn = new DBchaoshi().getConn();
    conn.query(sqlStr,[url,id],(err,result)=>{
        if (err) {
            res.json(sqlStr+" "+err);
        } 
        else {
            res.json(result)
        }
    });
    conn.end();     		    	
 });
// 查询所有商品
router.post('/getshangpin', (req, res) => {
    let sqlStr = sql_cs.shangpin.getshangpin;
    let conn = new DBchaoshi().getConn();
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});
// 升序（按价格）查询所有商品
router.post('/getshangpinASC', (req, res) => {
    let sqlStr = sql_cs.shangpin.getshangpinASC;
    let conn = new DBchaoshi().getConn();
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});	
// 降序（按价格）查询所有商品
router.post('/getshangpinDESC', (req, res) => {
    let sqlStr = sql_cs.shangpin.getshangpinDESC;
    let conn = new DBchaoshi().getConn();
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});	

// 升序（按销量）查询所有商品
router.post('/getshangpin1ASC', (req, res) => {
    let sqlStr = sql_cs.shangpin.getshangpin1ASC;
    let conn = new DBchaoshi().getConn();
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});	
// 降序（按销量）查询所有商品
router.post('/getshangpin1DESC', (req, res) => {
    let sqlStr = sql_cs.shangpin.getshangpin1DESC;
    let conn = new DBchaoshi().getConn();
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});	

// 删除一个商品
router.post('/deleteshangpin', (req, res) => {
    let sqlStr = sql_cs.shangpin.deleteshangpin;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    conn.query(sqlStr,[params.id],(err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});
//添加一个商品
router.post('/addshangpin', (req, res) => {
    let sqlStr = sql_cs.shangpin.addshangpin;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    console.log(params); 
    conn.query(sqlStr,[params.school_name,params.test1,params.test2,params.test3,params.test4,params.test5,params.test6],(err, result) => {
        if (err) {
            res.json(sqlStr+" "+err);
        } else {
            res.json(result)
        }
    });
    conn.end();
}); 
// 更新一个商品
router.post('/updateshangpin', (req, res) => {
    let sqlStr = sql_cs.shangpin.updateshangpin;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    console.log(params);  
    conn.query(sqlStr,[params.school_name,params.test1,params.test2,params.test3,params.test4,params.test5,params.test6,params.id],(err, result) => {
        if (err) {
            res.json(sqlStr+" "+err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});   

//管理员登录
router.post('/getgl', (req, res) => {

    let sqlStr = sql_cs.gl.getgl;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    conn.query(sqlStr,[params.account],(err, result) => {//验证用户名
        var loginstatus='1';
        if (err) {
			console.log('111');
            res.json(err);

        }else if(result.length!=0){
			if(params.password==result[0].password){//验证密码
				loginstatus='2';//登录验证成功
			}
		}
		 else {
        }
		res.json({loginstatus})
    });
    conn.end();
});

// 获取用户信息
router.post('/selectuser1', (req, res) => {
    let sqlStr = sql_cs.user.selectuser;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    conn.query(sqlStr,[params.account],(err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
        console.log(result);
    });
    conn.end();
});
//用户登录
router.post('/selectuser', (req, res) => {

    let sqlStr = sql_cs.user.selectuser;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    conn.query(sqlStr,[params.account],(err, result) => {//验证用户名
        var loginstatus='1';
        if (err) {
			console.log('111');
            res.json(err);

        }else if(result.length!=0){
			if(params.password==result[0].password){//验证密码
				loginstatus='2';//登录验证成功
			}
		}
		 else {
        }
		res.json({loginstatus})
    });
    conn.end();
});

router.post('/adduser', (req, res) => {//注册
	let sqlStr1 = sql_cs.user.selectuser;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
	conn.query(sqlStr1,[params.account],(err, result) => {//验证用户名是否已存在
		console.log(params.account);
		console.log(result.length);
		if(result.length==0){
			var loginstatus='1';
			let sqlStr = sql_cs.user.adduser;
			let conn = new DBchaoshi().getConn();
			let params = req.body;
            console.log(params);
			conn.query(sqlStr,[params.account,params.password,params.email],(err, result) => {
				if (err) {
					console.log('111');
					res.json(err);
		
				}else{
				console.log(params);
				loginstatus='3';//注册成功
				res.json({loginstatus})
			}
			});
		}else{
		var loginstatus='1';
		res.json({loginstatus})
			}
	});
    conn.end();
});

// 查询所有用户
router.post('/get', (req, res) => {
    let sqlStr = sql_cs.user.getuser;
    let conn = new DBchaoshi().getConn();
    conn.query(sqlStr, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});	

// 删除一个用户
router.post('/delete', (req, res) => {
    let sqlStr = sql_cs.user.deleteuser;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    conn.query(sqlStr,[params.id],(err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});
//更新一个用户
router.post('/update', (req, res) => {
    let sqlStr = sql_cs.user.updateuser;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    console.log(params); 
	console.log(sqlStr);
    conn.query(sqlStr,[params.password,params.name1,params.mailbox,params.grade,params.address,params.telephone,params.id],(err, result) => {
        if (err) {
			console.log("1");
            res.json(sqlStr+" "+err);
        } else {
			console.log("2");
            res.json(result)
        }
    });
    conn.end();
});   
//添加一个用户
router.post('/adduser1', (req, res) => {
    let sqlStr = sql_cs.user.adduser1;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    console.log(params); 
    conn.query(sqlStr,[params.name,params.password,params.name1,params.mailbox,params.grade,params.address,params.telephone,params.num],(err, result) => {
        if (err) {
            res.json(sqlStr+" "+err);
        } else {
            res.json(result)
        }
    });
    conn.end();
}); 

// 获取用户购物车
router.post('/getche', (req, res) => {
    let sqlStr = sql_cs.che.getche;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    conn.query(sqlStr,[params.username,params.ddid],(err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
        console.log(result);
    });
    conn.end();
});
//添加购物车商品
router.post('/addche', (req, res) => {
    let sqlStr = sql_cs.che.addche;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    console.log(params); 
    conn.query(sqlStr,[params.username,params.spid,params.spurl,params.spname,params.num,params.spprice,params.ddid],(err, result) => {
        if (err) {
            res.json(sqlStr+" "+err);
        } else {
            res.json(result)
        }
    });
    conn.end();
}); 
// 更改库存
// router.post('/updateshangpin1', (req, res) => {
//     let sqlStr = sql_cs.shangpin.updateshangpin1;
//     let conn = new DBchaoshi().getConn();
//     let params = req.body;
//     console.log(params);  
//     conn.query(sqlStr,[params.num1,params.num2,params.spid],(err, result) => {
//         if (err) {
//             res.json(sqlStr+" "+err);
//         } else {
//             res.json(result)
//         }
//     });
//     conn.end();
// });   
// 更改库存
router.post('/updateshangpin1', (req, res) => {
    let sql1 = sql_cs.shangpin.selectshangpin;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    console.log(params);  
    conn.query(sql1,[params.spid],(err, result) => {
        let num1=result[0].num1-params.num1;
        let num3=-params.num2;
        let num2=result[0].num2-num3;
        let spid= params.spid;   
        let params1 ={num1,num2,spid}
        // console.log('num1:'+num1+'num2:'+num2+'params.spid'+params.spid);
        console.log(params1);
        let sqlStr = sql_cs.shangpin.updateshangpin1;
        conn.query(sqlStr,[params1.num1,params1.num2,params1.spid],(err, result) => {
        if (err) {
            res.json(sqlStr+" "+err);
        } else {
            res.json(result)
        }
        });

    });
    // conn.end();

});  

// 删除购物车商品
router.post('/deleteche', (req, res) => {
    let sqlStr = sql_cs.che.deleteche;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    conn.query(sqlStr,[params.id],(err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});
//更新购物车商品
router.post('/updateche', (req, res) => {
    let sqlStr = sql_cs.che.updateche;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    console.log(params); 
	console.log(sqlStr);
    conn.query(sqlStr,[params.num,params.id],(err, result) => {
        if (err) {
			console.log("1");
            res.json(sqlStr+" "+err);
        } else {
			console.log("2");
            res.json(result)
        }
    });
    conn.end();
});   


// 获取评论
router.post('/getpinglun', (req, res) => {
    let sqlStr = sql_cs.pinglun.getpinglun;
    let conn = new DBchaoshi().getConn();
    conn.query(sqlStr,(err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});
// 添加评论
router.post('/addpinglun', (req, res) => {
    let sqlStr = sql_cs.pinglun.addpinglun;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    let type=0;
    console.log(params); 
    conn.query(sqlStr,[params.spid,params.username,params.star,params.text,0,params.spname],(err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});
// 编辑评论
router.post('/updatepinglun', (req, res) => {
    let sqlStr = sql_cs.pinglun.updatepinglun;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    conn.query(sqlStr,[params.spid,params.username,params.star,params.text,params.spname,params.id],(err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});
// 评论审核通过
router.post('/updatepinglun1', (req, res) => {
    let sqlStr = sql_cs.pinglun.updatepinglun1;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    conn.query(sqlStr,[1,params.id],(err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});
// 评论审核不通过
router.post('/deletepinglun', (req, res) => {
    let sqlStr = sql_cs.pinglun.deletepinglun;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    conn.query(sqlStr,[params.id],(err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});
// 查看评论
router.post('/selectpinglun', (req, res) => {
    let sqlStr = sql_cs.pinglun.selectpinglun;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    conn.query(sqlStr,[1,params.spid],(err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});
// 查看评论1
router.post('/selectshangpin', (req, res) => {
    let sqlStr = sql_cs.shangpin.selectshangpin;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    conn.query(sqlStr,[params.spid],(err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});


// 生成订单
router.post('/adddingdan', (req, res) => {
    let sqlStr = sql_cs.dingdan.adddingdan;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    conn.query(sqlStr,[params.username,params.address,params.telephone,params.total,0],(err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    let sql1 = sql_cs.dingdan.selectdongdan;
    conn.query(sql1,[params.username],(err, result) => {
        if(result.length>0){
            let ddid=result[0].id;
			let sql2 = sql_cs.che.updateche1;

			conn.query(sql2,[ddid,params.username,0],(err, result) => {

			});
		}
    });

});
// 获取订单
router.post('/getdingdan', (req, res) => {
    let sqlStr = sql_cs.dingdan.getdingdan;
    let conn = new DBchaoshi().getConn();
    conn.query(sqlStr,(err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});
// 查询订单
router.post('/getdingdan1', (req, res) => {
    let sqlStr = sql_cs.dingdan.getdingdan1;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    conn.query(sqlStr,[params.username],(err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});
// 改变订单状态
router.post('/updatedingdan', (req, res) => {
    let sqlStr = sql_cs.dingdan.updatedingdan;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    conn.query(sqlStr,[params.type,params.id],(err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});
// 删除订单
router.post('/deletedingdan', (req, res) => {
    let sqlStr = sql_cs.dingdan.deletedingdan;
    let conn = new DBchaoshi().getConn();
    let params = req.body;
    conn.query(sqlStr,[params.id],(err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result)
        }
    });
    conn.end();
});


module.exports = router;  
