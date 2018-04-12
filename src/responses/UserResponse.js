const _ = require('lodash')

const fileds = [
  'email',
  'status',
  'roles',
  'createdAt',
  'updatedAt'
]

exports.one = obj => ({ data: _.pick(obj, fileds) })

exports.all = objs => ({ data: objs.map(obj => _.pick(obj, fileds)) })
