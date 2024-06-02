import pymysql
import json
import re
from datetime import datetime, date, timedelta


def read_json(file_path):
    with open(file_path, "r") as file:
        data = json.load(file)
        return data


print("----------开始与数据库建立连接----------")
# 打开数据库连接
db = pymysql.connect(host="localhost",
                     user="root",
                     password="12345678",
                     database="tjut_zxb")
print(db)
print("----------数据库连接成功----------")


def mysql_execute(sql):
    # 创建一个游标对象
    cursor = db.cursor()
    # 尝试执行sql语句
    try:
        # 执行sql语句，execute 的值是影响的条数
        execute = cursor.execute(sql)
        db.commit()
        return execute
    except:
        db.rollback()
        return -1


def mysql_select(sql):
    # 创建一个游标对象
    cursor = db.cursor()
    # 尝试执行sql语句
    try:
        # 执行sql语句，execute 的值是影响的条数
        cursor.execute(sql)
        results = cursor.fetchall()
        return results
    except:
        return []


def add_classroom(classroom_info):
    """
    添加教室信息
    :param classroom_info: 教室和教学楼信息
    :return: 教室的id，id > 0 -> 成功插入教室数据并得到id或教室已存在，id == -1 -> 成功插入教室数据但获取教室id失败或插入失败
    """
    # 获取教学楼id
    building_ids = re.findall(r'\d+', classroom_info["building"])
    building_id = -1
    if building_ids:
        building_id = int(building_ids[0])
    if building_id < 0:
        print("[ERROR] 获取教学楼ID错误, " + classroom_info)
    # 教室名称
    classroom_number = classroom_info["classroom"]
    # 教室楼层
    classroom_floor = classroom_info["floor"]
    if classroom_number == "" or classroom_floor == "":
        print("[ERROR] 获取教室或楼层失败, " + classroom_info)

    # 插入教室id之前先判断数据是否有重复数据
    check_classroom_sql = "SELECT id FROM classrooms WHERE class_building_id =%d and floor = %s and classroom_number = '%s'" % (building_id, classroom_floor, classroom_number)
    check_results = mysql_select(check_classroom_sql)
    # 教室已存在，直接返回id
    if len(check_results) > 0:
        return check_results[0][0]

    # 开始插入教室信息
    sql = "INSERT INTO classrooms (id, class_building_id, floor, classroom_number) VALUES (NULL, %d, %s, '%s')" % (building_id, classroom_floor, classroom_number)
    execute = mysql_execute(sql)
    if execute <= 0:
        print("[ERROR] 执行sql错误：" + sql)
        return -1
    else:
        print("[DEBUG] 成功执行 sql 语句：" + sql + ", 并成功影响 " + str(execute) + " 行")
        find_classroom_id_sql = "SELECT id FROM classrooms WHERE class_building_id =%d and floor = %s and classroom_number = '%s'" % (building_id, classroom_floor, classroom_number)
        results = mysql_select(find_classroom_id_sql)
        if len(results) > 0:
            classroom_id = results[0][0]
            return classroom_id
        else:
            print("[ERROR] 成功执行插入数据：" + str(classroom_info) + ", 但获取教室id失败")
            return -1


def add_classes(courses):
    """
    添加课程
    :param courses: 课程信息
    :return:
    """
    for course in courses:
        # 课程名称
        class_name = course["class_name"]
        # 上课教师
        teacher = course["teacher_name"]
        if class_name == "" or teacher == "":
            print("[ERROR] 获取课程名称或教师姓名失败或该值不存在，" + course)
            continue

        # 先检查课程信息是否在数据库中，如果存在直接跳过
        check_course_id_sql = "SELECT id FROM classes WHERE class_name = '%s' and teacher = '%s'" % (class_name, teacher)
        check_results = mysql_select(check_course_id_sql)
        if len(check_results) > 0:
            continue

        # 开始插入课程信息
        sql = "INSERT INTO classes (id, class_name, teacher) VALUES (NULL, '%s', '%s')" % (class_name, teacher)
        execute = mysql_execute(sql)
        if execute <= 0:
            print("[ERROR] 执行 sql 语句错误：" + sql)
            continue
        else:
            print("[DEBUG] 成功执行 sql 语句：" + sql)


