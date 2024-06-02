package com.lal.classroom_mgsys.service;

import com.lal.classroom_mgsys.mapper.UserMapper;
import com.lal.classroom_mgsys.pojo.CommonResult;
import com.lal.classroom_mgsys.pojo.model.User;
import com.lal.classroom_mgsys.pojo.model.UserInfo;
import com.lal.classroom_mgsys.util.CookieUtil;
import com.lal.classroom_mgsys.util.JacksonUtil;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.DigestUtils;

import java.math.BigInteger;

/**
 * @author : ziv_l
 * create at:  2024/4/13  21:47
 * @description: 登陆服务
 */
@Configuration
public class LoginService {

    public static final String LOGIN_IDENTITY_KEY = "TJUT_ZIB_LOGIN_IDENTITY";

    @Resource
    UserMapper userMapper;

    private String makeToken(User user){
        String tokenJson = JacksonUtil.writeValueAsString(user);
        String tokenHex = new BigInteger(tokenJson.getBytes()).toString(16);
        return tokenHex;
    }

    private User parseToken(String tokenHex){
        User user = null;
        if (tokenHex != null) {
            String tokenJson = new String(new BigInteger(tokenHex, 16).toByteArray());      // username_password(md5)
            user = JacksonUtil.readValue(tokenJson, User.class);
        }
        return user;
    }

    /**
     * 登陆
     * @param request
     * @param response
     * @param username
     * @param password
     * @param ifRemember
     * @return
     */
    public CommonResult<UserInfo> login(HttpServletRequest request, HttpServletResponse response, String username, String password, boolean ifRemember){

        // param
        if (username==null || username.trim().isEmpty() || password==null || password.trim().isEmpty()){
            System.out.println(username + "  " + password);
            return CommonResult.fail("用户名或密码参数错误");
        }

        // valid passowrd
        User user = userMapper.loadByUsername(username);
        if (user == null) {
            return CommonResult.fail("用户不存在");
        }
        String passwordMd5 = DigestUtils.md5DigestAsHex(password.getBytes());
        if (!passwordMd5.equals(user.getPassword())) {
            return CommonResult.fail("用户名或密码错误");
        }

        String loginToken = makeToken(user);
        UserInfo userInfo = userMapper.getUserInfoById(user.getId());
        if (userInfo.getIfAccept() == 0) {
            return CommonResult.fail("请联系管理员审核");
        }

        // do login
        CookieUtil.set(response, LOGIN_IDENTITY_KEY, loginToken, ifRemember);

        return CommonResult.success(userInfo);
    }

    /**
     * logout
     *
     * @param request
     * @param response
     */
    public CommonResult<String> logout(HttpServletRequest request, HttpServletResponse response){
        CookieUtil.remove(request, response, LOGIN_IDENTITY_KEY);
        return CommonResult.success();
    }

    /**
     * logout
     *
     * @param request
     * @return
     */
    public User ifLogin(HttpServletRequest request, HttpServletResponse response){
        String cookieToken = CookieUtil.getValue(request, LOGIN_IDENTITY_KEY);
        if (cookieToken != null) {
            User cookieUser = null;
            try {
                cookieUser = parseToken(cookieToken);
            } catch (Exception e) {
                logout(request, response);
            }
            if (cookieUser != null) {
                User dbUser = userMapper.loadByUsername(cookieUser.getUsername());
                if (dbUser != null) {
                    if (cookieUser.getPassword().equals(dbUser.getPassword())) {
                        return dbUser;
                    }
                }
            }
        }
        return null;
    }

    public CommonResult<String> updatePassword(HttpServletRequest request, HttpServletResponse response, String oldPassword, String newPassword){
        if (oldPassword == null || oldPassword.trim().isEmpty() || newPassword == null || newPassword.trim().isEmpty()){
            return CommonResult.fail("参数错误");
        }

        // 判断当前是否有账号登陆
        User nowLoginUser = ifLogin(request, response);
        if (nowLoginUser == null) {
            return CommonResult.fail("用户未登录或登陆已失效");
        }

        // valid password
        String oldPasswordMd5 = DigestUtils.md5DigestAsHex(oldPassword.getBytes());
        if (!oldPasswordMd5.equals(nowLoginUser.getPassword())) {
            return CommonResult.fail("旧密码错误");
        }
        String newPasswordMd5 = DigestUtils.md5DigestAsHex(newPassword.getBytes());
        if (newPasswordMd5.equals(nowLoginUser.getPassword())) {
            return CommonResult.fail("新密码不能与旧密码一致");
        } else {
            nowLoginUser.setPassword(newPasswordMd5);
            int affectRow = userMapper.update(nowLoginUser);
            if (affectRow > 0) {
                // 修改为新的cookie
                String loginToken = makeToken(nowLoginUser);
                CookieUtil.set(response, LOGIN_IDENTITY_KEY, loginToken, false);
                return CommonResult.success();
            } else {
                return CommonResult.fail("密码修改失败");
            }
        }
    }
    public CommonResult<String> updateInfo(HttpServletRequest request, HttpServletResponse response, Integer id, String nickname, String username, String avatar){
        // 判断当前是否有账号登陆
        User nowLoginUser = ifLogin(request, response);
        if (nowLoginUser == null) {
            return CommonResult.fail("用户未登录或登陆已失效");
        }

        UserInfo userInfo = new UserInfo();
        userInfo.setId(id);
        userInfo.setNickname(nickname);
        userInfo.setUsername(username);
        userInfo.setAvatar(avatar);
        int i = userMapper.updateUserInfo(userInfo);
        if (i > 0) {
            return CommonResult.success();
        }
        return CommonResult.fail("修改失败");
    }

    public CommonResult<UserInfo> check(HttpServletRequest request, HttpServletResponse response){
        // 判断当前是否有账号登陆
        User nowLoginUser = ifLogin(request, response);
        if (nowLoginUser != null) {
            UserInfo userInfo = userMapper.getUserInfoById(nowLoginUser.getId());
            if (userInfo.getIfAccept() == 0) {
                return CommonResult.fail("请重新登陆");
            }
            return CommonResult.success(userInfo);
        }
        return CommonResult.fail("请重新登陆");
    }
}