/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace ConfigAPI {

  // 配置信息
  type Config = {
    id: number,
    isApply:number,
    notification:string,
    termStartTime:string,
    termEndTime:string,
    lastUpdateTime:string
  }

  type result={
    code:string,
    message:string
  }

  type configResult={
    code:string,
    message:string,
    data:Config
  }
}
