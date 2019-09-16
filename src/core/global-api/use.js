/* @flow */

import { toArray } from '../util/index'
// 所有的插件只会运行一次
export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    // 看看之前有没有安装过插件
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1) // 参数数组化
    args.unshift(this) // 确保vue是第一个参数
    if (typeof plugin.install === 'function') { // 执行install
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin) // 保存
    return this
  }
}
