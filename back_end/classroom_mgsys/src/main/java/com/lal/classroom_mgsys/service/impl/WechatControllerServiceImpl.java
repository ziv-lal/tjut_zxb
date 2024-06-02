package com.lal.classroom_mgsys.service.impl;

import com.lal.classroom_mgsys.mapper.*;
import com.lal.classroom_mgsys.pojo.CommonResult;
import com.lal.classroom_mgsys.pojo.model.*;
import com.lal.classroom_mgsys.service.WechatControllerService;
import com.lal.classroom_mgsys.util.SectionUtil;
import com.lal.classroom_mgsys.util.TimeMarkUtil;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

/**
 * @author : ziv_l
 * create at:  2024/4/11  17:51
 * @description: 微信小程序API接口实现类
 */
@Service
public class WechatControllerServiceImpl implements WechatControllerService {

    @Resource
    BuildingMapper buildingMapper;
    @Resource
    ClassroomClassInfoMapper classroomClassInfoMapper;
    @Resource
    ClassroomStatusMapper classroomStatusMapper;
    @Resource
    SectionTimeMapper sectionTimeMapper;
    @Resource
    ConfigMapper configMapper;
    @Resource
    ClassroomsMapper classroomsMapper;
    @Resource
    ApplyInfoMapper applyInfoMapper;

    @Override
    public CommonResult<List> findAllBuildings() {
        List<Building> buildingList = buildingMapper.findAll();
        return CommonResult.success(buildingList);
    }

    @Override
    public CommonResult<Map> classroomInfo(int classroomId) {
        /**
         * 1. 先获取今天的日期
         * 2. 根据日期和教室id查询今日安排
         * 3. 根据sections将安排放入列表
         * 4. 放入列表时根据是否为课程制作标题、副标题、人员；安排默认为：课程
         */
        Date today = Date.valueOf(LocalDate.now().toString());

        ArrayList<ClassroomClassInfo> classroomClassInfos = classroomClassInfoMapper.getByClassroomIdAndDate(classroomId, today);

        // result
        Map<String, Object> resultMap = new HashMap<>();
        // 获取当前节次
        int nowSection = TimeMarkUtil.getNowSection(sectionTimeMapper.findAll(), Time.valueOf(LocalTime.now()));
        resultMap.put("nowSection", nowSection);

        if (classroomClassInfos == null) {
            List<ClassroomDateInfo> classroomDateInfos = new ArrayList<>();
            for(int i=0;i<11;i++){
                // 空课程
                ClassroomDateInfo nullClassroomDateInfo = new ClassroomDateInfo("无", "", i + 1, "");
                classroomDateInfos.add(nullClassroomDateInfo);
            }
            resultMap.put("classes", classroomDateInfos);
            return CommonResult.success(resultMap);
        }

        List<ClassroomDateInfo> tempClassroomDateInfos = new ArrayList<>();

        int[] courseFlag = new int[11];

        for (ClassroomClassInfo classroomClassInfo : classroomClassInfos) {
            int[] sections = SectionUtil.sectionToArray(classroomClassInfo.getSections());
            for (int section : sections) {
                courseFlag[section-1] = courseFlag[section-1] + 1;
                // 处理预约
                if (classroomClassInfo.getIsClass() == 0) {
                    ClassroomDateInfo classroomDateInfo = new ClassroomDateInfo(classroomClassInfo.getEvent(), classroomClassInfo.getReason(), section, classroomClassInfo.getApplyUser());
                    tempClassroomDateInfos.add(classroomDateInfo);
                } else {
                    ClassroomDateInfo classroomDateInfo = new ClassroomDateInfo(classroomClassInfo.getCourseName(), "课程", section, classroomClassInfo.getTeacher());
                    tempClassroomDateInfos.add(classroomDateInfo);
                }
            }
        }

        List<ClassroomDateInfo> resultClassroomDateInfos = new ArrayList<>();
        for (int i = 0; i < 11; i++) {
            if (courseFlag[i] == 0) {
                // 空课程
                ClassroomDateInfo nullClassroomDateInfo = new ClassroomDateInfo("无", "", i + 1, "");
                resultClassroomDateInfos.add(nullClassroomDateInfo);
            } else {
                for (ClassroomDateInfo info : tempClassroomDateInfos) {
                    if (info.getSection() == i+1) {
                        resultClassroomDateInfos.add(info);
                    }
                }
            }
        }
        resultMap.put("classes", resultClassroomDateInfos);

        return CommonResult.success(resultMap);
    }

