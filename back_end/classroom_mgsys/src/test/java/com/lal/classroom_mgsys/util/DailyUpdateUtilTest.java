package com.lal.classroom_mgsys.util;

import com.lal.classroom_mgsys.mapper.ClassroomStatusMapper;
import com.lal.classroom_mgsys.mapper.SectionTimeMapper;
import com.lal.classroom_mgsys.pojo.model.ClassroomStatus;
import com.lal.classroom_mgsys.pojo.model.SectionTime;
import com.lal.classroom_mgsys.tasks.AddClassroomStatusTask;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

/**
 * @author : ziv_l
 * create at:  2024/4/16  23:12
 * @description:
 */

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class DailyUpdateUtilTest {

    @Resource
    AddClassroomStatusTask addClassroomStatusTask;

    @Test
    public void test() {

        addClassroomStatusTask.insertDate();
    }

}