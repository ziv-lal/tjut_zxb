package com.lal.classroom_mgsys;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Date;
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;

/**
 * @author : ziv_l
 * create at:  2024/4/11  17:36
 * @description: 时间测试
 */
public class TimeTest {

    @Test
    public void test(){
        LocalTime timeA = LocalTime.of(17, 0, 3);
        LocalTime timeB = LocalTime.now();
        LocalTime timeC = LocalTime.parse("11:03:54");
        System.out.println(timeA);
        System.out.println(timeB);
        System.out.println(timeC);

        if (timeA.isAfter(timeB)) {
            System.out.println("A is after B");
        } else {
            System.out.println("A is before B");
        }

        Date date = Date.valueOf("2020-04-15");
        Date nowDate = Date.valueOf(LocalDate.now().toString());
        if (nowDate.after(date)) {
            System.out.println("不能预约过去时间");
        }
        System.out.println(date);
        System.out.println(nowDate);
    }
}