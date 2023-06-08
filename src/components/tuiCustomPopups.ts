export interface CustomPopups {
  bordered: CustomPopupBtn[],
  indent: CustomPopupBtn[],
  fontSize: CustomPopupBtn[],
  htmlTags: CustomPopupBtn[]
}

export interface CustomPopupBtn {
  action: string
  name: string
}

// to organize items: refer to ToastUiEditor component => toolbarItems
const myCustomPopupBtns: CustomPopups = {
  bordered: [
    { name: 'box', action: 'custom:divBox' },
    { name: 'box+center', action: 'custom:divBoxCtr' },
    { name: 'color+center', action: 'custom:divClrCtr' },
    { name: 'box+color+center', action: 'custom:divBoxClrCtr' }
  ],
  indent: [
    { name: 'indent 1', action: 'custom:divIndent1' },
    { name: 'indent 2', action: 'custom:divIndent2' },
    { name: 'indent 3', action: 'custom:divIndent3' },
    { name: 'indent 4', action: 'custom:divIndent4' },
    { name: 'indent 5', action: 'custom:divIndent5' },
    { name: 'indent 6', action: 'custom:divIndent6' }
  ],
  fontSize: [
    { name: 'large', action: 'custom:spanfntSz3' },
    { name: 'medium', action: 'custom:spanfntSz2' },
    { name: 'small', action: 'custom:spanfntSz1' },
    { name: 'tiny', action: 'tag:small' }
  ],
  htmlTags: [
    { name: '<div class="header">', action: 'custom:divHeader' },
    { name: '<div class="table1">', action: 'custom:divTable1' },
    { name: '<div class="table2">', action: 'custom:divTable2' },
  ]
};
export default myCustomPopupBtns;