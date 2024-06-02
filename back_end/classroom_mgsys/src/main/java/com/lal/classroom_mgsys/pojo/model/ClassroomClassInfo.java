package com.lal.classroom_mgsys.pojo.model;

import lombok.Data;

import java.sql.Date;

/**
 * @author : ziv_l
 * create at:  2024/4/14  05:59
 * @description: 教学楼-教室-课程-日期-节次 信息
 */
@Data
public class ClassroomClassInfo {

    private int id;

    private int applyId;

    private int courseId;

    private int classroomId;

    private String classroom;

    private String building;

    private String courseName;

    private String teacher;

    private String event;

    private String reason;

    private String applyUser;

    private String sections;

    private String date;

    private int isClass;


}