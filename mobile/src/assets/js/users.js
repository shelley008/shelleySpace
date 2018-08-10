export const UsersClass = class Users {
   
    deptTree = {}
    selectedUsersCount = 0
    constructor(depts, users, defaultUserIds) {
        this.depts = depts
        this.users = users
        this.getAllChilrenByDeptId(0,true)
        this.initData(this.deptTree, defaultUserIds, true)
    }

    initData(deptTree=undefined, userIds = undefined, isAdd = true) {
        if(!deptTree) {
            deptTree = this.deptTree
        }
        if(!userIds) return
        for (let item of deptTree.userList) {
            if(userIds.includes(item.id)) {
                item.selected = isAdd;
            }
        }
        for (let item of deptTree.deptList) {
          this.initData(item, userIds, isAdd)
        }
    }

    addUsers(needAddUserIds) {
        this.initData(this.deptTree, needAddUserIds, true)
    }

    removeUsers(needRmoveUserIds) {
        this.initData(this.deptTree, needRmoveUserIds, false)
    }

    selectedItemCount() {
        return  this.selectedUsersCount
    }

    //为保存提供数据
    getAllSelectedUsers(deptTree = undefined) {
        if(!deptTree) {
            deptTree = this.deptTree
        }
        let selectedUsers = []
        for (let user of deptTree.userList) {
            if(user.selected === true) {
                selectedUsers.push(user)
            }
        }
        for (let dept of deptTree.deptList) {
            if(dept.userList.length > 0) {
                selectedUsers.push(...this.getAllSelectedUsers(dept))
            }
        }
        this.selectedUsersCount = selectedUsers.length
        return selectedUsers.map(function(user){
            return {
                id:user.id,
                name:user.displayName || user.name
            }
        })
    }

     //为页面展现提供数据
    getCurrentDeptSelectedUsers(deptId = 0) {
       let chiledren = this.getChildrenUsersByDeptId(deptId,true)
       return chiledren.map(function(value) {
            return value.id
       })
    }

    //获取所有的子部门和用户
     getAllChilrenByDeptId(deptId=0, isInit=false) {
        let userChilren = this.getChildrenUsersByDeptId(deptId)
        let detpChilren = this.getChildrenDeptsByDeptId(deptId)
        let allChilren = [...userChilren, ...detpChilren]
        let currentDept = this.getDeptByDeptId(deptId)
        if(currentDept === null) return
        var deptTree = {id:deptId, userList:[],deptList:[],shortName:currentDept.shortName}
        for(let child of allChilren) {
            if(child.type === "USER") {
              deptTree.userList.push(child)
            }else if(child.type === "DEPT") {
              let cascadeDept = this.getAllChilrenByDeptId(child.id)
              deptTree.deptList.push(cascadeDept)
            }
        }
        if(isInit) {
            this.deptTree = deptTree
        }
        return deptTree
      }

      getChildrenUsersByDeptId(deptId=0, isSelected=false) {
        let currentDept = this.getDeptByDeptId(deptId)
        if(currentDept === null) return
        let users = Object.assign([],this.users)
        var children = [];
        for(let user of this.users) {
          if(currentDept.id === user.deptId) {
            user.type = 'USER'

            if(isSelected) {
                if(user.selected) {
                    children.push(user)
                }
            }else {
                children.push(user)
            }
          }
        }
        return children
      }

      getChildrenDeptsByDeptId(deptId=0) {
        let currentDept = this.getDeptByDeptId(deptId)
        if(currentDept === null) return
        let depts = Object.assign([],this.depts)
        var children = [];
        for(let dept of depts) {
          if(currentDept.id === dept.parentId) {
            dept.type = 'DEPT'
            children.push(dept)
          }
        }
        return children
      }
      getDeptByDeptId(deptId=0) {
        let depts = Object.assign([],this.depts)
        if(deptId === 0) {
          return {id:deptId, userList:[],deptList:[],shortName:"根部门"}
        }
        for(let dept of depts) {
          if(dept.id === deptId) {
            return dept
          }
        }
        return null
      }
}
