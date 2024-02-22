// src utils 工具类方法的测试用例
import { describe, expect, test } from 'vitest'
import { filterHashSelfUrl } from '../src/utils/tools'

describe('tools filterHashSelfUrl', () => {
  //
  test('not url', () => {
    expect(filterHashSelfUrl('sfaldf')).toEqual('sfaldf')
  })
  test('is url', () => {
    expect(filterHashSelfUrl('http://sdfla/#/home')).toEqual('http://sdfla/home')
  })
})
