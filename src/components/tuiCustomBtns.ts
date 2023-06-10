export interface CustomBtn {
  index?: {
    groupIndex: number
    itemIndex: number
  }
  action: string
  faIcon: string[]
  name: string
  popupBtns?: CustomPopupBtn[]
  tooltip: string
}

export interface CustomPopupBtn {
  action: string
  name: string
}


// to organize items: refer to ToastUiEditor component => toolbarItems
const myCustomBtns: CustomBtn[] = [
  // groupIndex === array to integrate btn
  // !! itemIndex: btn integrated with splice() 
  // => pay attention to declaration order
  {
    index: { groupIndex: 0, itemIndex: 0 },
    action: 'popup',
    faIcon: ['fas', 'text-height'],
    name: 'fontSize',
    tooltip: 'Font size',
    popupBtns: [
      { name: 'large', action: 'span:spanfntSz3' },
      { name: 'medium', action: 'span:spanfntSz2' },
      { name: 'small', action: 'span:spanfntSz1' },
      { name: 'tiny', action: 'tag:small' }
    ]
  },
  {
    index: { groupIndex: 0, itemIndex: 4 },
    action: 'tag:u',
    faIcon: ['fas', 'underline'],
    name: 'underline',
    tooltip: 'Underline'
  },
  {
    index: { groupIndex: 0, itemIndex: 5 },
    action: 'tag:sup',
    faIcon: ['fas', 'superscript'],
    name: 'superscript',
    tooltip: 'Superscript'
  },
  {
    index: { groupIndex: 0, itemIndex: 6 },
    action: 'tag:mark',
    faIcon: ['fas', 'highlighter'],
    name: 'highlight',
    tooltip: 'Highlight'
  },
  {
    index: { groupIndex: 1, itemIndex: 1 },
    action: 'custom:divCtr',
    faIcon: ['fas', 'align-center'],
    name: 'alignCenter',
    tooltip: 'Center text'
  },
  {
    index: { groupIndex: 1, itemIndex: 2 },
    action: 'popup',
    faIcon: ['fas', 'indent'],
    name: 'indent',
    tooltip: 'Indent text',
    popupBtns: [
      { name: 'indent 1', action: 'custom:divIndent1' },
      { name: 'indent 2', action: 'custom:divIndent2' },
      { name: 'indent 3', action: 'custom:divIndent3' },
      { name: 'indent 4', action: 'custom:divIndent4' },
      { name: 'indent 5', action: 'custom:divIndent5' },
      { name: 'indent 6', action: 'custom:divIndent6' }
    ],
  },
  {
    index: { groupIndex: 1, itemIndex: 3 },
    action: 'popup',
    faIcon: ['far', 'square'],
    name: 'bordered',
    tooltip: 'Add border',
    popupBtns: [
      { name: 'box', action: 'custom:divBox' },
      { name: 'box+center', action: 'custom:divBoxCtr' },
      { name: 'color+center', action: 'custom:divClrCtr' },
      { name: 'box+color+center', action: 'custom:divBoxClrCtr' }
    ],
  },
  {
    index: { groupIndex: 1, itemIndex: 4 },
    action: 'popup',
    faIcon: ['fas', 'code'],
    name: 'htmlTags',
    tooltip: 'Other',
    popupBtns: [
      { name: '<div class="header">', action: 'custom:divHeader' },
      { name: '<div class="table1">', action: 'custom:divTable1' },
      { name: '<div class="table2">', action: 'custom:divTable2' },
    ]
  },
  {
    index: { groupIndex: 1, itemIndex: 5 },
    action: 'orphTag:br',
    faIcon: ['fas', 'turn-down'],
    name: 'lineBreak',
    tooltip: 'Line break'
  },
  // declare in push order for non-indexed
  // !! each item is separated with divider on render
  {
    // index: { groupIndex: 3, itemIndex: 1 },
    action: 'print',
    faIcon: ['fas', 'print'],
    name: 'print',
    tooltip: 'Print'
  },
  // TODO???
  // { action: 'erase', faIcon: 'fas fa-eraser', tooltip: 'Erase all' },
];
export default myCustomBtns;