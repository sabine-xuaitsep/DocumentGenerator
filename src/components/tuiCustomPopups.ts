export interface CustomPopups {
  name: string
  btns: CustomPopupBtn[]
}

export interface CustomPopupBtn {
  action: string
  name: string
}

// to organize items: refer to ToastUiEditor component => toolbarItems
const myCustomPopupBtns: CustomPopups[] = [
  {
    name: 'bordered',
    btns: [
      { name: 'box', action: 'custom:divBox' },
      { name: 'box+center', action: 'custom:divBoxCtr' },
      { name: 'color+center', action: 'custom:divClrCtr' },
      { name: 'box+color+center', action: 'custom:divBoxClrCtr' }
    ],
  },
  {
    name: 'indent',
    btns: [
      { name: 'indent 1', action: 'custom:divIndent1' },
      { name: 'indent 2', action: 'custom:divIndent2' },
      { name: 'indent 3', action: 'custom:divIndent3' },
      { name: 'indent 4', action: 'custom:divIndent4' },
      { name: 'indent 5', action: 'custom:divIndent5' },
      { name: 'indent 6', action: 'custom:divIndent6' }
    ],
  },
  {
    name: 'fontSize',
    btns: [
      { name: 'large', action: 'custom:spanfntSz3' },
      { name: 'medium', action: 'custom:spanfntSz2' },
      { name: 'small', action: 'custom:spanfntSz1' },
      { name: 'tiny', action: 'tag:small' }
    ],
  },
  {
    name: 'htmlTags',
    btns: [
      { name: '<div class="header">', action: 'custom:divHeader' },
      { name: '<div class="table1">', action: 'custom:divTable1' },
      { name: '<div class="table2">', action: 'custom:divTable2' },
    ]
  },
];
export default myCustomPopupBtns;