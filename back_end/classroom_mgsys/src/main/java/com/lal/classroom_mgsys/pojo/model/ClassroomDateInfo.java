package com.lal.classroom_mgsys.pojo.model;

import lombok.Data;

/**
 * @author : ziv_l
 * create at:  2024/4/15  06:12
 * @description: 教室课程表 - 单节课程信息
 */
@Data
public class ClassroomDateInfo {

    private String title;  // 标题，如：数据库设计

    private String subTitle;  // 副标题，如：上课 或 考试

    private int section;  // 节次

    private String person;  // 教师 或 教室借用人；可为空

    public ClassroomDateInfo(String title, String subTitle, int section, String person) {
        this.title = title;
        this.subTitle = subTitle;
        this.section = section;
        this.person = person;
    }
}