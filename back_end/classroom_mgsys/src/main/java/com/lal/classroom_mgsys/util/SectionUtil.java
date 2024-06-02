package com.lal.classroom_mgsys.util;

import java.util.Arrays;
import java.util.List;

/**
 * @author : ziv_l
 * create at:  2024/4/15  02:04
 * @description: 处理节次工具类
 */
public class SectionUtil {

    public static int[] sectionToArray(String sections) {
        String[] sectionsStr = sections.split(",");
        int[] sectionsArr = new int[sectionsStr.length];
        for (int i = 0; i < sectionsStr.length; i++) {
            sectionsArr[i] = Integer.parseInt(sectionsStr[i]);
        }
        return sectionsArr;
    }

    public static int[] sectionListStrToArray(List<String> sectionsList) {
        int size = 0;
        for (String sectionStr : sectionsList) {
            String[] sectionArr = sectionStr.split(",");
            for (String s : sectionArr) {
                size++;
            }
        }
        int[] sectionsArr = new int[size];
        int counter = 0;
        for (String sectionStr : sectionsList) {
            String[] sectionArr = sectionStr.split(",");
            for (String s : sectionArr) {
                sectionsArr[counter] = Integer.parseInt(s);
                counter++;
            }
        }
        return sectionsArr;
    }

    public static int[] getAvailableSection(List<String> sectionsList, int start, int end) {
        int[] sections = sectionListStrToArray(sectionsList);
        int[] sectionMark = new int[end - start + 1];
        for (int section : sections) {
            sectionMark[section-1]++;
        }
        int size = 0;
        for (int section : sectionMark) {
            if (section == 0) {
                size ++;
            }
        }
        int[] availableSection = new int[size];
        int number = 0;
        for (int i = 0; i < sectionMark.length; i ++) {
            if (sectionMark[i] == 0) {
                availableSection[number] = i + 1;
                number ++;
            }
        }
        return availableSection;
    }
}