/*
 Navicat Premium Data Transfer

 Source Server         : MareaDB-local-3308
 Source Server Type    : MySQL
 Source Server Version : 100501
 Source Host           : localhost:3308
 Source Schema         : webservice1

 Target Server Type    : MySQL
 Target Server Version : 100501
 File Encoding         : 65001

 Date: 10/11/2021 17:05:01
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sd_users
-- ----------------------------
DROP TABLE IF EXISTS `sd_users`;
CREATE TABLE `sd_users`  (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `lastname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `fullname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `level` int NOT NULL DEFAULT 1,
  `status` int NOT NULL DEFAULT 1,
  `network_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'fackbook_id google_id line_id api_id',
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `idcard` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `infomation_agree_status` int NULL DEFAULT 0,
  `gender` int NULL DEFAULT 1,
  `birthday` date NULL DEFAULT NULL,
  `date` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `last_sign_in` datetime NULL DEFAULT NULL,
  `online_status` int NULL DEFAULT NULL,
  `mesage` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `password_temp` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `profile_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `network_type_id` int NULL DEFAULT 1,
  PRIMARY KEY (`user_id`) USING BTREE,
  INDEX `uid`(`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of sd_users
-- ----------------------------
INSERT INTO `sd_users` VALUES (1, 'คงนคร', 'จันทะคุณ', NULL, NULL, 'kongnakornna', '9d2ff8247ff625970de546c5dcf13e2e', 'kongnakorna@gmail.com', 1, 1, NULL, NULL, NULL, NULL, 0, 1, NULL, '2021-11-08 19:55:45', NULL, NULL, NULL, 'Na@5371@@@!$#%^', '55a54008ad1ba589aa210d2629c1df41', 1);

SET FOREIGN_KEY_CHECKS = 1;
