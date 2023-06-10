import type Editor from 'node_modules/@toast-ui/editor/types';
import type { CustomBtn, CustomPopupBtn } from '@/components/tuiCustomBtns';


function handleBtnAction(
    btn: CustomBtn | CustomPopupBtn , editor: Editor
  ) {
  const btnFn = btn.action.split(':') as string[];
  
  if (btnFn[0] === 'custom') {
    const highlight = editor.getSelectedText();
    const position = editor.getSelection();
    const start = position[0] as number[];
    const end = position[1] as number[];

    // check for critical causing syntax highlighting bugs
    // if selection starts at first char of line
    // && if no text after selection
    editor.setSelection(
      [ end[0], end[1] ],
      [ end[0], end[1] + 2 ]
    );
    const noTextAfterSelection = editor.getSelectedText() === "";
    const criticalCondition = start[1] === 1 && noTextAfterSelection;

    // reset selection to initial position
    editor.setSelection(
      [ start[0], start[1] ],
      [ end[0], end[1] ]
    );

    // apply a subterfuge if criticalCondition
    const startCharPos = criticalCondition
      ? start[1] + 1
      : start[1];

    // insert customBlock
    // [managed in ToastUiEditor component => customHTMLRenderer]
    editor.replaceSelection(
      `\n$$${btnFn[1]}\n${highlight}\n$$\n`,
      [ start[0], startCharPos ],
      [ end[0], end[1] ]
    );

    // apply patch to hide subterfuge
    if (criticalCondition && highlight !== "") {
      editor.deleteSelection(
        [ start[0], start[1] ],
        [ start[0], start[1] + 1 ]
      );
    }
  }
  else if (
      btnFn[0] === 'orphTag'
      || btnFn[0] === 'span'
      || btnFn[0] === 'tag'
    ) {
    const highlight = editor.getSelectedText();
    const mdText = {
      orphTag: `<${btnFn[1]}>`,
      span: `<span class="${btnFn[1]}">${highlight}</span>`,
      tag: `<${btnFn[1]}>${highlight}</${btnFn[1]}>`
    };
    editor.insertText(mdText[btnFn[0]]);
  }
  else {
    return;
  }
}
export default handleBtnAction;