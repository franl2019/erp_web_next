import type {ComponentOptions, ConcreteComponent, SetupContext, VNode} from 'vue'
import {getCurrentInstance, onUpdated} from 'vue'

type CacheKey = string | number | symbol | ConcreteComponent
export type Cache = Map<CacheKey, VNode>

export interface KeepAliveTestApi {
    cache: Cache,
    deleteCache: (key: string) => boolean
}

//类型标记,在patch阶段，通过匹配shapeFlag进行相应的渲染过程
export const enum ShapeFlags {
    COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,// 需要被keepAlive的组件
    COMPONENT_KEPT_ALIVE = 1 << 9,// 已经被keepAlive的组件
}

function resetShapeFlag(vnode: VNode) {
    let shapeFlag = vnode.shapeFlag
    if (shapeFlag & ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE) {
        shapeFlag -= ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE
    }
    if (shapeFlag & ShapeFlags.COMPONENT_KEPT_ALIVE) {
        shapeFlag -= ShapeFlags.COMPONENT_KEPT_ALIVE
    }
    vnode.shapeFlag = shapeFlag
}

export const ErpKeepAlive: ComponentOptions = {
    name: `ErpKeepAlive`,
    //KeepAlive 组件独有的属性 属性存在才会有 sharedContext 共享上下文
    __isKeepAlive: true,

    emits: ['getKeepAliveTest'],


    setup(props, {slots, emit}: SetupContext) {


        onUpdated(() => {

        })


        // 当前 KeepAlive 组件的实例
        const instance: any = getCurrentInstance();

        // 对于 KeepAlive 组件来说，他的实例上存在特殊的 ctx 对象，该对象有渲染器注入
        // 该对象会暴露渲染器的一些内部方法，其中 move 函数用来将一段 dom 移动到另一个容器中
        // 共享上下文
        const sharedContext = instance.ctx as any;
        const parentSuspense = instance.suspense

        let current: any | null = null


        // 创建一个缓存对象
        const cache: Cache = new Map();

        const {
            renderer: {
                m: move, um: _unmount, o: {createElement}
            }
        } = sharedContext

        const keepAliveTestApi: KeepAliveTestApi = {
            cache: cache,
            deleteCache: (key: string) => {
                const cached = cache.get(key);

                if (cached) {
                    unmount(cached);
                    cache.delete(key);
                    return true
                } else {
                    return false
                }

            }
        }
        emit('getKeepAliveTest', keepAliveTestApi);

        // 创建隐藏容器
        const storageContainer = createElement('div')

        // KeepAlive 组件的实例上会被添加两个内部函数，分别是 deActivate 和 activate
        // 这两个函数会在渲染器中被调用
        sharedContext.activate = async (vnode: any, container: any, anchor: any) => {

            //找到不生命周期藏哪了,凑合用于代替 keepALive 的 activated 生命周期
            const exposedList: Function[] = vnode.component.exposed
            if (exposedList.length > 0) {
                for (let i = 0; i < exposedList.length; i++) {
                    const exposed = exposedList[i]
                    if (exposed.name === 'activated') {
                        await exposed();
                    }
                }
            }

            move(vnode, container, anchor)
        }

        sharedContext.deactivate = (vnode: any) => {
            move(vnode, storageContainer)
        }

        function unmount(vnode: VNode) {
            if (current.key === vnode.key) {
                resetShapeFlag(vnode)
            } else {
                // reset the shapeFlag so it can be properly unmounted
                resetShapeFlag(vnode)
                _unmount(vnode, instance, parentSuspense, true)
            }
        }

        return () => {
            if (!slots.default) {
                return null
            }

            // KeepAlive 的默认插槽就是要被KeepAlive 的组件
            const children = slots.default();
            let vnode = children[0];
            const comp = vnode.type as ConcreteComponent
            const key = vnode.key == null ? comp : vnode.key

            // 在挂载时先获取缓存的组件 vnode
            const cachedVNode = cache.get(key);

            if (cachedVNode) {
                // 如果有缓存内容，则说明不应该执行挂载，而应该被执行激活
                // 复制挂载状态 , 继承组件实例
                vnode.el = cachedVNode.el
                vnode.component = cachedVNode.component

                // if (vnode.transition) {
                //     // recursively update transition hooks on subTree
                //     setTransitionHooks(vnode, vnode.transition!)
                // }

                //标记为 已经被keepAlive的组件
                vnode.shapeFlag = vnode.shapeFlag | ShapeFlags.COMPONENT_KEPT_ALIVE

            } else {
                // 如果没有缓存，则将其添加到缓存中，这样下去激活组件是就不会执行新的挂载动作了
                cache.set(key, vnode)
            }
            //标记为 需要被keepAlive的组件
            vnode.shapeFlag = vnode.shapeFlag | ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE

            current = vnode;

            return vnode
        }
    }

}

