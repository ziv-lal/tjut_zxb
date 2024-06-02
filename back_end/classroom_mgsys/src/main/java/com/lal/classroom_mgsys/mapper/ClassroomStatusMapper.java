package com.lal.classroom_mgsys.mapper;

import com.lal.classroom_mgsys.pojo.model.BuildingClassroomStatusInfo;
import com.lal.classroom_mgsys.pojo.model.ClassroomStatus;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.sql.Date;
import java.util.List;

@Mapper
public interface ClassroomStatusMapper {

    List<ClassroomStatus> getStatusByClassroomIdAndDate(@Param("classroomId") int classroomId, @Param("date") Date date);

    int clearData();

    int addClassroomStatus(ClassroomStatus classroomStatus);

    List<BuildingClassroomStatusInfo> getByBuildingIdAndDateAndMark(@Param("buildingId") int buildingId, @Param("date") Date date, @Param("mark") int mark);
}
