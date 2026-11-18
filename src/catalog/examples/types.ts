export interface DemoOptions {
  variant: string
  size: string
  disabled: boolean
  loading: boolean
  invalid: boolean
  success: boolean
  readOnly: boolean
  empty: boolean
  selected: boolean
}
export interface DemoProps { options: DemoOptions }
export const defaultDemoOptions: DemoOptions = {
  variant: 'default', size: 'default', disabled: false, loading: false,
  invalid: false, success: false, readOnly: false, empty: false, selected: false,
}
