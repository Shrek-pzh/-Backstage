// 商品管理
import * as tradeMark from '@/api/production/tradeMark'
import * as sku from '@/api/production/sku'
import * as spu from '@/api/production/spu'
import * as attr from '@/api/production/attr'

// 权限管理
import * as user from './acl/user'
import * as role from './acl/role'
import * as permission from './acl/permission'

export default {
    tradeMark,
    sku,
    spu,
    attr,
    user,
    role,
    permission
}
