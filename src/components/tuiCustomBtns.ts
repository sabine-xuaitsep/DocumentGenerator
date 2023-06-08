export interface CustomBtns {
    index?: {
        groupIndex: number
        itemIndex: number
    }
    action: string
    bindedPopupEl?: HTMLElement
    faIcon: string[]
    inline?: boolean
    name: string
    state: string
    tooltip: string
}

// to organize items: refer to ToastUiEditor component => toolbarItems
const myCustomBtns: CustomBtns[] = [
    // groupIndex === array to integrate btn
    // !! itemIndex: btn integrated with splice() 
    // => pay attention to declaration order
    {
      index: { groupIndex: 0, itemIndex: 0 },
      action: 'open:fontSize',
      bindedPopupEl: (null as unknown) as HTMLElement,
      faIcon: ['fas', 'text-height'],
      name: 'fontSize',
      state: 'fontSize',
      tooltip: 'Font size'
    },
    {
      index: { groupIndex: 0, itemIndex: 4 },
      action: 'tag:u',
      faIcon: ['fas', 'underline'],
      name: 'underline',
      state: 'underline',
      tooltip: 'Underline'
    },
    {
      index: { groupIndex: 0, itemIndex: 5 },
      action: 'tag:sup',
      faIcon: ['fas', 'superscript'],
      name: 'superscript',
      state: 'superscript',
      tooltip: 'Superscript'
    },
    {
      index: { groupIndex: 0, itemIndex: 6 },
      action: 'tag:mark',
      faIcon: ['fas', 'highlighter'],
      name: 'highlight',
      state: 'highlight',
      tooltip: 'Highlight'
    },
    {
      index: { groupIndex: 1, itemIndex: 1 },
      action: 'custom:divCtr',
      faIcon: ['fas', 'align-center'],
      name: 'alignCenter',
      state: 'alignCenter',
      tooltip: 'Center text'
    },
    {
      index: { groupIndex: 1, itemIndex: 2 },
      action: 'open:indent',
      bindedPopupEl: (null as unknown) as HTMLElement,
      faIcon: ['fas', 'indent'],
      name: 'indent',
      state: 'indent',
      tooltip: 'Indent text'
    },
    {
      index: { groupIndex: 1, itemIndex: 3 },
      action: 'open:bordered',
      bindedPopupEl: (null as unknown) as HTMLElement,
      faIcon: ['far', 'square'],
      name: 'bordered',
      state: 'bordered',
      tooltip: 'Add border'
    },
    {
      index: { groupIndex: 1, itemIndex: 4 },
      action: 'open:htmlTags',
      bindedPopupEl: (null as unknown) as HTMLElement,
      faIcon: ['fas', 'code'],
      name: 'htmlTags',
      state: 'htmlTags',
      tooltip: 'Other'
    },
    // !! <br> create bugs on marks & getHTML()
    {
      index: { groupIndex: 1, itemIndex: 5 },
      action: 'orphTag:br',
      faIcon: ['fas', 'turn-down'],
      name: 'lineBreak',
      state: 'lineBreak',
      tooltip: 'Line break'
    },
    // declare in push order for non-indexed
    // !! each item is separated with divider on render
    {
      // index: { groupIndex: 3, itemIndex: 1 },
      action: 'print',
      faIcon: ['fas', 'print'],
      name: 'print',
      state: 'print',
      tooltip: 'Print'
    },
    // TODO???
    // { action: 'erase', faIcon: 'fas fa-eraser', tooltip: 'Erase all' },
];
export default myCustomBtns;