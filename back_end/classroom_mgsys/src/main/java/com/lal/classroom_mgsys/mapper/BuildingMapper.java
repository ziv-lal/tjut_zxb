package com.lal.classroom_mgsys.mapper;

import com.lal.classroom_mgsys.pojo.model.Building;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BuildingMapper {

    public List<Building> findAll();

    Building findById(Integer id);

}
