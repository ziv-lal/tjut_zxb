package com.lal.classroom_mgsys.mapper;

import com.lal.classroom_mgsys.pojo.model.User;
import com.lal.classroom_mgsys.pojo.model.UserInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserMapper {

    User loadByUsername(@Param("username") String username);

    int update(User user);

    UserInfo getUserInfoById(@Param("id") Integer id);

    List<UserInfo> findAll();

    int updateAudit(Integer id, Integer status);

    int insert(UserInfo userInfo);

    int updateUserInfo(UserInfo userInfo);
}
