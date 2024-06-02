package com.lal.classroom_mgsys.mapper;

import com.lal.classroom_mgsys.pojo.model.Apply;
import com.lal.classroom_mgsys.pojo.model.ApplyInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ApplyInfoMapper {

    List<ApplyInfo> pageList(@Param("offset") int offset,
                             @Param("pagesize") int pagesize,
                             @Param("event") String event,
                             @Param("reason") String reason,
                             @Param("contact") String contact,
                             @Param("applyUser") String applyUser,
                             @Param("status") int status);

    int pageListCount(@Param("offset") int offset,
                      @Param("pagesize") int pagesize,
                      @Param("event") String event,
                      @Param("reason") String reason,
                      @Param("contact") String contact,
                      @Param("applyUser") String applyUser,
                      @Param("status") int status);

    int totalCount();

    Apply getById(@Param("id") int id);

    int updateStatusById(@Param("id") int id, @Param("status") int status);

    int addApply(Apply apply);
}
