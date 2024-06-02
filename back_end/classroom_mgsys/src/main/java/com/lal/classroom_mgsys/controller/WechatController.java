package com.lal.classroom_mgsys.controller;


import com.lal.classroom_mgsys.controller.annotation.PermissionLimit;
import com.lal.classroom_mgsys.pojo.CommonResult;
import com.lal.classroom_mgsys.pojo.model.ClassroomDateInfo;
import com.lal.classroom_mgsys.service.WechatControllerService;
import jakarta.annotation.Resource;
import lombok.extern.log4j.Log4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * @author : ziv_l
 * create at:  2024/4/11  17:49
 * @description: 微信小程序API接口
 */
@RestController
@RequestMapping("/wm")
public class WechatController {

    @Resource
    WechatControllerService wechatControllerService;

    @GetMapping("/buildings")
    @PermissionLimit(limit = false)
    public CommonResult<List> buildings() {
        return wechatControllerService.findAllBuildings();
    }

    @GetMapping("/classroom")
    @PermissionLimit(limit = false)
    public CommonResult<Map> classroomInfo(@RequestParam("id") int classroomId) {
        return wechatControllerService.classroomInfo(classroomId);
    }

    @GetMapping("/building")
    @PermissionLimit(limit = false)
    public CommonResult<Map> getBuildingInfo(@RequestParam("id") int buildingId) {
        return wechatControllerService.getBuildingInfo(buildingId);
    }

    @GetMapping("/notice")
    @PermissionLimit(limit = false)
    public CommonResult<String> getNotice() {
        return wechatControllerService.getNotice();
    }

    @GetMapping("/book")
    @PermissionLimit(limit = false)
    public CommonResult<String> book() {
        return wechatControllerService.getNotice();
    }

    @PostMapping("/add")
    @PermissionLimit(limit = false)
    public CommonResult<String> addApplyFromWm(@RequestParam int classroomId,
                                                @RequestParam String sections,
                                                @RequestParam String event,
                                                @RequestParam String reason,
                                                @RequestParam String dateString,
                                                @RequestParam(required = false, defaultValue = "1") int status,
                                                @RequestParam(required = false, defaultValue = "admin") String applyUser,
                                                @RequestParam(required = false) String contact,
                                                @RequestParam(required = false) String tips) {
//        log.debug("add apply from web_mgsys with params ==> classroomId:" + classroomId + ", event:" + event + ", reason:" + reason + ", dateString:" + dateString + ", contact:" + contact + ", tips:" + tips + ",status:" + status + ", applyUser:" + applyUser);
        return wechatControllerService.addApplyFromWeb(classroomId, sections, event, reason, dateString, status, applyUser, contact, tips);
    }

}