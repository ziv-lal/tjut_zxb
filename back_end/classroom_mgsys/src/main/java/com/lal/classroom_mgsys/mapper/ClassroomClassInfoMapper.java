package com.lal.classroom_mgsys.mapper;

import com.lal.classroom_mgsys.pojo.model.ClassroomClassInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.sql.Date;
import java.util.ArrayList;

@Mapper
public interface ClassroomClassInfoMapper {

    ClassroomClassInfo getByApplyIdAndDateAndClassroomId(@Param("applyId") int applyId, @Param("date")Date date, @Param("classroomId") int classroomId);

    ClassroomClassInfo getByCourseIdAndDateAndClassroomId(@Param("courseId") int courseId, @Param("date")Date date, @Param("classroomId") int classroomId);

    int addClassroomApplyInfo(@Param("classroomId") int classroomId,
                              @Param("applyId") int applyId,
                              @Param("sections") String sections,
                              @Param("classDate") Date classdate,
                              @Param("isClass") int isClass);

    int deleteByClassroomIdAndApplyIdAndDate(@Param("classroomId") int classroomId, @Param("applyId") int applyId, @Param("date")Date date);

    ArrayList<String> getClassroomSectionListByClassroomIdAndDate(@Param("classroomId") int classroomId, @Param("date")Date date);

    ArrayList<ClassroomClassInfo> getByClassroomIdAndDate(@Param("classroomId") int classroomId, @Param("date")Date date);

}
