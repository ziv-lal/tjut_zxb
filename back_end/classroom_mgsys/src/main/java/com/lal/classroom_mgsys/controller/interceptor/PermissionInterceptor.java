package com.lal.classroom_mgsys.controller.interceptor;

import com.alibaba.fastjson.JSON;
import com.lal.classroom_mgsys.controller.annotation.PermissionLimit;
import com.lal.classroom_mgsys.pojo.model.User;
import com.lal.classroom_mgsys.service.LoginService;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.AsyncHandlerInterceptor;

import java.util.HashMap;
import java.util.Map;

/**
 * @author : ziv_l
 * create at:  2024/4/13  23:49
 * @description: 全局请求拦截器
 */
@Component
public class PermissionInterceptor implements AsyncHandlerInterceptor {

    @Resource
    private LoginService loginService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (!(handler instanceof HandlerMethod)) {
            return true;
        }

        // 需要登陆的情况
        boolean needLogin = true;
        HandlerMethod method = (HandlerMethod) handler;
        PermissionLimit permissionLimit = method.getMethodAnnotation(PermissionLimit.class);
        if (permissionLimit != null) {
            needLogin = permissionLimit.limit();
        }

        if (needLogin) {
            User user = loginService.ifLogin(request, response);
            // 如果当前没有用户登陆，直接响应
            if (user == null) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.setContentType("application/json;charset=utf-8");
                Map<String, String> map = new HashMap<>();
                map.put("code", "A0400");
                map.put("message", "请登陆！");

                String jsonString = JSON.toJSONString(map);

                response.getWriter().write(jsonString);
                return false;
            }
        }
        return true;
    }
}