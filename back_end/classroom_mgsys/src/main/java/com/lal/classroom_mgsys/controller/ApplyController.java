package com.lal.classroom_mgsys.controller;

import com.lal.classroom_mgsys.controller.annotation.PermissionLimit;
import com.lal.classroom_mgsys.pojo.CommonResult;
import com.lal.classroom_mgsys.service.ApplyService;
import jakarta.annotation.Resource;
import lombok.extern.log4j.Log4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * @author : ziv_l
 * create at:  2024/4/14  01:14
 * @description: 预约相关接口
 */
//@Log4j
@RestController
@RequestMapping("/apply")
public class ApplyController {

    @Resource
    private ApplyService applyService;

    @PostMapping("/pageList")
    public CommonResult<Map> pageList(@RequestParam(required = false, defaultValue = "0") int start,
                                      @RequestParam(required = false, defaultValue = "10") int length,
                                      String event, String reason, String contact, String applyUser,
                                      @RequestParam(required = false, defaultValue = "-2") String status) {
        start = (start-1) * (length);
        return applyService.pageList(start, length, event, reason, contact, applyUser, Integer.parseInt(status));
    }

    @PostMapping("/cope")
    public CommonResult<String> cope(@RequestParam int id, @RequestParam int status) {
//        log.debug("cope apply with params ==> id:" + id + ", status: " + status);
        return applyService.cope(id, status);
    }

    @PostMapping("/add")
    @PermissionLimit(limit = false)
    public CommonResult<String> addApplyFromWeb(@RequestParam int classroomId,
                                    @RequestParam String sections,
                                    @RequestParam String event,
                                    @RequestParam String reason,
                                    @RequestParam String dateString,
                                    @RequestParam(required = false, defaultValue = "1") int status,
                                    @RequestParam(required = false, defaultValue = "admin") String applyUser,
                                    @RequestParam(required = false) String contact,
                                    @RequestParam(required = false) String tips) {
//        log.debug("add apply from web_mgsys with params ==> classroomId:" + classroomId + ", event:" + event + ", reason:" + reason + ", dateString:" + dateString + ", contact:" + contact + ", tips:" + tips + ",status:" + status + ", applyUser:" + applyUser);
        return applyService.addApplyFromWeb(classroomId, sections, event, reason, dateString, status, applyUser, contact, tips);
    }
}