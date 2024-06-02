/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80023
 Source Host           : localhost:3306
 Source Schema         : tjut_zxb

 Target Server Type    : MySQL
 Target Server Version : 80023
 File Encoding         : 65001

 Date: 02/06/2024 18:38:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for apply
-- ----------------------------
DROP TABLE IF EXISTS `apply`;
CREATE TABLE `apply` (
  `id` int NOT NULL AUTO_INCREMENT,
  `classroom_id` int NOT NULL,
  `sections` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `event` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '申请目的',
  `reason` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '申请理由',
  `date` date DEFAULT NULL COMMENT '占用日期',
  `create_time` datetime DEFAULT NULL COMMENT '提交申请时间',
  `cope_time` datetime DEFAULT NULL COMMENT '处理时间',
  `status` int DEFAULT NULL COMMENT '0-等待处理；1-批准且已经入库；2-批准但未入库；-1-不予批准；3-系统载入且入库',
  `apply_user` varchar(255) COLLATE utf8mb4_general_ci NOT NULL COMMENT '申请人',
  `contact` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '联系方式',
  `tips` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16487 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for class_building
-- ----------------------------
DROP TABLE IF EXISTS `class_building`;
CREATE TABLE `class_building` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `building_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '教学楼名称',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '教学楼平面图url',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for classes
-- ----------------------------
DROP TABLE IF EXISTS `classes`;
CREATE TABLE `classes` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '课程主键id',
  `class_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '课程名称',
  `teacher` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '教师名称',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6467 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for classroom_class
-- ----------------------------
DROP TABLE IF EXISTS `classroom_class`;
CREATE TABLE `classroom_class` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键',
  `classroom_id` int NOT NULL COMMENT '教室id',
  `class_id` int DEFAULT NULL COMMENT '课程id',
  `event_id` int DEFAULT NULL COMMENT '预约id',
  `sections` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '课程节次',
  `class_date` date DEFAULT NULL COMMENT '课程日期',
  `is_class` int unsigned NOT NULL DEFAULT '1' COMMENT '1-课程；0-预约',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=172664 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for classroom_status
-- ----------------------------
DROP TABLE IF EXISTS `classroom_status`;
CREATE TABLE `classroom_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `classroom_id` int NOT NULL COMMENT '教室的id',
  `date` date NOT NULL COMMENT '日期',
  `status` int NOT NULL COMMENT '1-未来空闲；2-即将使用；3-正在使用',
  `mark` int NOT NULL COMMENT '时间段标记信号',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88414 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for classrooms
-- ----------------------------
DROP TABLE IF EXISTS `classrooms`;
CREATE TABLE `classrooms` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '教室主键id',
  `class_building_id` int NOT NULL COMMENT '外键 ',
  `floor` int NOT NULL COMMENT '楼层',
  `classroom_number` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '教室号',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=961 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for config
-- ----------------------------
DROP TABLE IF EXISTS `config`;
CREATE TABLE `config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `is_apply` int NOT NULL COMMENT '0-关闭申请使用教室；1-开放申请使用教室',
  `notification` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '全局通告',
  `term_start_time` date NOT NULL COMMENT '开学时间',
  `term_end_time` date NOT NULL COMMENT '学期结束时间',
  `last_update_time` datetime DEFAULT NULL COMMENT '上次修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- Table structure for section_time
-- ----------------------------
DROP TABLE IF EXISTS `section_time`;
CREATE TABLE `section_time` (
  `id` int NOT NULL AUTO_INCREMENT,
  `section` int unsigned NOT NULL COMMENT '节次（第几节课）',
  `start` time NOT NULL COMMENT '开始时间（hh:mm:ss）',
  `end` time NOT NULL COMMENT '结束时间（hh:mm:ss）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '头像url',
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `if_accept` int DEFAULT NULL COMMENT '是否批准',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
-- View structure for apply_info
-- ----------------------------
DROP VIEW IF EXISTS `apply_info`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `apply_info` AS select `a`.`id` AS `id`,`cm`.`classroom_number` AS `classroom_number`,`cb`.`building_name` AS `building_name`,`a`.`date` AS `date`,`a`.`sections` AS `sections`,`a`.`event` AS `event`,`a`.`reason` AS `reason`,`a`.`apply_user` AS `apply_user`,`a`.`contact` AS `contact`,`a`.`status` AS `status`,`a`.`tips` AS `tips`,`a`.`create_time` AS `create_time`,`a`.`cope_time` AS `cope_time` from ((`apply` `a` join `classrooms` `cm` on((`a`.`classroom_id` = `cm`.`id`))) join `class_building` `cb` on((`cm`.`class_building_id` = `cb`.`id`)));

-- ----------------------------
-- View structure for classroom_class_info
-- ----------------------------
DROP VIEW IF EXISTS `classroom_class_info`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `classroom_class_info` AS select `cc`.`id` AS `id`,`ap`.`apply_id` AS `apply_id`,`course`.`course_id` AS `course_id`,`cm`.`id` AS `classroom_id`,`cm`.`classroom_number` AS `classroom`,`cb`.`building_name` AS `building`,`course`.`class_name` AS `course_name`,`course`.`teacher` AS `teacher`,`ap`.`event` AS `event`,`ap`.`reason` AS `reason`,`ap`.`apply_user` AS `apply_user`,`cc`.`sections` AS `sections`,`cc`.`class_date` AS `date`,`cc`.`is_class` AS `is_class` from ((((`classroom_class` `cc` join `classrooms` `cm` on((`cc`.`classroom_id` = `cm`.`id`))) join `class_building` `cb` on((`cm`.`class_building_id` = `cb`.`id`))) left join (select `apply`.`id` AS `apply_id`,`apply`.`event` AS `event`,`apply`.`reason` AS `reason`,`apply`.`apply_user` AS `apply_user` from `apply`) `ap` on(((`cc`.`event_id` = `ap`.`apply_id`) and (`cc`.`is_class` = 0)))) left join (select `classes`.`id` AS `course_id`,`classes`.`class_name` AS `class_name`,`classes`.`teacher` AS `teacher` from `classes`) `course` on(((`cc`.`class_id` = `course`.`course_id`) and (`cc`.`is_class` = 1))));

SET FOREIGN_KEY_CHECKS = 1;
