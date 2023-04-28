// 不能用import
const data = require('./data.json')

// 路径不用加 mock-api
module.exports = [
    {
        url: '/home/alldata',
        type: 'get',
        response: config => {
            return {
                code: 20000,
                data
            }
        }
    }
]