    @Override
    public CommonResult<Map> getBuildingInfo(int buildingId) {
        // 获取今天日期
        Date today = Date.valueOf(LocalDate.now());
        // 获取当前时间mark
        int nowTimeMark = TimeMarkUtil.getTimeMarkByTime(sectionTimeMapper.findAll(), Time.valueOf(LocalTime.now()));
        List<BuildingClassroomStatusInfo> buildingInfos = classroomStatusMapper.getByBuildingIdAndDateAndMark(buildingId, today, nowTimeMark);
        Map<String, Object> resultMap = new HashMap<>();
        if (buildingInfos == null) {
            resultMap.put("floor", null);
            resultMap.put("total", 0);
            return CommonResult.success(resultMap);
        }
        int[] floorCounter = new int[10];
        for (BuildingClassroomStatusInfo buildingInfo : buildingInfos) {
            floorCounter[buildingInfo.getFloor()]++;
        }
        List<Map> floorMaps = new ArrayList<>();
        int total = 0;
        for (int i = 0; i < floorCounter.length; i++) {
            if (floorCounter[i] == 0) {
                continue;
            }
            Map<String, Object> floorMap = new HashMap<>();
            List<Map> classroomsMaps = new ArrayList<>();
            for (BuildingClassroomStatusInfo bi : buildingInfos) {
                if (bi.getFloor() == i) {
                    Map<String, Object> classroom = new HashMap<>();
                    classroom.put("classBuildingId", bi.getBuildingId());
                    classroom.put("classroomNum", bi.getClassroomName());
                    classroom.put("status", bi.getStatus());
                    classroom.put("id", bi.getClassroomId());
                    classroomsMaps.add(classroom);
                    total ++;
                }
            }
            floorMap.put("classrooms", classroomsMaps);
            floorMap.put("floorNumber", i);
            floorMaps.add(floorMap);
        }

        // building url
        Building building = buildingMapper.findById(buildingId);
        resultMap.put("floor", floorMaps);
        resultMap.put("total", total);
        resultMap.put("buildingId", buildingId);
        resultMap.put("url", building.getUrl());
        return CommonResult.success(resultMap);
    }

    @Override
    public CommonResult<String> getNotice() {
        String notification = configMapper.getNotification();
        if (notification == null || notification.isEmpty()) {
            return CommonResult.fail("1", "无通知");
        }
        return CommonResult.success(notification);
    }

    @Override
    public CommonResult<String> addApplyFromWeb(int classroomId, String sections, String event, String reason, String dateString, int status, String applyUser, String contact, String tips) {

        Config config = configMapper.getConfig();
        if (config.getIsApply() == 0) {
            return CommonResult.fail("当前关闭申请");
        }

        Apply apply = new Apply(0, classroomId, sections, Date.valueOf(dateString), event, reason, applyUser, contact, status, tips, null, null);

        // 先判断时间，如果预约日期在当前日期之前就返回报错
        Date nowDate = Date.valueOf(LocalDate.now().toString());
        if (apply.getDate() == null || nowDate.after(apply.getDate())) {
            return CommonResult.fail("不能预约过去日期！");
        }
        // 插入预约数据库
        int affect = applyInfoMapper.addApply(apply);
        if (affect > 0) {
            return CommonResult.success();
        }

        return CommonResult.fail("系统异常");
    }

}