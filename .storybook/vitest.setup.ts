import { beforeAll } from 'vitest'
import { setProjectAnnotations } from '@storybook/experimental-nextjs-vite'
import * as projectAnnotations from './preview'

// Storybookの設定をVitestでも適用する
const project = setProjectAnnotations([projectAnnotations])

// beforeAllを使ってStorybookの設定をテスト環境に適用する
beforeAll(project.beforeAll)
