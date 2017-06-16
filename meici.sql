/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : meici

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-06-16 16:46:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(250) NOT NULL,
  `category` varchar(60) DEFAULT NULL,
  `price` varchar(30) DEFAULT NULL,
  `brand` varchar(30) DEFAULT NULL,
  `size` varchar(30) DEFAULT NULL,
  `color` varchar(30) DEFAULT NULL,
  `gander` varchar(30) DEFAULT NULL,
  `imgurl` varchar(255) DEFAULT NULL,
  `add_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=82 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', '17春夏新款 棉质 男仕 休闲裤', '休闲裤 Casual pants', '1380', 'Love Moschino 莫斯奇诺', 'M', '蓝色', '男士', 'h-131121', '2017-06-13 12:33:14');
INSERT INTO `goods` VALUES ('76', '17春夏新款 棉质 男仕 卫衣', '卫衣 Hoodies', '3660', 'Fendi 芬迪', 'M', '蓝色', '男士', 'h-128907', '2017-06-13 12:33:17');
INSERT INTO `goods` VALUES ('3', '17春夏新款 棉质 男仕 短裤', '短裤 Shorts', '1280', 'Love Moschino 莫斯奇诺', 'M', '蓝色', '男士', 'h-131120', '2017-06-13 12:33:22');
INSERT INTO `goods` VALUES ('64', '17春夏新款 全棉 男仕 金色图腾印花短袖T恤', 'T恤 T-Shirt', '1160', 'VERSACE JEANS 范思哲牛仔', 'M', '黑色', '男士', 'h-129425', '2017-06-13 12:33:24');
INSERT INTO `goods` VALUES ('62', '17春夏新款 聚酯纤维 男仕 连帽短外衣夹克', '夹克 Jacket', '4100', 'VERSACE JEANS 范思哲牛仔', 'M', '黑色', '男士', 'h-129433', '2017-06-13 12:33:27');
INSERT INTO `goods` VALUES ('65', '17春夏新款 全棉 男仕 金色图腾印花短袖T恤', 'T恤 T-Shirt', '1160', 'VERSACE JEANS 范思哲牛仔', 'M', '白色', '男士', 'h-129424', '2017-06-13 12:33:30');
INSERT INTO `goods` VALUES ('66', '17春夏新款 聚酯纤维混纺 男仕 蟒蛇印花短袖T恤衫', 'T恤 T-Shirt', '2220', 'Marcelo Burlon 马尔塞洛比隆', 'S', '白色', '男士', 'h-129742', '2017-06-13 12:33:33');
INSERT INTO `goods` VALUES ('67', '17春夏新款 全棉 男仕 黄黄翅膀印花套头卫衣', '卫衣 Hoodies', '2595', 'Marcelo Burlon 马尔塞洛比隆', 'M', '白色', '男士', 'h-129744', '2017-06-13 12:33:36');
INSERT INTO `goods` VALUES ('10', '17春夏新款 棉质 男仕 短裤', '短裤 Shorts', '1280', 'Love Moschino 莫斯奇诺', 'M', '黑色', '男士', 'h-131119', '2017-06-13 12:33:38');
INSERT INTO `goods` VALUES ('68', '17春夏新款 全棉 男仕 老虎印花短袖T恤衫', 'T恤 T-Shirt', '1410', 'Marcelo Burlon 马尔塞洛比隆', 'XS', '白色', '男士', 'h-129734', '2017-06-13 12:33:41');
INSERT INTO `goods` VALUES ('13', '17春夏新款 棉质 男仕 短裤', '短裤 Shorts', '1280', 'Love Moschino 莫斯奇诺', 'M', '灰色', '男士', 'h-131118', '2017-06-13 12:33:43');
INSERT INTO `goods` VALUES ('69', '全棉 男仕 短袖T恤', 'T恤 T-Shirt', '2080', 'Gucci 古驰', 'M', '白色', '男士', 'h-129142', '2017-06-13 12:33:45');
INSERT INTO `goods` VALUES ('70', '17春夏新款 棉 男仕 短袖T恤', 'T恤 T-Shirt', '3530', 'Philipp Plein 菲利普.普兰', 'M', '白色', '男士', 'h-128950', '2017-06-13 12:33:46');
INSERT INTO `goods` VALUES ('71', '黑色 翻毛绒河狸鼠皮配银狐毛装饰 男仕 休闲皮鞋', '休闲皮鞋 Casual Shoes', '7999', 'Fendi 芬迪', '40', '黑色', '男士', 'h-129479', '2017-06-13 12:33:49');
INSERT INTO `goods` VALUES ('72', '17春夏新款 全棉 男仕 短袖T恤', 'T恤 T-Shirt', '1750', 'Off White', 'M', '黑色', '男士', 'h-128878', '2017-06-13 12:33:51');
INSERT INTO `goods` VALUES ('19', '17春夏新款 棉质 男仕 短袖T恤/POLO', 'T恤 T-Shirt', '0820', 'Love Moschino 莫斯奇诺', 'M', '蓝色', '男士', 'h-131126', '2017-06-16 11:10:44');
INSERT INTO `goods` VALUES ('74', '17春夏新款 全棉 男仕 短袖T恤', 'T恤 T-Shirt', '5030', 'Valentino 华伦天奴', 'M', '绿色', '男士', 'h-128922', '2017-06-13 12:33:57');
INSERT INTO `goods` VALUES ('75', '17春夏新款 全棉 男仕 短袖T恤', 'T恤 T-Shirt', '2050', 'Dolce&Gabbana 杜嘉班纳', 'M', '多色', '男士', 'h-128911', '2017-06-13 12:34:01');
INSERT INTO `goods` VALUES ('22', '17春夏新款 棉质 男仕 短裤', 'T恤 T-Shirt', '1280', 'Love Moschino 莫斯奇诺', 'M', '蓝色', '男士', 'h-131125', '2017-06-13 12:34:04');
INSERT INTO `goods` VALUES ('77', '17春夏新款 棉质 男仕 短袖T恤', 'T恤 T-Shirt', '2890', 'Balmain 巴尔曼', 'M', '多色', '男士', 'h-128940', '2017-06-13 12:34:07');
INSERT INTO `goods` VALUES ('78', '全棉 男仕 短袖T恤', 'T恤 T-Shirt', '3160', 'Philipp Plein 菲利普.普兰', 'M', '白色', '男士', 'h-127545', '2017-06-13 12:34:11');
INSERT INTO `goods` VALUES ('79', '全棉 男仕 短袖T恤', 'T恤 T-Shirt', '2670', 'Dolce&Gabbana 杜嘉班纳', 'M', '红色', '男士', 'h-127772', '2017-06-13 12:34:13');
INSERT INTO `goods` VALUES ('73', '17春夏新款 全棉 男仕 短袖T恤', 'T恤 T-Shirt', '1800', 'Neil Barrett 尼奥·贝奈特', 'M', '黑色', '男士', 'h-128897', '2017-06-13 12:34:16');
INSERT INTO `goods` VALUES ('27', '17春夏新款 棉质 男仕 休闲裤', '休闲裤 Casual pants', '1500', 'Love Moschino 莫斯奇诺', 'M', '蓝色', '男士', 'h-131123', '2017-06-13 12:34:20');
INSERT INTO `goods` VALUES ('59', '全棉 男仕 AJ印花时尚短袖T恤', 'T恤 T-Shirt', '1190', 'Armani Jeans 阿玛尼牛仔', 'M', '蓝色', '男士', 'h-129858', '2017-06-13 12:34:25');
INSERT INTO `goods` VALUES ('60', '全棉 男仕 LOGO印花短袖T恤', 'T恤 T-Shirt', '1130', 'Armani Jeans 阿玛尼牛仔', 'M', '蓝色', '男士', 'h-129857', '2017-06-13 12:34:28');
INSERT INTO `goods` VALUES ('31', '17春夏新款 棉质 男仕 短袖T恤/POLO', 'T恤 T-Shirt', '1190', 'McQ by Alexander McQueen 麦蔻', 'M', '黑色', '男士', 'h-131037', '2017-06-13 12:34:33');
INSERT INTO `goods` VALUES ('35', '17春夏新款 棉质 男仕 短袖T恤/POLO', 'T恤 T-Shirt', '1330', 'McQ by Alexander McQueen 麦蔻', 'M', '白色', '男士', 'h-131036', '2017-06-13 12:34:36');
INSERT INTO `goods` VALUES ('80', '全棉 男仕 短袖T恤', 'T恤 T-Shirt', '2760', 'Dolce&Gabbana 杜嘉班纳', 'M', '黑色', '男士', 'h-127771', '2017-06-13 12:34:39');
INSERT INTO `goods` VALUES ('81', '纯棉 男仕 骷髅头双剑装饰图案V领短袖T恤', 'T恤 T-Shirt', '1763', 'Philipp Plein 菲利普.普兰', 'XL', '白色', '男士', 'h-127592', '2017-06-13 12:34:45');
INSERT INTO `goods` VALUES ('39', '17春夏新款 棉质 男仕 短袖T恤/POLO', 'T恤 T-Shirt', '1670', 'McQ by Alexander McQueen 麦蔻', 'M', '灰色', '男士', 'h-131031', '2017-06-13 12:34:47');
INSERT INTO `goods` VALUES ('40', '17春夏新款 棉质 男仕 短袖T恤/POLO', 'T恤 T-Shirt', '0920', 'EA7', 'M', '灰色', '男士', 'h-130908', '2017-06-16 11:10:41');
INSERT INTO `goods` VALUES ('41', '17春夏新款 棉质 男仕 短袖T恤/POLO', 'T恤 T-Shirt', '1670', 'McQ by Alexander McQueen 麦蔻', 'M', '黑色', '男士', 'h-131029', '2017-06-13 12:34:54');
INSERT INTO `goods` VALUES ('42', '不对称设计 男仕 凉-拖鞋', '凉鞋 Sandals', '2699', 'Gucci 古驰', '40', '多色', '男士', 'h-130736', '2017-06-13 12:34:56');
INSERT INTO `goods` VALUES ('43', '牛皮 男仕 休闲鞋', '休闲皮鞋 Casual Shoes', '3003', 'HENDERSON', '40', '银色', '男士', 'h-130668', '2017-06-13 12:34:58');
INSERT INTO `goods` VALUES ('44', '牛皮 男仕 休闲鞋', '休闲皮鞋 Casual Shoes', '1183', 'D.A.T.E.', '40', '白色', '男士', 'h-130665', '2017-06-13 12:35:00');
INSERT INTO `goods` VALUES ('45', '牛皮 男仕 休闲鞋', '休闲皮鞋 Casual Shoes', '1393', 'D.A.T.E.', '40', '白色', '男士', 'h-130661', '2017-06-13 12:35:02');
INSERT INTO `goods` VALUES ('46', '牛皮 男仕 休闲鞋', '休闲皮鞋 Casual Shoes', '1393', 'CRIME LONDON', '40', '白色', '男士', 'h-130657', '2017-06-13 12:35:05');
INSERT INTO `goods` VALUES ('47', '牛皮 男仕 休闲鞋', '休闲皮鞋 Casual Shoes', '1393', 'CRIME LONDON', '40', '黑色', '男士', 'h-130656', '2017-06-13 12:35:11');
INSERT INTO `goods` VALUES ('48', '牛皮 男仕 休闲鞋', '休闲皮鞋 Casual Shoes', '1393', 'CRIME LONDON', '40', '棕色', '男士', 'h-130655', '2017-06-13 12:35:13');
INSERT INTO `goods` VALUES ('49', '牛皮 男仕 休闲鞋', '休闲皮鞋 Casual Shoes', '1183', 'CRIME LONDON', '40', '黑色', '男士', 'h-130654', '2017-06-13 12:35:15');
INSERT INTO `goods` VALUES ('50', '牛皮 男仕 休闲鞋', '休闲皮鞋 Casual Shoes', '2220', 'Marcelo Burlon 马尔塞洛比隆', '40', '黑色', '男士', 'h-129745', '2017-06-13 12:35:17');
INSERT INTO `goods` VALUES ('51', '17春夏新款 橡胶 男仕 标志印花平底凉拖鞋', '凉鞋 Sandals', '1035', 'Marcelo Burlon 马尔塞洛比隆', '40', '黑色', '男士', 'h-129747', '2017-06-13 12:35:20');
INSERT INTO `goods` VALUES ('52', '17春夏新款 橡胶 男仕 翅膀印花平底凉拖鞋', '凉鞋 Sandals', '1035', 'Marcelo Burlon 马尔塞洛比隆', '40', '黑色', '男士', 'h-129746', '2017-06-13 12:35:21');
INSERT INTO `goods` VALUES ('53', '全棉 男仕 涂鸦印花T恤', 'T恤 T-Shirt', '2300', 'Dsquared2 D二次方', 'M', '黑色', '男士', 'h-130360', '2017-06-13 12:35:24');
INSERT INTO `goods` VALUES ('54', '“Glam Rock”系列 全棉 男仕 短袖T恤', 'T恤 T-Shirt', '3063', 'Dsquared2 D二次方', 'M', '灰色', '男士', 'h-130359', '2017-06-13 12:35:28');
INSERT INTO `goods` VALUES ('55', '全棉 男仕 抽象图案印花拼接设计T恤', 'T恤 T-Shirt', '3063', 'Neil Barrett 尼奥·贝奈特', 'M', '黑色', '男士', 'h-130349', '2017-06-13 12:35:33');
INSERT INTO `goods` VALUES ('56', '17春夏新款 皮质 男仕 休闲鞋', '休闲皮鞋 Casual Shoes', '6220', 'Versace 范思哲', '40', '蓝色', '男士', 'h-130196', '2017-06-13 12:35:36');
INSERT INTO `goods` VALUES ('57', '全棉 男仕 AJ印花时尚短袖T恤', 'T恤 T-Shirt', '1190', 'Armani Jeans 阿玛尼牛仔', 'M', '蓝色', '男士', 'h-129859', '2017-06-13 12:35:38');
INSERT INTO `goods` VALUES ('63', '17春夏新款 全棉 男仕 短袖T恤', 'T恤 T-Shirt', '1230', 'VERSACE JEANS 范思哲牛仔', 'M', '黑色', '男士', 'h-129428', '2017-06-13 12:35:42');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('13333333334', '4297f44b13955235245b2497399d7a93', null, null);
