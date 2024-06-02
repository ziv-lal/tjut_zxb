package com.lal.classroom_mgsys.pojo.model;

import lombok.Data;

/**
 * @author : ziv_l
 * create at:  2024/5/24  08:37
 * @description:
 */
@Data
public class UserInfo {
    private int id;

    private String username;

    private String password;

    private String role;

    private String avatar;

    private String nickname;

    private int ifAccept;
}