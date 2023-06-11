import type Editor from 'node_modules/@toast-ui/editor/types';
import type { CustomBtn, CustomPopupBtn } from '@/components/tuiCustomBtns';

function isCriticalCondition (
    editor: Editor, endPos: number[], startPos: number[]
  ): boolean {
  // grow selection to 1 char
  editor.setSelection(
    [ endPos[0], endPos[1] ],
    [ endPos[0], endPos[1] + 1 ]
  );
  // store newEndPos
  const newEndPos = editor.getSelection()[1] as number[];

  // reset selection to initial position
  editor.setSelection(
    [ startPos[0], startPos[1] ],
    [ endPos[0], endPos[1] ]
  );

  // if newPosEnd is on following line
  // => meaning no space or char after selection
  if (newEndPos[0] !== endPos[0]) {
    return true;
  }
  return false;
}

function handleBtnAction(
    btn: CustomBtn | CustomPopupBtn , editor: Editor
  ) {
  const btnFn = btn.action.split(':') as string[];
  
  if (btnFn[0] === 'custom') {
    const highlight = editor.getSelectedText();
    const startPos = editor.getSelection()[0] as number[];
    const endPos = editor.getSelection()[1] as number[];
    let criticalCondition = false;

    // check for critical: bug on marked syntax (highlight)
    // only if selection starts & ends on same line
    // && if selection starts at first char of line
    // && if no char or space after selection
    if ((startPos[0] === endPos[0]) && startPos[1] === 1) {
      criticalCondition = isCriticalCondition(editor, endPos, startPos);
    }
    // if critical: apply a subterfuge to prevent bug
    const startCharPos = criticalCondition
      ? startPos[1] - 1 
      : startPos[1];

    // insert customBlock
    // [rendered by ToastUiEditor component => customHTMLRenderer]
    editor.replaceSelection(
      `\n$$${btnFn[1]}\n${highlight}\n$$\n`,
      [ startPos[0], startCharPos ],
      [ endPos[0], endPos[1] ]
    );
  }
  else if (
      btnFn[0] === 'orphTag'
      || btnFn[0] === 'span'
      || btnFn[0] === 'tag'
    ) {
    const highlight = editor.getSelectedText();
    const mdText = {
      orphTag: `<${btnFn[1]}>`,
      // [rendered by ToastUiEditor component => customHTMLRenderer.htmlInline]
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