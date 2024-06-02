package com.lal.classroom_mgsys.controller;

import com.lal.classroom_mgsys.controller.annotation.PermissionLimit;
import com.lal.classroom_mgsys.mapper.ClassroomClassInfoMapper;
import com.lal.classroom_mgsys.mapper.ClassroomsMapper;
import com.lal.classroom_mgsys.pojo.CommonResult;
import com.lal.classroom_mgsys.pojo.model.Classroom;
import com.lal.classroom_mgsys.util.SectionUtil;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Array;
import java.sql.Date;
import java.util.*;

/**
 * @author : ziv_l
 * create at:  2024/4/15  01:17
 * @description:
 */
@RestController
@RequestMapping("/info")
public class BaseInfoController {

    @Resource
    ClassroomsMapper classroomsMapper;
    @Resource
    ClassroomClassInfoMapper classroomClassInfoMapper;

//    @GetMapping("/rooms")
//    @PermissionLimit(limit = false)
//    public CommonResult<List> getClassrooms(@RequestParam("buildingId") Integer buildingId){
//        if(buildingId == null){
//            return CommonResult.fail("参数错误");
//        }
//
//        List<Classroom> classrooms = classroomsMapper.getClassroomsByBuildingId(buildingId);
//        if(classrooms != null && !classrooms.isEmpty()){
//            return CommonResult.success(classrooms);
//        }
//        return CommonResult.fail("该教学楼不存在教室！");
//    }

    @GetMapping("/rooms")
    public CommonResult<List> getClassrooms(){

        List<Classroom> classrooms = classroomsMapper.getAll();
        if(classrooms != null && !classrooms.isEmpty()){
            return CommonResult.success(classrooms);
        }
        return CommonResult.fail("该教学楼不存在教室！");
    }

    @GetMapping("/classroom")
    public CommonResult<Classroom> getClassroomInfo(@RequestParam("roomId") Integer classroomId){
        if(classroomId == null){
            return CommonResult.fail("参数错误");
        }

        Classroom classroom = classroomsMapper.getClassroomById(classroomId);
        if(classroom != null){
            return CommonResult.success(classroom);
        }

        return CommonResult.fail("教室不存在!");
    }

    @GetMapping("/available")
    public CommonResult<Map> getAvailableSections(@RequestParam("classroomId") Integer classroomId, @RequestParam("date") String date){
        if (classroomId == null || classroomId <= 0 || date == null || date.isEmpty()){
            return CommonResult.fail("参数错误");
        }
        Classroom classroom = classroomsMapper.getClassroomById(classroomId);
        if (classroom == null){
            return CommonResult.fail("教室不存在");
        }
        Date validDate = null;
        try {
            validDate = Date.valueOf(date);
        } catch (Exception e) {
            return CommonResult.fail("时间参数异常");
        }
        ArrayList<String> classroomSectionListWithDate = classroomClassInfoMapper.getClassroomSectionListByClassroomIdAndDate(classroomId, validDate);
        Map<String, int[]> map = new HashMap<>();
        int[] availableSection = SectionUtil.getAvailableSection(classroomSectionListWithDate, 1, 11);
        if (availableSection.length == 0){
            map.put("available", null);
            return CommonResult.success(map);
        }
        map.put("available", availableSection);
        return CommonResult.success(map);
    }
}