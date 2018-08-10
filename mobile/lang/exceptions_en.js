export const exceptions_en = {
  // common:
  1000: 'API version not supported.',
  1001: 'Invalid token.',
  1002: 'Invalid parameter.',
  1003: 'Invalid deviceSN.',
  1004: 'Invalid media type, only support "application/json".',
  1005: 'Permission denied.',
  1006: 'Wrong field name in json string.',
  1007: 'Internal system error.',
  1008: 'Operation failed.',
  1009: 'Get failed.',
  1010: 'Not supported.',
  1011: 'Redis lock is timeout, submit again.',

//login
  1100: 'Invalid user name or password.',
  1101: 'Login failed more than 5 times, your account will be locked, you have {0} opportunities.',
  1102: 'Your account has been temporarily locked, please try again later or contact the administrator.',
  1103: 'Your account has been disabled. Please contact your administrator.',
  1104: 'Did not find this username!',
  1105: 'Email mismatch!',
  1106: 'This company administrator is not in any company!',

//file upload
  1200: 'File upload failed!',
  1201: 'Invalid license!',
  1202: 'Invalid import user file!',

//system config
  1300: 'Invalid time service address!',
  1301: 'Failed to update system properties.',

//meeting management
  1400: 'CONF_NOT_EXISTS',
  1401: 'NUMERICID_CONFLICTS',
  1402: 'CONF_UPDATING_IN_PROGRESS',
  1403: 'CONF_DELETING_IN_PROGRESS',
  1404: 'CONF_TERMINATING_IN_PROGRESS',
  1405: 'CONF_LAUNCHING_IN_PROGRESS',
  1406: 'CONF_NOT_IN_APPROVED_STATUS',
  1407: 'CONF_NUMERICID_ONGOING',
  1409: 'CONF_NOT_APPROVED_OR_ONGOING',
  1410: 'PARTICIPANT_NOT_EXISTS_IN_CONF',
  1412: 'NUMERICID_ALREADY_IN_USE',
  1415: 'INVALID_CONF_TIME',
  1418: 'INVALID_CONF_ID',
  1421: 'NOT_FOUND_SUITABLE_MRU',
  1422: 'NOT_FOUND_SUITABLE_GATEWAY',
  1424: 'FAILED_TO_CONNECT_MRU',
  1427: 'NOT_ALLOW_DUPLICATED_NAME',
  1430: 'NOT_FOUND_CONF_IN_REDIS',
  1431: 'NOT_IN_LECTURER_MODE',
  1433: 'FAILED_TO_MUTE_ALL_PARTICIPANTS',
  1436: 'FAILED_TO_CONNECT_PARTICIPANT',
  1439: 'FAILED_TO_DISCONNECT_PARTICIPANT',
  1442: 'FAILED_TO_CHANGE_LAYOUT',
  1445: 'FAILED_TO_SET_SUBTITLE',
  1448: 'FAILED_TO_MUTE_PARTICIPANT_AUDIO',
  1451: 'FAILED_TO_DELETE_PARTICIPANT',
  1454: 'FAILED_TO_INVITE_AVC_ENDPOINT',
  1455: 'FAILED_TO_INVITE_SVC_ENDPOINTS',
  1456: 'CONF_ROOM_COMPLETELY_FULL',
  1457: 'TIMEOUT_TO_GENERATE_NUMERICID',
  1460: 'NOT_FOUND_PROFILE_NAMED_SVC',
  1463: 'FAILED_TO_PROLONG_CONF',

//ongoing meeting control
  1500: 'Invalid meeting control request.',

//endpoint management
  1600: 'Name already in use!',
  1601: 'Endpoint name can not be blank!',
  1602: 'Endpoint call mode can not be blank!',
  1603: 'Endpoint SIP username can not be blank!',
  1604: 'Endpoint SIP password can not be blank!',
  1605: 'Endpoint IP address can not be blank!',
  1606: 'Invalid SIP username.',
  1607: 'Invalid IP address.',
  1608: 'The specified endpoint does not exist.',
  1609: 'E.164 number of the endpoint has been used.',
  1610: 'Endpoint device serial number already exists, please re-enter.',
  1611: 'SIP username has been registered!',
  1612: 'Endpoint E164 number is invalid.',
  1613: 'NOT_FOUND_ENDPOINT_DEVICE_SN',
  1614: 'NOT_FOUND_ENDPOINT_PROVISION_TEMPLATE',
  1615: 'DEVICE_SN_EXISTS: {0}',

//user management
  1700: 'Can not delete a user who is in a reserved meeting!',
  1701: 'User password can not be blank!',
  1702: 'Username can not be blank!',
  1703: 'User display name can not be blank!',
  1704: 'Invalid user email!',
  1705: 'Invalid user cellphone number!',
  1706: 'Original password is wrong!',
  1707: 'Duplicate email name!',
  1708: 'Duplicate cellphone number!',
  1709: 'Duplicate username!',
  1710: 'Invalid conf room max capacity.',
  1711: 'Should assign department to department administrator.',
  1712: 'User email can not be blank!',
  1713: 'User cellphone number can not be blank!',

//company management
  1800: 'This company does not exist!',
  1801: 'Short name of this company has been used!',
  1802: 'Full name of this company has been used!',
  1803: 'This company is not empty, not allowed to delete. Please clear the users or endpoints of this company first.',
  1804: 'Short name of the company can not be blank!',

//agent management
  1900: 'This agent is in use.',
  1901: 'Short name of this agent has been used!',
  1902: 'Full name of this agent has been used!',
  1903: 'The agent does not exist.',
  1904: 'Agent is not empty',

//conf room management
  2000: 'This conf room is already expired.',
  2003: 'NOT_FOUND_SUITABLE_ROOM',
  2006: 'Conf room is already in use.',
  2009: 'This conf room number is already in use.',
  2012: 'Capacity of this conf room exceeds limit.',
  2015: 'Invalid conf room capacity.',
  2018: 'Invalid conf room number.',
  2021: 'ROOM_NOT_EXISTS',

//dept management
  2100: 'Can not delete a department with subordinate department!',
  2101: 'Can not delete a department which has users or endpoints!',

//acs
  2200: 'ACS configuration not valid!'
}
