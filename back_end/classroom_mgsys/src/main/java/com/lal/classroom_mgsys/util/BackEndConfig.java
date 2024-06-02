package com.lal.classroom_mgsys.util;

import org.springframework.beans.factory.DisposableBean;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

/**
 * @author : ziv_l
 * create at:  2024/4/11  16:18
 * @description: 配置类
 */
@Component
public class BackEndConfig implements InitializingBean, DisposableBean {

    private static BackEndConfig config = null;

    public static BackEndConfig getConfig() {
        return config;
    }

    @Override
    public void destroy() throws Exception {
        config = this;
    }

    @Override
    public void afterPropertiesSet() throws Exception {

    }
}