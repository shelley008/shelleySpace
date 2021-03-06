export const exceptions_cn = {
  // common:
  1000: '系统不支持您使用的API版本。',
  1001: '无效的登录令牌。',
  1002: '无效的参数。',
  1003: '参数deviceSN为空或者不合法。',
  1004: '无效的媒体类型，只支持"application/json"。',
  1005: '您不具备执行此操作的权限。',
  1006: 'JSON串内字段名拼写错误。',
  1007: '系统内部错误。',
  1008: '操作失败！',
  1009: '获取失败！',
  1010: '不支持！',
  1011: '处理超时，请重试。',
  //login :
  1100: '无效的用户名或密码。',
  1101: '登录失败超过5次，账号会被锁定，您还有{0}次机会。',
  1102: '您的账户已被临时锁定，请稍后再试或直接联系管理员解锁。',
  1103: '您的账户已被停用，请联系管理员。',
  1104: '没有找到这个用户名！',
  1105: '邮箱和用户名不匹配！',
  1106: '该公司管理员未分配到任何公司！',
  //file_upload
  1200: '文件上传失败！',
  1201: '无效许可证！',
  1202: ' 无效的导入用户文件！',

  //system config
  1300: ' 时间服务地址不正确!',
  1301: ' 系统参数更新错误。',

  //meeting management
  1400: ' 会议不存在。',
  1401: ' 该会议号码已被占用！',
  1402: ' 正在更新会议信息。',
  1403: ' 正在删除会议信息。',
  1404: ' 会议正在结束中。',
  1405: ' 会议正在发起中。',
  1406: ' 会议状态不正确。',
  1407: ' 该会议正在进行中。',
  1409: ' 会议状态不正确。',
  1410: ' 参会者在会议中不存在。',
  1412: ' 会议号码已被使用。',
  1415: ' 会议时间不合法。',
  1418: ' 会议号码不合法。',
  1421: ' 没有可用的媒体服务。',
  1422: ' 没有可用的媒体网关。',
  1424: ' 连接媒体服务失败。',
  1427: ' 名称冲突。',
  1430: ' 在缓存中未发现会议信息。',
  1431: ' 当前为非主席模式。',
  1433: ' 全部静音失败。',
  1436: ' 连接终端失败。',
  1439: ' 挂断终端失败。',
  1442: ' 设置会议分屏失败。',
  1445: ' 设置会议字幕失败。',
  1448: ' 静音终端失败。',
  1451: ' 删除参会者失败。',
  1454: ' 邀请终端入会失败。',
  1455: ' 邀请终端入会失败。',
  1456: ' 会议室已满。',
  1457: ' 产生会议号超时。',
  1460: ' 没有找到名称为SVC的模板。',
  1463: ' 会议延时失败。',
  1466: ' 已达到最大会议方数。',
  1469: ' 混合模式MRU已满员。',

  //ongoing meeting control
  1500: ' 会议控制请求不合法。',

  //endpoint management
  1600: ' 该终端名称已被占用！',
  1601: ' 终端名称不能为空！',
  1602: ' 终端呼叫模式不能为空!',
  1603: ' 终端的SIP号码不能为空！',
  1604: ' 终端的SIP密码不能为空！',
  1605: ' 终端的IP地址不能为空！',
  1606: ' 无效的SIP号码。',
  1607: ' 无效的IP地址。',
  1608: ' 指定的终端不存在。',
  1609: ' 该E164号码已被占用！',
  1610: ' 该序列号已被占用，请重新输入！',
  1611: ' 该SIP号码已被占用！',
  1612: ' 无效的E164号。',
  1613: ' 没要找到该终端数据。',
  1614: ' 终端预配置模板未找到。',
  1615: ' 这些设备序列号已被分配了：{0}',

  //user management
  1700: ' 不能删除正在会议中的用户！',
  1701: ' 密码不能为空！',
  1702: ' 账号不能为空！',
  1703: ' 姓名不能为空！',
  1704: ' 无效的邮箱地址！',
  1705: ' 无效的手机号码！',
  1706: ' 原密码输入错误！',
  1707: ' 邮箱重复！',
  1708: ' 手机重复！',
  1709: ' 账号重复！',
  1710: ' 云会议室最大容量不正确。',
  1711: ' 请为部门管理员选择所在部门！',
  1712: ' 邮箱不能为空！',
  1713: ' 手机号不能为空！',

  //company management
  1800: ' 该公司不存在！',
  1801: ' 公司名称已被占用！',
  1802: ' 公司全称已被占用！',
  1803: ' 清理该公司下用户和终端后删除该公司！',
  1804: ' 公司名称不能为空！',

  //agent management
  1900: ' 客服代表还在使用中。',
  1901: ' 客服代表的名称被占用！',
  1902: ' 客服代表的全称被占用！',
  1903: ' 该客服代表不存在！',
  1904: ' 客服代表下有公司，不能删除！',

  //conf room management
  2000: ' 该云会议室已过期！',
  2003: ' 未找到合适的云会议室。',
  2006: ' 该云会议室已被使用！',
  2009: ' 该云会议室号码被占用！',
  2012: ' 该云会议室的超过容量限制.',
  2015: ' 无效的云会议室方数。',
  2018: ' 无效的云会议室号码。',
  2021: ' 云会议室不存在。',

  //dept management
  2100: ' 部门下面有子部门，不能删除！',
  2101: ' 部门下面有用户或终端，不能删除！',

  //acs
  2200: ' ACS服务配置不正确!'
}
