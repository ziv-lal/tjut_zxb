package com.lal.classroom_mgsys.pojo.model;

import lombok.Data;

import java.sql.Date;

/**
 * @author : ziv_l
 * create at:  2024/4/14  01:59
 * @description: 预约信息
 */
@Data
public class ApplyInfo {

    private int id;

    private String classroom;

    private String building;

    private Date date;

    private String sections;

    private String event;

    private String reason;

    private String applyUser;

    private String contact;

    private int status;

    private String tips;

    private Date createTime;

    private Date copeTime;
}