package com.lal.classroom_mgsys.mapper;

import com.lal.classroom_mgsys.pojo.model.Apply;
import com.lal.classroom_mgsys.pojo.model.ApplyInfo;
import jakarta.annotation.Resource;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Date;
import java.util.List;

/**
 * @author : ziv_l
 * create at:  2024/4/14  04:17
 * @description: test
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ApplyInfoMapperTest {

    @Resource
    ApplyInfoMapper applyInfoMapper;

    @Test
    public void test() {
        // 直接分页
        List<ApplyInfo> page = applyInfoMapper.pageList(1, 10, null, null, null, null, -1);
        System.out.println(page);
        // 模糊查询event名称
        List<ApplyInfo> pageEvent = applyInfoMapper.pageList(1, 10, "借用", null, null, null, -1);
        System.out.println(pageEvent);
        // 模糊查询reason
        List<ApplyInfo> pageReason = applyInfoMapper.pageList(1, 10, null, "考试", null, null, -1);
        System.out.println(pageReason);
        // 模糊查询contact
//        List<ApplyInfo> pageContact = applyInfoMapper.pageList(1, 10, null, null, null, null, -1);
//        System.out.println(pageContact);
        // 查询status
        List<ApplyInfo> pageStatus = applyInfoMapper.pageList(1, 10, null, null, null, null, 3);
        System.out.println(pageStatus);
        // 查询user
        List<ApplyInfo> pageUser = applyInfoMapper.pageList(1, 10, null, null, null, "桑", -1);
        System.out.println(pageUser);
        // 联合条件查询
        List<ApplyInfo> pageList = applyInfoMapper.pageList(1, 10, "考", "英语", null, null, 3);
        System.out.println(pageList);

        int pageListCount = applyInfoMapper.pageListCount(1, 10, null, null, null, null, -1);
        System.out.println(pageListCount);

        Apply apply = applyInfoMapper.getById(7993);
        System.out.println(apply);

//        applyInfoMapper.updateStatusById(7993, 2);

        Apply apply1 = new Apply(0, 793, "9", Date.valueOf("2024-04-14"), "唱歌比赛", "学生", "合唱团", "微信群", 3, "带话筒", null, null);
        int i = applyInfoMapper.addApply(apply1);
        System.out.println(i);
    }
}