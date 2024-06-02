package com.lal.classroom_mgsys.mapper;

import com.lal.classroom_mgsys.pojo.model.Config;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ConfigMapper {

    Config getConfig();

    int updateConfig(Config config);

    String getNotification();
}
