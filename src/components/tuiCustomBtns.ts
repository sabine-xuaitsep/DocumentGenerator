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
    tooltip: string
}

// to organize items: refer to component ToastUiEditor => toolbarItems
const myCustomBtns: CustomBtns[] = [
    // groupIndex === array to integrate btn
    // !! itemIndex: btn integrated with splice() => pay attention to declaration order
    {
      index: { groupIndex: 0, itemIndex: 0 },
      action: 'open:fontSize',
      bindedPopupEl: (null as unknown) as HTMLElement,
      faIcon: ['fas', 'text-height'],
      name: 'fontSize',
      tooltip: 'Font size'
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
      // OR action: 'md:^'
      faIcon: ['fas', 'superscript'],
      name: 'superscript',
      tooltip: 'Superscript'
    },
    {
      index: { groupIndex: 0, itemIndex: 6 },
      action: 'tag:mark',
      // OR action: 'md:=='
      faIcon: ['fas', 'highlighter'],
      name: 'highlight',
      tooltip: 'Highlight'
    },
    {
      index: { groupIndex: 1, itemIndex: 1 },
      action: 'class:ctr',
      faIcon: ['fas', 'align-center'],
      inline: false,
      name: 'alignCenter',
      tooltip: 'Center text'
    },
    {
      index: { groupIndex: 1, itemIndex: 2 },
      action: 'open:indent',
      bindedPopupEl: (null as unknown) as HTMLElement,
      faIcon: ['fas', 'indent'],
      name: 'indentText',
      tooltip: 'Indent text'
    },
    {
      index: { groupIndex: 1, itemIndex: 3 },
      action: 'open:bordered',
      bindedPopupEl: (null as unknown) as HTMLElement,
      faIcon: ['far', 'square'],
      name: 'addBorder',
      tooltip: 'Add border'
    },
    {
      index: { groupIndex: 1, itemIndex: 4 },
      action: 'open:htmlTags',
      bindedPopupEl: (null as unknown) as HTMLElement,
      faIcon: ['fas', 'code'],
      name: 'other',
      tooltip: 'Other'
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
    // { action: 'mdSpecial:[^${footnote}]', faIcon: '???', tooltip: 'Footnote' },
    // { action: 'erase', faIcon: 'fas fa-eraser', tooltip: 'Erase all' },
    
    // NOT implemented yet || related to old project
    // {
    //   id: (null as unknown) as number,
    //   action: 'json',
    //   faIcon: ['far', 'file-code'],
    //   index: { groupIndex: 3, itemIndex: 0 },
    //   tuiBtn: {
    //     name: 'openJsonFile',
    //     el: (null as unknown) as HTMLElement,
    //     tooltip: 'Open json file'
    //   }
    // },
];
export default myCustomBtns;