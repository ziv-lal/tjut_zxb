package com.lal.classroom_mgsys.mapper;

import com.lal.classroom_mgsys.pojo.model.SectionTime;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

/**
 * @author : ziv_l
 * create at:  2024/4/11  19:20
 * @description:
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SectionTimeTest {

    @Resource
    SectionTimeMapper sectionTimeMapper;
    @Resource
    ClassroomStatusMapper classroomStatusMapper;

    @Test
    public void test(){
        List<SectionTime> sectionTimeList = sectionTimeMapper.findAll();
        System.out.println(sectionTimeList);

        if (sectionTimeList.get(0).getStart().before(sectionTimeList.get(1).getStart())) {
            System.out.println(sectionTimeList.get(0).getStart().toString() + " is before " + sectionTimeList.get(1).getStart().toString());
        }

        classroomStatusMapper.clearData();
    }
}