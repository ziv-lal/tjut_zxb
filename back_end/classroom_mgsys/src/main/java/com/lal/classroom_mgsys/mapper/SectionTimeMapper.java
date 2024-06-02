package com.lal.classroom_mgsys.mapper;

import com.lal.classroom_mgsys.pojo.model.SectionTime;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * @author : ziv_l
 * create at:  2024/4/11  19:16
 * @description: 节次信息
 */
@Mapper
public interface SectionTimeMapper {

    List<SectionTime> findAll();

    int update(SectionTime sectionTime);
}