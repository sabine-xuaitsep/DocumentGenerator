<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Btn from '@/components/Btn.vue';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import store from '@/services/store';

const printBox = ref();
const tuiHtml = ref("");


onMounted(() => {
  tuiHtml.value = store.findTuiValues().html;
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

<style scoped lang="scss">
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
