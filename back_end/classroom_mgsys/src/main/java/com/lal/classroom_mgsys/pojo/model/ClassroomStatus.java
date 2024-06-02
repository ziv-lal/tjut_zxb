package com.lal.classroom_mgsys.pojo.model;

import lombok.Data;

import java.sql.Date;

/**
 * @author : ziv_l
 * create at:  2024/4/17  00:58
 * @description:
 */
@Data
public class ClassroomStatus {

    private int id;

    private int classroomId;

    private Date date;

    private int status;

    private int mark;

    public ClassroomStatus(int classroomId, Date date, int status, int mark) {
        this.classroomId = classroomId;
        this.date = date;
        this.status = status;
        this.mark = mark;
    }
}