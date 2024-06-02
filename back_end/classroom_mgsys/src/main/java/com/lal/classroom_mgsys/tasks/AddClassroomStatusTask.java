package com.lal.classroom_mgsys.tasks;

import com.lal.classroom_mgsys.mapper.ClassroomClassInfoMapper;
import com.lal.classroom_mgsys.mapper.ClassroomStatusMapper;
import com.lal.classroom_mgsys.mapper.ClassroomsMapper;
import com.lal.classroom_mgsys.pojo.model.Classroom;
import com.lal.classroom_mgsys.pojo.model.ClassroomClassInfo;
import com.lal.classroom_mgsys.pojo.model.ClassroomStatus;
import com.lal.classroom_mgsys.util.SectionUtil;
import jakarta.annotation.Resource;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

/**
 * @author : ziv_l
 * create at:  2024/4/17  00:56
 * @description: 定时任务添加教室数据
 */

@EnableScheduling
@Component
public class AddClassroomStatusTask {

    @Resource
    ClassroomStatusMapper classroomStatusMapper;
    @Resource
    ClassroomsMapper classroomsMapper;
    @Resource
    ClassroomClassInfoMapper classroomClassInfoMapper;

    /**
     * 插入的方法：
     * 一天有11节课，共有 12 + 11 个时间段，分别计算每一个时间该教室是什么状态
     * 1. 获取目标教室当天所有的安排
     * 2. 分别计算 12 + 11 个时间段目标教室的状态
     * 3. 存入数据库
     */
    @Scheduled(cron = "0 0 1 * * ?")
    public void insertDate(){
        // 任务开始前，先清除数据库
        clearDateBase();

        // 获取今天日期
        Date today = Date.valueOf(LocalDate.now());
        // 获取所有教室
        List<Classroom> classrooms = classroomsMapper.getAll();
        for (Classroom classroom : classrooms) {
            ArrayList<String> toDaySections = classroomClassInfoMapper.getClassroomSectionListByClassroomIdAndDate(classroom.getId(), today);
            int[] sections = SectionUtil.sectionListStrToArray(toDaySections);
            // 一天有23个时间mark
            int[] statusArr = new int[23];
            int counter = 0; // 记录剩下是否还有课程
            for (int section : sections) {
                section = section * 2;
                statusArr[section - 1] ++;
                counter ++;
            }
            for (int i = 0; i < statusArr.length; i++) {
                // 处理当前空闲状态
                if (statusArr[i] == 0) {
                    // 说明未来也是空闲
                    if (counter == 0) {
                        int status = 1;
                        ClassroomStatus classroomStatus = new ClassroomStatus(classroom.getId(), today, status, i + 1);
                        classroomStatusMapper.addClassroomStatus(classroomStatus);
                    } else {  // 说明将来会被使用
                        int status = 2;
                        ClassroomStatus classroomStatus = new ClassroomStatus(classroom.getId(), today, status, i + 1);
                        classroomStatusMapper.addClassroomStatus(classroomStatus);
                    }
                } else { // 说明此时正在使用
                    counter --;
                    int status = 3;
                    ClassroomStatus classroomStatus = new ClassroomStatus(classroom.getId(), today, status, i + 1);
                    classroomStatusMapper.addClassroomStatus(classroomStatus);
                }
            }
        }
    }

    /**
     * 清除数据库
     * 过期数据是无用的
     */
    private void clearDateBase() {
        classroomStatusMapper.clearData();
    }
}