const store = {
  setTuiMdValue(data: string) {
    if (!localStorage.tuiMdValue) {
      localStorage.tuiMdValue = data;
    }
  },
  findTuiMdValue() {
    return localStorage.tuiMdValue;
  },
  updateTuiMdValue(data: string) {
    localStorage.tuiMdValue = data;
  }
}

export default store;