def add_even(events, classroom_id, term_start_date):
    """
    添加事件（预约）
    :param events: 事件
    :param classroom_id: 教室id
    :return:
    """
    for event in events:
        # 事件名称
        event_name = event["event_name"]
        # 事件理由 可空
        event_reason = event["event_reason"]
        # 占用节次
        sections = get_sections_or_weeks(event["sections"])
        # 周次（放在备注tips里面）
        weeks_tips = get_sections_or_weeks(event["weeks"])
        # 状态： 2 - 未入库；3 - 系统默认载入
        status = 3
        # 申请人 可为 ""
        user = event["person"]
        if event_name == "" or len(sections) == 0:
            print("[ERROR] 数据获取异常，" + event)
            continue
        # 获取日期，如果有多个日期已第一个为准
        weeks = event["weeks"]
        week = 1
        if weeks:
            week = weeks[0]
        # 获取事件星期几占用
        event_per_week_day = 1
        if event["day"]:
            event_per_week_day = event["day"]
        # 处理上课日期
        start_date = datetime.strptime(term_start_date, "%Y-%m-%d").date()  # 获取开学的日期, date对象, 开学日期为第一周的第一天
        t_date = start_date + timedelta(days=(week - 1) * 7 + event_per_week_day - 1)
        date = t_date.strftime("%Y-%m-%d")

        # 先检查该事件是否存在，存在直接跳过
        check_event_id_sql = "SELECT id FROM apply WHERE classroom_id = %d and event = '%s' and sections = '%s' and tips = '%s'" % (classroom_id, event_name, sections, weeks_tips)
        check_results = mysql_select(check_event_id_sql)
        if len(check_results) > 0:
            continue

        # 插入预约
        sql = "INSERT INTO apply (id, classroom_id, sections, event, reason, date, create_time, cope_time, status, apply_user, contact, tips) VALUES (NULL, %d, '%s', '%s', '%s', '%s', now(), now(), %d, '%s', NULL, '%s')" % (classroom_id, sections, event_name, event_reason,date, status, user, weeks_tips)
        execute = mysql_execute(sql)
        if execute <= 0:
            print("[ERROR] 执行 sql 语句错误：" + sql)
            continue
        else:
            print("[DEBUG] 成功执行 sql 语句：" + sql)


def add_course_to_classroom_class(courses, classroom_id, term_start_date):
    """
    插入 课程-教室-上课日期 信息
    :param courses: 课程
    :param classroom_id: 教室id
    :param term_start_date: 上课日期
    :return:
    """
    for course in courses:
        # 获取课程的id
        class_id = -1
        # 课程名称
        class_name = course["class_name"]
        # 上课教师
        teacher = course["teacher_name"]
        if class_name == "" or teacher == "":
            print("[ERROR] 获取课程名称或教师姓名失败或该值不存在，" + course)
            continue

        # 先检查课程信息是否在数据库中，如果存在直接跳过
        check_course_id_sql = "SELECT id FROM classes WHERE class_name = '%s' and teacher = '%s'" % (
        class_name, teacher)
        check_results = mysql_select(check_course_id_sql)
        if len(check_results) > 0:
            class_id = check_results[0][0]
        if class_id <= 0:
            print("[ERROR] 获取课程 id 失败，" + check_course_id_sql)
            continue

        # 获取节次
        sections = get_sections_or_weeks(course["sections"])
        # 获取上课日期
        weeks = course["weeks"]
        if sections == "" or len(weeks) == 0:
            print("[ERROR] 原始参数错误，" + course)
            continue
        # 是否为课程
        is_class = 1

        # 处理上课日期
        start_date = datetime.strptime(term_start_date, "%Y-%m-%d").date()  # 获取开学的日期, date对象, 开学日期为第一周的第一天
        # 获取课程上课的时间（星期几上课）
        class_per_week_day = course["day"]
        # 上课的日期
        class_dates = []
        for week in weeks:
            # 计算上课日期
            temp_date = start_date + timedelta(days=(week - 1) * 7 + class_per_week_day - 1)
            class_dates.append(temp_date.strftime("%Y-%m-%d"))

        # 插入数据库
        for class_date in class_dates:
            sql = "INSERT INTO classroom_class(id, classroom_id, class_id, event_id, sections, class_date, is_class) VALUES (NULL, %d, %d, NULL, '%s', '%s', %d)" % (classroom_id, class_id, sections, class_date, is_class)
            execute = mysql_execute(sql)
            if execute <= 0:
                print("[ERROR] 执行 sql 语句错误：" + sql)
                continue
            else:
                print("[DEBUG] 成功执行 sql 语句：" + sql)


