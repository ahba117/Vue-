/*
 Navicat Premium Data Transfer

 Source Server         : 5.7
 Source Server Type    : MySQL
 Source Server Version : 50738
 Source Host           : localhost:3307
 Source Schema         : chaoshi

 Target Server Type    : MySQL
 Target Server Version : 50738
 File Encoding         : 65001

 Date: 28/06/2022 20:53:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for che
-- ----------------------------
DROP TABLE IF EXISTS `che`;
CREATE TABLE `che`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `spid` int(11) NULL DEFAULT NULL,
  `spurl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `spname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `num` int(11) NULL DEFAULT NULL,
  `spprice` decimal(10, 2) NULL DEFAULT NULL,
  `ddid` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 58 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of che
-- ----------------------------
INSERT INTO `che` VALUES (35, '111', 12, '/img/chaoshiPic/40b053c5dc1f826a37d5391fbfe678fe', '蚕豆', 5, 5.00, 1);
INSERT INTO `che` VALUES (33, '111', 9, '/img/chaoshiPic/d11b99fda77942a0cd998f35eab0a93e', '1', 1, 3.00, 1);
INSERT INTO `che` VALUES (34, '2', 12, NULL, '2', 4, 2.00, 0);
INSERT INTO `che` VALUES (36, '111', 12, '/img/chaoshiPic/40b053c5dc1f826a37d5391fbfe678fe', '蚕豆', 4, 5.00, 2);
INSERT INTO `che` VALUES (37, '111', 13, '/img/chaoshiPic/4f61610bfc96310b5ba981a8cbe3872e', '张琪的脑子', 1, 3.00, 3);
INSERT INTO `che` VALUES (38, '111', 11, '1', '1', 1, 1.00, 3);
INSERT INTO `che` VALUES (39, '111', 10, '/img/chaoshiPic/c1e818adef958e1a3b7cb5520261f5d3', '商品1', 2, 10.00, 4);
INSERT INTO `che` VALUES (40, '111', 12, '/img/chaoshiPic/40b053c5dc1f826a37d5391fbfe678fe', '蚕豆', 7, 5.00, 4);
INSERT INTO `che` VALUES (41, '111', 12, '/img/chaoshiPic/40b053c5dc1f826a37d5391fbfe678fe', '蚕豆', 7, 5.00, 5);
INSERT INTO `che` VALUES (56, '111', 12, '/img/chaoshiPic/40b053c5dc1f826a37d5391fbfe678fe', '蚕豆', 1, 5.00, 4);
INSERT INTO `che` VALUES (43, '153', 13, '/img/chaoshiPic/4f61610bfc96310b5ba981a8cbe3872e', '张琪的脑子', 2, 3.00, 6);
INSERT INTO `che` VALUES (44, '153', 12, '/img/chaoshiPic/40b053c5dc1f826a37d5391fbfe678fe', '蚕豆', 4, 5.00, 6);
INSERT INTO `che` VALUES (45, '153', 12, '/img/chaoshiPic/40b053c5dc1f826a37d5391fbfe678fe', '蚕豆', 1, 5.00, 7);
INSERT INTO `che` VALUES (46, '153', 13, '/img/chaoshiPic/4f61610bfc96310b5ba981a8cbe3872e', '张琪的脑子', 1, 3.00, 0);
INSERT INTO `che` VALUES (47, '153', 12, '/img/chaoshiPic/40b053c5dc1f826a37d5391fbfe678fe', '蚕豆', 4, 5.00, 0);
INSERT INTO `che` VALUES (48, '153', 10, '/img/chaoshiPic/c1e818adef958e1a3b7cb5520261f5d3', '商品1', 2, 10.00, 0);
INSERT INTO `che` VALUES (49, '3', 13, '/img/chaoshiPic/4f61610bfc96310b5ba981a8cbe3872e', '张琪的脑子', 4, 3.00, 12);
INSERT INTO `che` VALUES (50, '3', 12, '/img/chaoshiPic/40b053c5dc1f826a37d5391fbfe678fe', '蚕豆', 3, 5.00, 12);
INSERT INTO `che` VALUES (51, '3', 11, '/img/chaoshiPic/04ab317dca56a1783ea8a48cca4916b1', '1', 1, 1.00, 13);
INSERT INTO `che` VALUES (52, '1', 13, '/img/chaoshiPic/4f61610bfc96310b5ba981a8cbe3872e', '张琪的脑子', 5, 3.00, 14);
INSERT INTO `che` VALUES (53, '1', 12, '/img/chaoshiPic/40b053c5dc1f826a37d5391fbfe678fe', '蚕豆', 1, 5.00, 15);
INSERT INTO `che` VALUES (54, '1', 11, '/img/chaoshiPic/04ab317dca56a1783ea8a48cca4916b1', '1', 2, 1.00, 0);
INSERT INTO `che` VALUES (55, '111', 12, '/img/chaoshiPic/40b053c5dc1f826a37d5391fbfe678fe', '蚕豆', 1, 5.00, 4);
INSERT INTO `che` VALUES (57, '111', 11, '/img/chaoshiPic/b0a6b1d5c0d3f645c91c1ccdc37b3d81', '百事可乐', 1, 2.50, 4);

-- ----------------------------
-- Table structure for dingdan
-- ----------------------------
DROP TABLE IF EXISTS `dingdan`;
CREATE TABLE `dingdan`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `telephone` int(255) NULL DEFAULT NULL,
  `total` decimal(10, 2) NULL DEFAULT NULL,
  `type` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of dingdan
-- ----------------------------
INSERT INTO `dingdan` VALUES (1, '111', '地址', 156, 25.20, 1);
INSERT INTO `dingdan` VALUES (2, '111', '地址', 156, 18.00, 2);
INSERT INTO `dingdan` VALUES (3, '111', '地址', 156, 3.60, 0);
INSERT INTO `dingdan` VALUES (4, '111', '地址', 156, 49.50, 0);
INSERT INTO `dingdan` VALUES (7, '153', '山东', 1533566719, 4.00, 0);
INSERT INTO `dingdan` VALUES (12, '3', '3的家', 333, 27.00, 1);
INSERT INTO `dingdan` VALUES (13, '3', '3的家', 333, 1.00, 0);
INSERT INTO `dingdan` VALUES (14, '1', '1', 1, 9.75, 0);
INSERT INTO `dingdan` VALUES (15, '1', '1', 1, 3.25, 0);

-- ----------------------------
-- Table structure for gl
-- ----------------------------
DROP TABLE IF EXISTS `gl`;
CREATE TABLE `gl`  (
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`name`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of gl
-- ----------------------------
INSERT INTO `gl` VALUES ('123', '12345');

-- ----------------------------
-- Table structure for grade
-- ----------------------------
DROP TABLE IF EXISTS `grade`;
CREATE TABLE `grade`  (
  `grade` int(255) NOT NULL AUTO_INCREMENT,
  `discount` double NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `num` float NULL DEFAULT NULL,
  PRIMARY KEY (`grade`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of grade
-- ----------------------------
INSERT INTO `grade` VALUES (1, 1, '青铜会员', 0);
INSERT INTO `grade` VALUES (2, 0.9, '白银会员', 1000);
INSERT INTO `grade` VALUES (3, 0.8, '黄金会员', 3000);
INSERT INTO `grade` VALUES (4, 0.7, '铂金会员', 10000);
INSERT INTO `grade` VALUES (5, 0.65, '钻石会员', 30000);

-- ----------------------------
-- Table structure for pinglun
-- ----------------------------
DROP TABLE IF EXISTS `pinglun`;
CREATE TABLE `pinglun`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `spid` int(11) NULL DEFAULT NULL,
  `username` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `star` int(10) NULL DEFAULT NULL,
  `text` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` int(255) NULL DEFAULT NULL,
  `spname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of pinglun
-- ----------------------------
INSERT INTO `pinglun` VALUES (2, 13, '111', 5, '好评', 1, '3');
INSERT INTO `pinglun` VALUES (5, 13, '2', 4, '好评', 1, '3');
INSERT INTO `pinglun` VALUES (4, 10, '2', 2, '不好，不回购', 1, '商品1');
INSERT INTO `pinglun` VALUES (6, 10, '111', 5, '好评（五毛钱一条）', 1, '商品1');
INSERT INTO `pinglun` VALUES (8, 12, '111', 5, '好吃不贵！', 0, '蚕豆');
INSERT INTO `pinglun` VALUES (9, 13, '3', 4, '3的评论', 1, '张琪的脑子');

-- ----------------------------
-- Table structure for shangpin
-- ----------------------------
DROP TABLE IF EXISTS `shangpin`;
CREATE TABLE `shangpin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` int(255) NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT NULL,
  `text` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `num1` int(255) NULL DEFAULT 0,
  `num2` int(255) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of shangpin
-- ----------------------------
INSERT INTO `shangpin` VALUES (13, '乐事薯片', 0, 5.00, '乐事薯片', '/img/chaoshiPic/32c28aa39f8e872bd51a01dd28533800', 1002, 99);
INSERT INTO `shangpin` VALUES (12, '蚕豆', 0, 5.00, '好吃不腻的蚕豆', '/img/chaoshiPic/40b053c5dc1f826a37d5391fbfe678fe', 798, 92);
INSERT INTO `shangpin` VALUES (11, '百事可乐', 1, 2.50, '舌尖上的美味', '/img/chaoshiPic/b0a6b1d5c0d3f645c91c1ccdc37b3d81', 1999, 452);
INSERT INTO `shangpin` VALUES (10, '鸡腿', 4, 10.00, '香酥酥的大鸡腿，你不想来一口吗？', '/img/chaoshiPic/6a45a85393a373ced9e72de4b9590102', 200, 59);
INSERT INTO `shangpin` VALUES (9, '包菜', 3, 4.50, '健身专用包菜', '/img/chaoshiPic/395c0865911d2e6ba670170928cf370d', 150, 33);
INSERT INTO `shangpin` VALUES (14, '格瓦斯', 1, 6.00, '面包的味道，醇厚的小麦香味', '/img/chaoshiPic/f17a219ea5e356e5cc65b26b08b99b2e', 600, 115);
INSERT INTO `shangpin` VALUES (15, '马卡龙', 0, 35.00, '高贵的小甜点！', '/img/chaoshiPic/503fedce12c042cb20c99be84c261e31', 100, 22);
INSERT INTO `shangpin` VALUES (16, '樱桃', 2, 25.00, '初熟的樱桃，红彤彤的', '/img/chaoshiPic/418b489d7daa7a007dc02c0920c2ba61', 500, 26);
INSERT INTO `shangpin` VALUES (17, '蛋黄酥', 0, 22.00, '软软糯糯，拉丝', '/img/chaoshiPic/0d0c0f4fafb636388d92a77c4a5c4d63', 300, 210);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `name1` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `mailbox` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `grade` int(255) NULL DEFAULT 1,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `telephone` char(25) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `num` decimal(10, 2) NULL DEFAULT 0.00,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (3, '111', '2', '张德龙', '1334658021@qq.com', 2, '山东省淄博市', '18954110274', 1093.50);
INSERT INTO `user` VALUES (9, '153', '153', 'adasd', '1533566719@qq.com', 3, '山东', '1533566719', 3052.10);
INSERT INTO `user` VALUES (8, '2', '2', '王耀', '2', 1, NULL, NULL, 500.00);
INSERT INTO `user` VALUES (12, '3', '3', '3号', '1', 2, '3的家', '333', 100.00);
INSERT INTO `user` VALUES (13, '1', '1', '', '', 3, '1', '1', 3000.25);

-- ----------------------------
-- Triggers structure for table dingdan
-- ----------------------------
DROP TRIGGER IF EXISTS `usernum`;
delimiter ;;
CREATE TRIGGER `usernum` BEFORE INSERT ON `dingdan` FOR EACH ROW begin
	update dingdan,`user`
	set num = num + new.total
	where username=`name`;
end
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;
