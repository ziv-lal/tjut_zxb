package com.lal.classroom_mgsys.pojo.model;

import lombok.Data;

import java.sql.Time;

/**
 * @author : ziv_l
 * create at:  2024/4/11  19:15
 * @description: 节次信息（每节课的开始时间和结束时间）
 */
@Data
public class SectionTime {
    private int id;

    private int section;

    private Time start;

    private Time end;

    public SectionTime(int id, int section, Time start, Time end) {
        this.id = id;
        this.section = section;
        this.start = start;
        this.end = end;
    }
}