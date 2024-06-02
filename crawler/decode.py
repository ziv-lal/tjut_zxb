from bs4 import BeautifulSoup
import json
import re

def decodeWithHtml(html_content, output_file_name):
    # 使用Beautiful Soup解析HTML
    soup = BeautifulSoup(html_content, 'html.parser')

    # 找到课表信息
    target_table = soup.find('table', {'class': 'CourseFormTable'})
    # 找到教室信息
    target_info = target_table.find('caption')
    # 获取详细信息
    info = target_info.text.strip().split(' ')
    # 获取教学楼
    building = info[5]
    # 获取教室
    classroom = info[2][-4:]
    # 获取楼层
    floor = info[2][-3]

    # 初始化课程信息列表
    classroom_info = {}  # 教室信息
    courses = []  # 只包含课程
    events = []  # 包含考试和教室借用
    count = 0

    classroom_info["building"] = building
    classroom_info["classroom"] = classroom
    classroom_info["floor"] = floor

    # 判断星期
    week_day = [0, 0, 0, 0, 0, 0, 0, 0]
    today = 0

    tr_counter = 0

    # 遍历表格中的每一行
    for tr in target_table.find_all('tr'):
        tr_counter += 1
        if tr_counter == 1:
            continue  # 跳过星期的那一行

        # 获取本轮可以获取几天的信息
        turn_days = 0
        for i in range(1, 8):
            if week_day[i] == 0:
                turn_days += 1

        # 记录已经取走的数据条数
        piece_counter = 0

        # 先判断今天见是星期几
        for i in range(1, 8):
            if week_day[i] == 0:
                today = i

                # 取走一条数据
                piece_counter += 1

                # 数据编号
                piece_number = 0

                # 在星期的基础爬取信息
                for td in tr:
                    # 检查是否是指定类的<td>标签，如果是则跳过
                    if 'firstHiddenTd' in td.get('class', []):
                        continue
                    # 检查<td>标签的属性是否包含 "colspan="1" rowspan="1""，并且样式中是否包含 "text-align:center;"
                    if 'colspan' in td.attrs and 'rowspan' in td.attrs and 'style' in td.attrs and 'text-align:center;' in \
                            td['style']:
                        continue

                    piece_number += 1
                    if piece_number != piece_counter:
                        continue

                    # 教室借用
                    borrow_cells = td.find_all('div', {'class': 'div_backcolor_2'})
                    if borrow_cells:
                        for cell in borrow_cells:
                            count = count + 1
                            # 获取教室借用信息
                            event_info = cell.text.strip().split('\xa0')
                            # 教室借用
                            evnet_name = "教室借用"
                            # 获取教室借用的理由
                            event_reason = re.search(r'\((.*?)\)', event_info[0]).group(1)
                            # 获取教室借用人
                            person_re = re.search(r'\)\s*([^\d]+)', event_info[0])
                            person = ""
                            if person_re:
                                person = person_re.group(1)
                            # 获取周次
                            weeks = []
                            start_end = re.findall(r'\d+', event_info[0])
                            # 如果 start_end 中超过两个元素就取最后两个元素，其他元素删除
                            start_end = start_end[-2:] if len(start_end) > 2 else start_end
                            if int(start_end[0]) > 20:
                                start_end[0] = "20"
                                if int(start_end[0]) > int(start_end[1]):
                                    start_end[1] = "20"
                            for i in range(int(start_end[0]), int(start_end[1]) + 1):
                                weeks.append(i)
                            # 获取节次
                            sections = []
                            section_re = re.findall(r'\d+', event_info[1])
                            for i in range(int(section_re[0]), int(section_re[1]) + 1):
                                sections.append(i)
                            # 将教室借用信息添加到列表中
                            events.append({
                                "event_name": evnet_name,
                                "event_reason": event_reason,
                                "person": person,
                                "weeks": weeks,
                                "day": today,  # 星期几
                                "sections": sections
                            })

                    # 考试
                    exam_cells = td.find_all('div', {'class': 'div_backcolor_4'})
                    if exam_cells:
                        for cell in exam_cells:
                            count = count + 1
                            event_info = cell.text.strip().split('\xa0')
                            # 获取考试信息
                            evnet_name = "考试"
                            # 获取教室借用的理由
                            event_reason = re.search(r'\[(.*?)\]', event_info[0]).group(1)
                            # 获取教室借用人
                            person = ""
                            # 获取周次
                            weeks = []
                            start_end = re.findall(r'\d+', event_info[0])
                            # 如果 start_end 中超过两个元素就取最后两个元素，其他元素删除
                            start_end = start_end[-2:] if len(start_end) > 2 else start_end
                            if int(start_end[0]) > 20:
                                start_end[0] = "20"
                                if int(start_end[0]) > int(start_end[1]):
                                    start_end[1] = "20"
                            for i in range(int(start_end[0]), int(start_end[1]) + 1):
                                weeks.append(i)
                            # 获取节次
                            sections = []
                            section_re = re.findall(r'\d+', event_info[1])
                            for i in range(int(section_re[0]), int(section_re[1]) + 1):
                                sections.append(i)
                            # 将考试信息添加到列表中
                            events.append({
                                "event_name": evnet_name,
                                "event_reason": event_reason,
                                "person": person,
                                "weeks": weeks,
                                "day": today,  # 星期几
                                "sections": sections
                            })

                    # 常规课程
                    class_cells = td.find_all('div', {'class': ''})
                    if class_cells:
                        for cell in class_cells:
                            # 过滤：<div>(08:00~08:45) </div>
                            if re.search(r'\(\d{2}:\d{2}~\d{2}:\d{2}\)', cell.text.strip()):
                                continue
                            # 过滤：<div style="text-align:left;"><div class="fcSpanDiv"></div></div>
                            if cell.get('style') and 'text-align:left' in cell.get('style'):
                                continue
                            count = count + 1
                            # 获取课程信息
                            course_info = cell.text.strip().split('\xa0')
                            # 直接获取课程名称
                            course_name = course_info[0][0:-1]
                            # 获取周次信息，直接处理成周号
                            weeks = []
                            weeks_info = course_info[1].split(',')
                            for week in weeks_info:
                                start_end = re.findall(r'\d+', week)
                                # 处理单周情况
                                if '单' in week:
                                    for i in range(int(start_end[0]), int(start_end[1]) + 1):
                                        if i % 2 == 1:
                                            weeks.append(i)
                                # 处理双周情况
                                if '双' in week:
                                    for i in range(int(start_end[0]), int(start_end[1]) + 1):
                                        if i % 2 == 0:
                                            weeks.append(i)
                                # 既不是单周也不是双周
                                if '单' not in week and '双' not in week:
                                    for i in range(int(start_end[0]), int(start_end[1]) + 1):
                                        weeks.append(i)
                            # 获取节次及教师信息
                            section_and_teacher = course_info[2].split(' ')
                            # 获取教师姓名
                            teacher = section_and_teacher[1]
                            # 获取节次信息
                            section_all = re.findall(r'\d+', section_and_teacher[0])
                            sections = []
                            for i in range(int(section_all[0]), int(section_all[1]) + 1):
                                sections.append(int(i))

                            # 将课程信息添加到列表中
                            courses.append({
                                "class_name": course_name,
                                "weeks": weeks,
                                "day": today,  # 星期几
                                "sections": sections,
                                "teacher_name": teacher
                            })
                    break

        # 计数器
        counter = 0
        for td in tr:
            # 检查是否是指定类的<td>标签，如果是则跳过
            if 'firstHiddenTd' in td.get('class', []):
                continue

            if tr_counter == 2:
                week_day[counter] += int(td.get("rowspan"))
                counter += 1
                continue
            else:
                # 检查<td>标签的属性是否包含 "colspan="1" rowspan="1""，并且样式中是否包含 "text-align:center;"
                if 'colspan' in td.attrs and 'rowspan' in td.attrs and 'style' in td.attrs and 'text-align:center;' in \
                        td['style']:
                    continue
                for j in range(1, 8):
                    if week_day[j] == 0:
                        week_day[j] += int(td.get("rowspan"))
                        break
            counter += 1

        for i in range(1, 8):
            if week_day[i] != 0:
                week_day[i] -= 1

    print("数据正在加载中-----------")
    # print(courses)
    # print(events)
    # print(classroom_info)

    final = {}
    final["classroom_info"] = classroom_info
    final["courses"] = courses
    final["events"] = events

    # 将课程信息导出为JSON文件
    with open(output_file_name + '.json', 'w', encoding='utf-8') as json_file:
        json.dump(final, json_file, ensure_ascii=False, indent=4)
    print("成功生成文件" + output_file_name + ".json")
    print("共计" + str(count) + "条数据加载完成！")