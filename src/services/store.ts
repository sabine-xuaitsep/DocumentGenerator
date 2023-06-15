const store = {
  setTuiHtmlValue(data: string) {
    if (!localStorage.tuiHtmlValue) {
      localStorage.tuiHtml = JSON.stringify({
        value: data
      });
    }
  },
  setTuiMdValue(data: string) {
    if (!localStorage.tuiMdValue) {
      localStorage.tuiMd = JSON.stringify({
        value: data
      });
    }
  },
  findTuiHtmlValue() {
    if (localStorage.tuiHtml) {
      return JSON.parse(localStorage.tuiHtml).value;
    }
  },
  findTuiMdValue() {
    if (localStorage.tuiMd) {
      return JSON.parse(localStorage.tuiMd).value;
    }
  },
  updateTuiHtmlValue(data: string) {
    localStorage.tuiHtml = JSON.stringify({
      value: data
    });
  },
  updateTuiMdValue(data: string) {
    localStorage.tuiMd = JSON.stringify({
      value: data
    });
  }
}

export default store;