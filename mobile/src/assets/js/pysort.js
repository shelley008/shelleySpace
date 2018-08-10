import {makePy,isCh} from './charfirst.pinyin'

export function nameTransfer(addressData) {
    /*sort 排序*/
    var by = function (name) {
        return function (o, p) {
            let a, b;
            if (typeof o === "object" && typeof p === "object" && o && p) {
                a = o[name];
                b = p[name];
                let aname = o['displayName'] || o['name']
                let bname = p['displayName'] || p['name']

                if(a.charAt(0) === b.charAt(0)) {
                    if(isCh(aname.charAt(0)) && !isCh(bname.charAt(0))) {
                        return 1
                    }else if(!isCh(aname.charAt(0)) && isCh(bname.charAt(0))){  
                        return -1
                    }
                }

                if (a === b) {
                    return 0;
                }
                if (typeof a === typeof b) {
                    return a < b ? -1 : 1;
                }
                return typeof a < typeof b ? -1 : 1;
            }
            else {
                throw ("error");
            }
        }
    }
    //处理数据
    for (var i = 0; i < addressData.length; i++) {
        let displayname = addressData[i].displayName || addressData[i].name
        if (displayname) {
            //displayName属性须存在，转拼音首字母
            var char = makePy(displayname)[0];
            addressData[i].charName = char
        } else {
            //不存在定为空字符串
            addressData[i].charName = ''
        }
    }
    //排序
    addressData.sort(by("charName"));
    var map = {}
    var html = '';
    for (var i = 0; i < addressData.length; i++) {
        var ch = addressData[i].charName[0];
        var showName;
        if (addressData[i].displayName) {
            showName = addressData[i].displayName;
            addressData[i].chinaName = showName;
        } else {
            showName = '无姓名';
            addressData[i].chinaName = showName;
        }
    }
    return addressData;
}

