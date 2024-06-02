package com.lal.classroom_mgsys.mapper;

import com.lal.classroom_mgsys.pojo.model.ClassroomClassInfo;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Date;
import java.util.ArrayList;

/**
 * @author : ziv_l
 * create at:  2024/4/14  17:36
 * @description:
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ClassroomClassInfoMapperTest {

    @Resource
    ClassroomClassInfoMapper classroomClassInfoMapper;

    @Test
    public void test(){

        Date applyDate = new Date(2024 - 1900,5 - 1,29);

        ClassroomClassInfo applyIdAndDate = classroomClassInfoMapper.getByApplyIdAndDateAndClassroomId(12209, applyDate, 793);
        System.out.println(applyIdAndDate);

        Date courseDate = new Date(2024 - 1900,4 - 1,26);
        ClassroomClassInfo courseIdAndDate = classroomClassInfoMapper.getByCourseIdAndDateAndClassroomId(4784, courseDate, 793);
        System.out.println(courseIdAndDate);

//        int rows = classroomClassInfoMapper.addClassroomApplyInfo(793, 12209, "9,10,11", applyDate, 0);
//        System.out.println(rows);

//        int i = classroomClassInfoMapper.deleteByClassroomIdAndApplyIdAndDate(793, 12209, applyDate);
//        System.out.println(i);

        ArrayList<String> classroomSectionListWithDate = classroomClassInfoMapper.getClassroomSectionListByClassroomIdAndDate(627, Date.valueOf("2024-03-11"));
        System.out.println(classroomSectionListWithDate);

    }
}