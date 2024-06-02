package com.lal.classroom_mgsys.pojo.model;

import lombok.Data;

/**
 * @author : ziv_l
 * create at:  2024/4/15  01:07
 * @description:
 */
@Data
public class Classroom {

    private int id;

    private int buildingId;

    private int floor;

    private String classroomName;

    public Classroom(int id, int buildingId, int floor, String classroomName) {
        this.id = id;
        this.buildingId = buildingId;
        this.floor = floor;
        this.classroomName = classroomName;
    }
    public Classroom() {
    }

}