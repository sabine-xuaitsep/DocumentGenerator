const store = {
  setTuiMdValue(data: string ) {
    if (!localStorage.tuiValues) {
      localStorage.tuiValues = JSON.stringify({ md: data });
    }
  },
  findTuiValues() {
    if (localStorage.tuiValues) {
      return { 
        md: JSON.parse(localStorage.tuiValues).md,
        html: JSON.parse(localStorage.tuiValues).html
      };
    }
  },
  updateTuiValues(data: { md?: string, html?: string }) {
    if (localStorage.tuiValues) {
      const tuiValues = JSON.parse(localStorage.tuiValues);
      if (data.md) {
        tuiValues.md = data.md;
      }
      if (data.html) {
        tuiValues.html = data.html;
      }
      localStorage.tuiValues = JSON.stringify(tuiValues);
    }
  }
}

export default store;