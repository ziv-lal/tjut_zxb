package com.lal.classroom_mgsys.service;

import com.lal.classroom_mgsys.pojo.CommonResult;
import com.lal.classroom_mgsys.pojo.model.ClassroomDateInfo;

import java.util.List;
import java.util.Map;

public interface WechatControllerService {

    CommonResult<List> findAllBuildings();

    CommonResult<Map> classroomInfo(int classroomId);

    CommonResult<Map> getBuildingInfo(int buildingId);

    CommonResult<String> getNotice();

    CommonResult<String> addApplyFromWeb(int classroomId, String sections, String event, String reason, String dateString, int status, String applyUser, String contact, String tips);
}
