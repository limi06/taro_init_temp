


/*
 * @Author: lsmi
 * @Date: 2022-04-22 21:31:54
 * @LastEditors: lsmi
 * @LastEditTime: 2022-04-22 22:16:49
 * @FilePath: \taro-tsx-temp\src\pages\temp\index.tsx
 */
import { inject, observer } from 'mobx-react'
import { View, Image } from '@tarojs/components'
import React, { useCallback, useEffect, useState } from 'react'
import Taro, { useDidShow, usePullDownRefresh, useReachBottom, useReady, useShareAppMessage, useShareTimeline , useRouter } from '@tarojs/taro'
import { Button } from '@taroify/core'
import useStateRef from 'react-usestateref'
import { UserStore } from '@/types/store'
import { getCurrentPageUrlWithArgs, watch } from '@/utils/index'
import './index.scss'



interface Props {
  user: UserStore
}

interface InfoData {
  name: string
}

const Index: React.FC<Props> = ({ user }) => {
  const router = useRouter()
  const [, setInfoData, infoData] = useStateRef<InfoData>({
    name: ''
  })
  useShareTimeline(() => {
    return {
      title: '',
      path: getCurrentPageUrlWithArgs()
    }
  })
  useShareAppMessage(() => {
    return {
      title: '',
      path: getCurrentPageUrlWithArgs()
    }
  })

  useReachBottom(() => {
    // console.log('useReachBottom')
  })
  // 下拉刷新
  usePullDownRefresh(() => {
    watch(async () => {

      Taro.stopPullDownRefresh();
    });
  })


  return (
    <View className='home-page page-view-content bg-[#F4F3F2] pb-[200px]'>
      <Button color='primary'>xx</Button>
      xx
    </View>
  )
}

export default React.memo(inject('user')(observer(Index)))