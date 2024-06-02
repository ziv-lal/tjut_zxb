package com.lal.classroom_mgsys.controller;

import com.lal.classroom_mgsys.mapper.ConfigMapper;
import com.lal.classroom_mgsys.mapper.SectionTimeMapper;
import com.lal.classroom_mgsys.pojo.CommonResult;
import com.lal.classroom_mgsys.pojo.model.Config;
import com.lal.classroom_mgsys.pojo.model.SectionTime;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.sql.Time;
import java.util.List;

/**
 * @author : ziv_l
 * create at:  2024/4/15  00:38
 * @description:
 */
@RestController
@RequestMapping("/cfg")
public class ConfigController {

    @Resource
    ConfigMapper configMapper;
    @Resource
    SectionTimeMapper sectionTimeMapper;

    @GetMapping("/info")
    public CommonResult<Config> info() {
        return CommonResult.success(configMapper.getConfig());
    }

    @PostMapping("/update")
    public CommonResult<Config> update(@RequestParam int id,
                                       @RequestParam int isApply,
                                       @RequestParam(required = false) String notification,
                                       @RequestParam String termStartTime,
                                       @RequestParam String termEndTime) {
        Config config = new Config(id, isApply, notification, Date.valueOf(termStartTime), Date.valueOf(termEndTime));
        int affect = configMapper.updateConfig(config);
        if (affect > 0) {
            return CommonResult.success();
        }
        return CommonResult.fail("更新失败！");
    }

    @GetMapping("/sections")
    public CommonResult<List<SectionTime>> sections() {
        return CommonResult.success(sectionTimeMapper.findAll());
    }

    @PostMapping("/updateSection")
    public CommonResult<String> updateSection(@RequestParam int id,
                                              @RequestParam int section,
                                              @RequestParam String start,
                                              @RequestParam String end) {
        SectionTime sectionTime = new SectionTime(id, section, Time.valueOf(start), Time.valueOf(end));
        if (sectionTime.getStart() == null || sectionTime.getEnd() == null || id != section) {
            return CommonResult.fail("时间参数错误，参考格式：08:00:00");
        }
        int update = sectionTimeMapper.update(sectionTime);
        if (update > 0){
            return CommonResult.success();
        }

        return CommonResult.fail("修改错误");
    }
}