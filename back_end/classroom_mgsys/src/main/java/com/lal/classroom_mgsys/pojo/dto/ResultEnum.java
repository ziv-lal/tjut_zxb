package com.lal.classroom_mgsys.pojo.dto;

import lombok.Getter;

/**
 * @author : ziv_l
 * create at:  2022/4/12  16:43
 * @description: api code
 */
@Getter
public enum ResultEnum {
    SUCCESS("00000", "请求正常"),
    FAILED("A0400", "请求失败");

    private String code;
    private String message;

    private ResultEnum(String code, String message) {
        this.code = code;
        this.message = message;
    }
}