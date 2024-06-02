package com.lal.classroom_mgsys.pojo;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.lal.classroom_mgsys.pojo.dto.ResultEnum;
import lombok.Data;

/**
 * @author : ziv_l
 * create at:  2022/4/12  16:37
 * @description: result
 */
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CommonResult<T> {
    /**
     * 状态码
     */
    private String code;
    /**
     * 提醒
     */
    private String message;
    /**
     * 返回的数据
     */
    private T data;

    public CommonResult(String code, String message, T data){
        this.code=code;
        this.message=message;
        this.data=data;
    }

    /**
     * 成功返回结果
     *
     * @param
     */
    public static <T> CommonResult<T> success() {
        return new CommonResult<>(ResultEnum.SUCCESS.getCode(), ResultEnum.SUCCESS.getMessage(), null);
    }

    /**
     * 成功返回结果
     *
     * @param message 获取的信息
     */
    public static <T> CommonResult<T> success(String message) {
        return new CommonResult<>(ResultEnum.SUCCESS.getCode(), message, null);
    }

    /**
     * 成功返回消息 + 数据
     * @return 成功返回消息 + 数据
     */
    public static <T> CommonResult<T> success(String message, T data) {
        return new CommonResult<>(ResultEnum.SUCCESS.getCode(), message, data);
    }

    /**
     * 成功返回结果
     *
     * @param data 获取的数据
     */
    public static <T> CommonResult<T> success(T data) {
        return new CommonResult<T>(ResultEnum.SUCCESS.getCode(), ResultEnum.SUCCESS.getMessage(), data);
    }

    /**
     * 失败返回结果
     */
    public static <T> CommonResult<T> fail() {
        return new CommonResult<T>(ResultEnum.FAILED.getCode(), ResultEnum.FAILED.getMessage(), null);
    }

    /**
     * 失败返回结果
     *
     * @param message 错误信息
     */
    public static <T> CommonResult<T> fail(String message) {
        return new CommonResult<T>(ResultEnum.FAILED.getCode(), message, null);
    }

    /**
     * 失败返回结果
     * @param code 错误码
     * @param message 错误信息
     * @param <T> 返回对象封装类
     * @return 返回请求对象
     */
    public static <T> CommonResult<T> fail(String code, String message) {
        return new CommonResult<T>(code, message, null);
    }
}