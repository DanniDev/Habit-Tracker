'use client'
import React from 'react'
import MainWrapper from '../components/MainWrapper'
import ReduxProvider from '@/lib/redux/ReduxProvider'

export default function HomePage () {
  return (
    <ReduxProvider>
       <MainWrapper/>
    </ReduxProvider>
  )
}
