package com.lal.classroom_mgsys.service.impl;

import com.lal.classroom_mgsys.mapper.ApplyInfoMapper;
import com.lal.classroom_mgsys.mapper.ClassroomClassInfoMapper;
import com.lal.classroom_mgsys.pojo.CommonResult;
import com.lal.classroom_mgsys.pojo.model.Apply;
import com.lal.classroom_mgsys.pojo.model.ApplyInfo;
import com.lal.classroom_mgsys.pojo.model.ClassroomClassInfo;
import com.lal.classroom_mgsys.service.ApplyService;
import com.lal.classroom_mgsys.tasks.AddClassroomStatusTask;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author : ziv_l
 * create at:  2024/4/14  04:40
 * @description:
 */
@Service
public class ApplyServiceIml implements ApplyService {

    @Resource
    ApplyInfoMapper applyInfoMapper;
    @Resource
    ClassroomClassInfoMapper classroomClassInfoMapper;
    @Resource
    AddClassroomStatusTask addClassroomStatusTask;

    @Override
    public CommonResult<Map> pageList(int start, int length, String event, String reason, String contact, String applyUser, int status) {
        // page query
        List<ApplyInfo> applyInfoList = applyInfoMapper.pageList(start, length, event, reason, contact, applyUser, status);
        int pageListCount = applyInfoMapper.pageListCount(start, length, event, reason, contact, applyUser, status);
        int totalCount = applyInfoMapper.totalCount();

        // package result
        Map<String, Object> maps = new HashMap<String, Object>();
        maps.put("recordsTotal", totalCount);		// 总记录数
        maps.put("recordsFiltered", pageListCount);	// 过滤后的总记录数
        maps.put("applies", applyInfoList);  					// 分页列表
        return CommonResult.success(maps);
    }

    @Override
    public CommonResult<String> cope(int id, int status) {

        Apply apply = applyInfoMapper.getById(id);

        if (apply == null) {
            return CommonResult.fail("参数错误");
        }

        // 入库
        // 0-等待处理；1-批准且已经入库；2-批准但未入库；-1-不予批准；3-系统载入且入库
        if (status == 2) {
            ClassroomClassInfo classroomApplyInfo = classroomClassInfoMapper.getByApplyIdAndDateAndClassroomId(id, apply.getDate(), apply.getClassroomId());
            // 如果不为空就入库，并且更改状态为 1
            if (classroomApplyInfo == null) {
                int affect = classroomClassInfoMapper.addClassroomApplyInfo(apply.getClassroomId(), apply.getId(), apply.getSections(), apply.getDate(), 0);
                // 入库成功，修改状态
                applyInfoMapper.updateStatusById(apply.getId(), 1);
                addClassroomStatusTask.insertDate();
                return CommonResult.success();
                // 撤回入库
//                classroomClassInfoMapper.deleteByClassroomIdAndApplyIdAndDate(apply.getClassroomId(), apply.getId(), apply.getDate());
            }
        } else if (status == -1) {
            ClassroomClassInfo classroomApplyInfo = classroomClassInfoMapper.getByApplyIdAndDateAndClassroomId(id, apply.getDate(), apply.getClassroomId());
            if (classroomApplyInfo != null) {
                // 撤回入库
                classroomClassInfoMapper.deleteByClassroomIdAndApplyIdAndDate(apply.getClassroomId(), apply.getId(), apply.getDate());
                // 修改状态
                applyInfoMapper.updateStatusById(apply.getId(), -1);
                addClassroomStatusTask.insertDate();
                return CommonResult.success();
            } else {
                // 修改状态
                applyInfoMapper.updateStatusById(apply.getId(), -1);
                addClassroomStatusTask.insertDate();
                return CommonResult.success();
            }
        }
        return CommonResult.fail("操作失败");
    }

    @Override
    public CommonResult<String> addApplyFromWeb(int classroomId, String sections, String event, String reason, String dateString, int status, String applyUser, String contact, String tips) {
        Apply apply = new Apply(0, classroomId, sections, Date.valueOf(dateString), event, reason, applyUser, contact, status, tips, null, null);

        // 先判断时间，如果预约日期在当前日期之前就返回报错
        Date nowDate = Date.valueOf(LocalDate.now().toString());
        if (apply.getDate() == null || nowDate.after(apply.getDate())) {
            return CommonResult.fail("不能预约过去日期！");
        }
        // 插入预约数据库
        int affect = applyInfoMapper.addApply(apply);
        if (affect > 0) {
            // 插入数据库后添加到课程表
            int dbAffect = classroomClassInfoMapper.addClassroomApplyInfo(apply.getClassroomId(), apply.getId(), apply.getSections(), apply.getDate(), 0);
            if (dbAffect > 0) {
                return CommonResult.success();
            }
        }

        return CommonResult.fail("系统异常");
    }
}