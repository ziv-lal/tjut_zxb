package com.lal.classroom_mgsys.pojo.model;

import lombok.Data;

import java.sql.Date;

/**
 * @author : ziv_l
 * create at:  2024/4/17  04:04
 * @description:
 */
@Data
public class BuildingClassroomStatusInfo {

    private int id;

    private int buildingId;

    private int classroomId;

    private String classroomName;

    private int floor;

    private Date date;

    private int status;

    private int mark;
}