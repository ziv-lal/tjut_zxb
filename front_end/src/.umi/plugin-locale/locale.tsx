// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';
import { ConfigProvider } from 'antd';

import moment from '/Users/ziv_l/Desktop/file/projects/classroom-mg-sys/node_modules/.store/moment@2.30.1/node_modules/moment';
import '/Users/ziv_l/Desktop/file/projects/classroom-mg-sys/node_modules/.store/moment@2.30.1/node_modules/moment/locale/zh-cn';
import { RawIntlProvider, getLocale, getDirection , setIntl, getIntl, localeInfo, event, LANG_CHANGE_EVENT } from './localeExports';

import antd_es_locale_zh_CN from 'antd/es/locale/zh_CN';



export function _onCreate() {
  const locale = getLocale();
  if (moment?.locale) {
    moment.locale(localeInfo[locale]?.momentLocale || 'zh-cn');
  }
  setIntl(locale);
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
    ? React.useLayoutEffect
    : React.useEffect

export const _LocaleContainer = (props:any) => {
    const initLocale = getLocale();
    const [locale, setLocale] = React.useState(initLocale);
  const [intl, setContainerIntl] = React.useState(() => getIntl(locale, true));

  const handleLangChange = (locale:string) => {
    if (moment?.locale) {
      moment.locale(localeInfo[locale]?.momentLocale || 'en');
    }
    setLocale(locale);
    setContainerIntl(getIntl(locale));
  };

  useIsomorphicLayoutEffect(() => {
    event.on(LANG_CHANGE_EVENT, handleLangChange);
    return () => {
      event.off(LANG_CHANGE_EVENT, handleLangChange);
    };
  }, []);

  const defaultAntdLocale = {
    ...antd_es_locale_zh_CN,
  }
  const direction = getDirection();

  return (
    <ConfigProvider  direction={direction} locale={localeInfo[locale]?.antd || defaultAntdLocale}>
      <RawIntlProvider value={intl}>{props.children}</RawIntlProvider>
    </ConfigProvider>
  )
};
