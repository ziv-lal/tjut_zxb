package com.lal.classroom_mgsys.service;

import com.lal.classroom_mgsys.pojo.CommonResult;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

public interface ApplyService {

    CommonResult<Map> pageList(int start, int length, String event, String reason, String contact, String applyUser, int status);

    CommonResult<String> cope(int id, int status);

    CommonResult<String> addApplyFromWeb(int classroomId, String sections, String event, String reason, String dateString, int status, String applyUser, String contact, String tips);
}
