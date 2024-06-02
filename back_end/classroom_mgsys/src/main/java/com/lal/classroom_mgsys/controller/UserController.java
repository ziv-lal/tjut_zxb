package com.lal.classroom_mgsys.controller;

import com.lal.classroom_mgsys.controller.annotation.PermissionLimit;
import com.lal.classroom_mgsys.mapper.UserMapper;
import com.lal.classroom_mgsys.pojo.CommonResult;
import com.lal.classroom_mgsys.pojo.model.User;
import com.lal.classroom_mgsys.pojo.model.UserInfo;
import com.lal.classroom_mgsys.service.LoginService;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author : ziv_l
 * create at:  2024/4/13  21:25
 * @description: 用户相关（主要是登陆等接口）
 */
@RestController
@RequestMapping("/usr")
public class UserController {

    @Resource
    private LoginService loginService;
    @Resource
    private UserMapper userMapper;

    @RequestMapping(value="/login", method= RequestMethod.POST)
    @PermissionLimit(limit=false)
    public CommonResult<UserInfo> loginDo(HttpServletRequest request, HttpServletResponse response, String username, String password, String ifRemember){
        boolean ifRem = ifRemember != null && ifRemember.trim().length() > 0 && "on".equals(ifRemember);
        return loginService.login(request, response, username, password, ifRem);
    }

    @RequestMapping(value="/logout", method=RequestMethod.GET)
    @PermissionLimit(limit=false)
    public CommonResult<String> logout(HttpServletRequest request, HttpServletResponse response){
        return loginService.logout(request, response);
    }

    @RequestMapping(value="/updatePassword", method=RequestMethod.POST)
    public CommonResult<String> update(HttpServletRequest request, HttpServletResponse response, String oldPassword, String newPassword){
        return loginService.updatePassword(request, response, oldPassword, newPassword);
    }
    @RequestMapping(value="/updateInfo", method=RequestMethod.POST)
    public CommonResult<String> updateInfo(HttpServletRequest request, HttpServletResponse response, Integer id, String nickname, String username, String avatar){
        return loginService.updateInfo(request, response, id, nickname, username, avatar);
    }

    @RequestMapping(value="/check", method=RequestMethod.GET)
    public CommonResult<UserInfo> check(HttpServletRequest request, HttpServletResponse response){
        return loginService.check(request, response);
    }

    @RequestMapping(value="/list", method=RequestMethod.GET)
    public CommonResult<List<UserInfo>> list(){
        List<UserInfo> all = userMapper.findAll();
        return CommonResult.success(all);
    }

    @RequestMapping(value="/audit", method=RequestMethod.POST)
    public CommonResult<List<UserInfo>> audit(Integer id, Integer ifAccept){
        int i = userMapper.updateAudit(id, ifAccept);
        if (i != 0) {
            return CommonResult.success();
        }
        return CommonResult.fail("系统错误");
    }
    @RequestMapping(value="/register", method=RequestMethod.POST)
    @PermissionLimit(limit = false)
    public CommonResult<String> register(String nickname, String username, String password){
        UserInfo userInfo = new UserInfo();
        String passwordMd5 = DigestUtils.md5DigestAsHex(password.getBytes());
        userInfo.setPassword(passwordMd5);
        userInfo.setNickname(nickname);
        userInfo.setUsername(username);
        int i = userMapper.insert(userInfo);
        if (i != 0) {
            return CommonResult.success("注册成功，请等待管理员审核！");
        }
        return CommonResult.fail("注册失败系统错误");
    }
}