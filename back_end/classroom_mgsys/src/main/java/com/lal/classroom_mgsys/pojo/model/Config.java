package com.lal.classroom_mgsys.pojo.model;

import lombok.Data;

import java.sql.Date;
import java.time.LocalDateTime;

/**
 * @author : ziv_l
 * create at:  2024/4/14  23:43
 * @description: 配置实体
 */
@Data
public class Config {

    private int id;

    private int isApply;

    private String notification;

    private Date termStartTime;

    private Date termEndTime;

    private LocalDateTime lastUpdateTime;

    public Config(int id, int isApply, String notification, Date termStartTime, Date termEndTime) {
        this.id = id;
        this.isApply = isApply;
        this.notification = notification;
        this.termStartTime = termStartTime;
        this.termEndTime = termEndTime;
    }
}