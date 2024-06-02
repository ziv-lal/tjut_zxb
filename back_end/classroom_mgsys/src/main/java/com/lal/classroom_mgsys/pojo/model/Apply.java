package com.lal.classroom_mgsys.pojo.model;

import lombok.Data;

import java.sql.Date;

/**
 * @author : ziv_l
 * create at:  2024/4/14  05:40
 * @description: 预约
 */
@Data
public class Apply {
    private int id;

    private int classroomId;

    private String sections;

    private Date date;

    private String event;

    private String reason;

    private String applyUser;

    private String contact;

    private int status;

    private String tips;

    private Date createTime;

    private Date copeTime;

    public Apply(int id, int classroomId, String sections, Date date, String event, String reason, String applyUser, String contact, int status, String tips, Date createTime, Date copeTime) {
        this.id = id;
        this.classroomId = classroomId;
        this.sections = sections;
        this.date = date;
        this.event = event;
        this.reason = reason;
        this.applyUser = applyUser;
        this.contact = contact;
        this.status = status;
        this.tips = tips;
        this.createTime = createTime;
        this.copeTime = copeTime;
    }
}