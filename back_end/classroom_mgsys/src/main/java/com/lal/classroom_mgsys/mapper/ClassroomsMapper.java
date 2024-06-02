package com.lal.classroom_mgsys.mapper;

import com.lal.classroom_mgsys.pojo.model.Classroom;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ClassroomsMapper {

    List<Classroom> getClassroomsByBuildingId(@Param("buildingId") int buildingId);

    Classroom getClassroomById(@Param("id") int id);

    List<Classroom> getAll();
}
