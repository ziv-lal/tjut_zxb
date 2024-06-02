package com.lal.classroom_mgsys.mapper;

import com.lal.classroom_mgsys.pojo.model.User;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * @author : ziv_l
 * create at:  2024/4/13  21:43
 * @description: 测试类
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserMapperTest {

    @Resource
    UserMapper userMapper;

    @Test
    public void Test(){
        User admin = userMapper.loadByUsername("admin");
        System.out.println(admin);
    }
}