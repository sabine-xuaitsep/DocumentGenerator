<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Btn from '@/components/Btn.vue';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import store from '@/services/store';

const printBox = ref();
const tuiHtml = ref("");

const aColor = ref('#308FD9');
const bgColor = ref('#37CCBD');
const darkColor = ref('#0E332F');
const markColor = ref('#5EFFEF');
const lightColor = ref('#79d5ca31');


onMounted(() => {
  const tuiValues = store.findTuiValues();
  tuiHtml.value = tuiValues?.html;
})

async function printPDF() {
  // default jsPDF('portrait', 'mm', 'a4');
  const doc = new jsPDF();

  await html2canvas(printBox.value).then(function(canvas) {
    const margin = 10;
    const pageHeight = 297;
    const pageWidth = 210;

    const marginPosBottom = pageHeight - (margin/2);
    const viewHeight = pageHeight - (margin * 2);
    const viewWidth = pageWidth - (margin * 2);
    const imgHeight = (canvas.height * viewWidth) / canvas.width;

    let heightToPrint = imgHeight;
    let position = margin;
    heightToPrint -= viewHeight;
    
    doc.setDrawColor('#ffffff');
    doc.setLineWidth(margin);
    setPrintedImg();

    while (heightToPrint >= 0) {
      position = heightToPrint - imgHeight + margin;
      doc.addPage();
      setPrintedImg();
      heightToPrint -= viewHeight;
    }

    function setPrintedImg() {
      doc.addImage(canvas, 'PNG', margin, position, viewWidth, imgHeight);
      doc.line(0, margin/2, pageWidth, margin/2);
      doc.line(0, marginPosBottom, pageWidth, marginPosBottom);
    }
  });

  // save doc on user computer
  doc.save('doc.pdf');
}
</script>

<template>
  <main class="mainMargin">
    <div class="printPreview">
      <Btn
        class="printBtn"
        btnInfo="printToPDF"
        btnName="Print to PDF"
        @click.prevent="printPDF"
      />
      <div
        ref="printBox"
        v-html="tuiHtml"
      ></div>
    </div>
  </main>
</template>

<style lang="scss">
.printPreview {
  position: relative;
  width: 100%;
  background-color: #fefefe;
  margin: auto;
  padding: 3rem 1rem;

  .printBtn {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }

  .toastui-editor-custom-block-view {
    padding: 1rem 0 !important;
  }

  a:not(:visited) {
    color: v-bind(aColor);
  }

  hr {
    border: 1px solid v-bind(darkColor);
  }

  mark {
    background-color: v-bind(markColor);
  }

  span.large {
    font-size: 1.7rem;
  }
  span.medium {
    font-size: 1.3rem;
  }

  u {
    text-decoration: none;
    border-bottom: 1px solid;
  }

  div.center {
    text-align: center;
  }

  div.indent1,
  div.indent2,
  div.indent3,
  div.indent4,
  div.indent5,
  div.indent6 {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
  }
  div.indent1 > div {
    grid-column: 2 / 13;
  }
  div.indent2 > div {
    grid-column: 3 / 13;
  }
  div.indent3 > div {
    grid-column: 4 / 13;
  }
  div.indent4 > div {
    grid-column: 5 / 13;
  }
  div.indent5 > div {
    grid-column: 6 / 13;
  }
  div.indent6 > div {
    grid-column: 7 / 13;
  }

  div.boxCenter {
    border: 1px solid v-bind(darkColor);
    padding: 1rem;
    text-align: center;
  }
  div.colorCenter {
    background-color: v-bind(bgColor);
    padding: 1rem;
    text-align: center;
  }
  div.boxColorCenter {
    background-color: v-bind(bgColor);
    border: 2px solid v-bind(darkColor);
    padding: 1rem;
    text-align: center;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    line-height: 1.7rem;
  }
  thead {
    background-color: v-bind(bgColor);
    font-size: 1.1rem;
    line-height: 2.3rem;
  }
  tbody tr:first-child td {
    padding-top: 1rem;
  }
  tbody td, 
  thead th {
    padding: .3em 1em .3em 1em;
  }
  tbody tr:nth-child(even) {
    background-color: v-bind(lightColor);
  }
}

@media screen and (min-width: 992px) {
  .printPreview {
    width: 53.3%;
    padding: 3rem;

    .printBtn {
      right: 3rem;
    }
  }
}
</style>
