package com.lal.classroom_mgsys.util;

import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Arrays;

/**
 * @author : ziv_l
 * create at:  2024/4/15  04:54
 * @description:
 */
public class SectionUtilTest {

    @Test
    public void test() {
        String a = "1,2,4,5,6,7,8";
        String b = "9,10,11";

        int[] sectionArr = SectionUtil.sectionToArray(a);
        System.out.println(Arrays.toString(sectionArr));

        ArrayList<String> strList = new ArrayList<>();
        strList.add(a);
        strList.add(b);
        System.out.println(strList);
        int[] sectionArrB = SectionUtil.sectionListStrToArray(strList);
        System.out.println(Arrays.toString(sectionArrB));

        int[] availableSection = SectionUtil.getAvailableSection(strList, 1, 11);
        System.out.println("available: " + Arrays.toString(availableSection));

    }
}