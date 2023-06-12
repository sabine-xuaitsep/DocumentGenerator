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
      { name: 'large', action: 'span:large' },
      { name: 'medium', action: 'span:medium' },
      { name: 'small', action: 'tag:small' }
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
    action: 'custom:center',
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
      { name: 'indent 1', action: 'custom:indent1' },
      { name: 'indent 2', action: 'custom:indent2' },
      { name: 'indent 3', action: 'custom:indent3' },
      { name: 'indent 4', action: 'custom:indent4' },
      { name: 'indent 5', action: 'custom:indent5' },
      { name: 'indent 6', action: 'custom:indent6' }
    ],
  },
  {
    index: { groupIndex: 1, itemIndex: 3 },
    action: 'popup',
    faIcon: ['far', 'square'],
    name: 'bordered',
    tooltip: 'Add box',
    popupBtns: [
      { name: 'box+center', action: 'custom:boxCenter' },
      { name: 'color+center', action: 'custom:colorCenter' },
      { name: 'box+color+center', action: 'custom:boxColorCenter' }
    ],
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
    action: 'popup',
    faIcon: ['fas', 'fill-drip'],
    name: 'docStyle',
    tooltip: 'Doc colors',
    popupBtns: [
      { name: 'Neutral style', action: 'doc-neutral' },
      { name: 'Teal style', action: 'doc-teal' },
      { name: 'Pink style', action: 'doc-pink' },
    ]
  },
  // {
  //   index: { groupIndex: 3, itemIndex: 2 },
  //   action: 'print',
  //   faIcon: ['fas', 'print'],
  //   name: 'print',
  //   tooltip: 'Print'
  // },
  // TODO???
  // { action: 'erase', faIcon: 'fas fa-eraser', tooltip: 'Erase all' },
];


function findAllCustomActions () {
  const customActions: string[] = [];
  myCustomBtns.forEach(btn => {
    if (btn.action.match(/custom:/i)) {
      const customBlock = btn.action.split(':')[1] as string;
      customActions.push(customBlock);
    }
    if (btn.popupBtns) {
      btn.popupBtns.forEach(popupBtn => {
        if (popupBtn.action.match(/custom:/i)) {
          const customBlock = popupBtn.action.split(':')[1] as string;
          customActions.push(customBlock);
        }
      });
    }
  });
  return customActions;
}


export { myCustomBtns, findAllCustomActions };