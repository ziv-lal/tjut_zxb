/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace ApplyAPI {

  // 单条预约信息
  type ApplyInfo = {
    id?: number,
    classroom?: string,
    date?: string,
    sections?: string,
    event?: string,
    reason?: string,
    applyUser?: string,
    contact?: string,
    status?: number,
    tips?: string,
    createTime?: string,
    copeTime?: string,
  }

  // apply list result
  type ApplyListResult = {
    code: string,
    message: string,
    data: {
      recordsFiltered: number,
      applies: ApplyInfo[],
      recordsTotal: number
    }
  }

  // apply query params
  interface ApplyQueryParams {
    /**
     * /apply/pageList
     * method: POST
     */
    start: number | undefined,
    length: number | undefined,
    event?: string,
    reason?: string,
    contact?: string,
    applyUser?: string,
    status?: number,
  }

  // apply cope params
  interface ApplyCopeParams {
    /**
     * /apply/cope
     * method: POST
     */
    id: number | undefined,
    status: number | undefined,
  }

  // apply cope result
  type ApplyCopeResult = {
    code: string,
    message: string,
    data: ApplyInfo
  }

  // 新增预约信息
  type ApplyAddParams = {
    classroomId?: string,
    sections?: string,
    reason?: string,
    dateString?: string,
    status?: number,
    applyUser?: string,
    contact?: string,
    tips?: string,
    event?: string,
  }

  // apply add result
  type ApplyAddResult = {
    code: string,
    message: string
  }
}
