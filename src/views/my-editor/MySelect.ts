import { IDomEditor, ISelectMenu } from '@wangeditor/editor';

export class MySelectMenu implements ISelectMenu {
  selectPanelWidth?: number | undefined;
  title: string;
  iconSvg?: string | undefined;
  hotkey?: string | undefined;
  alwaysEnable?: boolean | undefined;
  tag: string;
  width?: number | undefined;

  constructor() {
    (this.title = 'My Select Menu'), (this.tag = 'select');
    this.width = 60;
  }

  // 下拉框的选项
  // getOptions(editor: IDomEditor) {
  getOptions() {
    const options = [
      { value: 'beijing', text: '北京', styleForRenderMenuList: { 'font-size': '32px', 'font-weight': 'bold' } },
      { value: 'shanghai', text: '上海', selected: true },
      { value: 'shenzhen', text: '深圳' },
    ];
    return options;
  }

  // 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
  isActive(): boolean {
    //editor: IDomEditor
    return false;
  }

  // 获取菜单执行时的 value ，用不到则返回空 字符串或 false
  getValue(): string | boolean {
    return 'shanghai'; // 匹配 options 其中一个 value
  }

  // 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
  isDisabled(): boolean {
    return false;
  }

  // 点击菜单时触发的函数
  exec(editor: IDomEditor, value: string | boolean) {
    editor.insertText(`${value}`);
    editor.insertText(' ');
  }
}