def add_event_to_classroom_class(events, classroom_id, term_start_date):
    """
    插入 课程-事件(预约)-上课日期 信息
    :param events: 事件（预约）
    :param classroom_id: 教室id
    :param term_start_date: 日期
    :return:
    """
    for event in events:
        # 获取事件的id
        event_id = -1
        # 事件名称
        event_name = event["event_name"]
        # 事件理由
        reason = event["event_reason"]
        # 使用人 可为 ""
        user = event["person"]
        if event_name == "":
            print("[ERROR] 获取事件名称或使用人失败或该值不存在，" + event)
            continue

        # 获取上课日期
        weeks = event["weeks"]
        # 获取节次
        sections = get_sections_or_weeks(event["sections"])
        if sections == "" or len(weeks) == 0:
            print("[ERROR] 原始参数错误，" + event)
            continue

        # 先检查课程信息是否在数据库中，如果存在直接跳过
        week_tips = get_sections_or_weeks(weeks)
        check_event_id_sql = "SELECT id FROM apply WHERE classroom_id = %d and event = '%s' and sections = '%s' and tips = '%s'" % (classroom_id, event_name, sections, week_tips)
        check_results = mysql_select(check_event_id_sql)
        if len(check_results) > 0:
            event_id = check_results[0][0]
        if event_id <= 0:
            print("[ERROR] 获取预约 id 失败，" + check_event_id_sql)
            continue

        # 是否为课程
        is_class = 0

        # 处理事件日期
        start_date = datetime.strptime(term_start_date, "%Y-%m-%d").date()  # 获取开学的日期, date对象, 开学日期为第一周的第一天
        # 获取事件的时间（星期几占用）
        event_per_week_day = event["day"]
        # 事件的日期
        event_dates = []
        for week in weeks:
            # 计算事件日期
            temp_date = start_date + timedelta(days=(week - 1) * 7 + event_per_week_day - 1)
            event_dates.append(temp_date.strftime("%Y-%m-%d"))

        # 插入数据库
        for event_date in event_dates:
            sql = "INSERT INTO classroom_class(id, classroom_id, class_id, event_id, sections, class_date, is_class) VALUES (NULL, %d, NULL, %d, '%s', '%s', %d)" % (classroom_id, event_id, sections, event_date, is_class)
            execute = mysql_execute(sql)
            if execute <= 0:
                print("[ERROR] 执行 sql 语句错误：" + sql)
                continue
            else:
                print("[DEBUG] 成功执行 sql 语句：" + sql)


def get_sections_or_weeks(sections):
    counter = 0
    sections_or_weeks_str = ""
    for section in sections:
        counter = counter + 1
        if counter == len(sections):
            sections_or_weeks_str += str(section)
        else:
            sections_or_weeks_str += str(section) + ","
    return sections_or_weeks_str

# TODO
    # 1. 添加教室 done!
    # 2. 添加课程 done!
    # 3. 添加event done!
    # 4. 根据开学时间计算出课程的日期，然后根据 教室id-课程id-节次-日期-是否课程（1-是；0-否） 存入数据库 done!

if __name__ == '__main__':
    path = "./classroom_data/"
    for i in range(1, 168):
        json_path = path + str(i) + ".json"
        data_json = read_json(json_path)
        classroom_id = add_classroom(data_json["classroom_info"])
        add_classes(data_json["courses"])
        add_even(data_json["events"], classroom_id,"2024-02-26")
        add_course_to_classroom_class(data_json["courses"], classroom_id, "2024-02-26")
        add_event_to_classroom_class(data_json["events"], classroom_id, "2024-02-26")
    db.close()

# 清空数据库
# DELETE FROM classrooms
# DELETE FROM classes
# DELETE FROM classroom_class
# DELETE FROM classroom_status
# DELETE FROM apply