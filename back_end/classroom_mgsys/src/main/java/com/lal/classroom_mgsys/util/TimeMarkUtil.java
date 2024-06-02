package com.lal.classroom_mgsys.util;

import com.lal.classroom_mgsys.pojo.model.SectionTime;

import java.sql.Time;
import java.util.List;

/**
 * @author : ziv_l
 * create at:  2024/4/15  07:37
 * @description: 每日定时任务：更新每日每个教室每个时段的状态
 */
public class TimeMarkUtil {

    public static int getTimeMarkByTime(List<SectionTime> sectionTimes, Time time) {
        int timeMark = -3;
        for (SectionTime sectionTime : sectionTimes) {
            sectionTime.setSection(sectionTime.getSection() * 2);

            if (time.equals(sectionTime.getStart())) {
                timeMark = sectionTime.getSection();
                return timeMark;
            }

            if (time.before(sectionTime.getStart())) {
                if (timeMark == sectionTime.getSection() - 1 || timeMark == sectionTime.getSection() - 2 || timeMark == sectionTime.getSection() - 3) {
                    return timeMark;
                }
                timeMark = sectionTime.getSection() - 1;
            } else if (time.before(sectionTime.getEnd())) {
                timeMark = sectionTime.getSection();
            } else {
                timeMark = sectionTime.getSection() + 1;
            }
        }
        return timeMark;
    }

    public static int getNowSection(List<SectionTime> sectionTimes, Time time) {
        int nowSection = -1;
        for (SectionTime sectionTime : sectionTimes) {
            if (time.before(sectionTime.getEnd()) || time.equals(sectionTime.getEnd())) {
                nowSection = sectionTime.getSection();
                return nowSection;
            }
        }
        return nowSection;
    }
}