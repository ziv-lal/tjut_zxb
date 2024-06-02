package com.lal.classroom_mgsys.mapper;

import com.lal.classroom_mgsys.pojo.model.Building;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

/**
 * @author : ziv_l
 * create at:  2024/4/11  18:02
 * @description:
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class BuildingMapperTest {

    @Resource
    BuildingMapper buildingMapper;

    @Test
    public void test(){
        List<Building> buildingList =  buildingMapper.findAll();
        if (!buildingList.isEmpty()) {
            System.out.println(buildingList);
        } else {
            System.out.println("null");
        }
    }
}