<style lang="scss">
  .datepicker-container {
    position: relative;
  }
</style>

<template>
  <div class="datepicker-container">
    <input type="text"
           :class="classDesign"
           :value="date_formatted"
           :placeholder="placeholder"
           @click="showDatepicker"
           v-on-clickaway="hideDatePicker">

    <input type="hidden"
           :id="id"
           :name="name"
           :value="date_raw">

    <datepicker-agenda :cell-width="cellWidth"
                       :disable-passed-days="disablePassedDays"
                       :doubled="doubled"
                       :disabled-days="disabledDays"
                       :available-periods="availablePeriods"
                       :first-month="firstMonth"
                       :lang="lang"
                       :orientation="orientation"
                       :show="isVisible"
                       :header="header"
                       @change="selectDate"
                       @hide="hideDatePicker"
                       @cancel="cancelDateSelection">
    </datepicker-agenda>
  </div>
</template>

<script>
  import moment from 'moment';

  import DatepickerAgenda from './components/DatepickerAgenda.vue';

  import { mixin as clickaway } from 'vue-clickaway'

  export default {
    model: {
      prop: 'date_formatted',
      event: 'change'
    },
    mixins: [ clickaway ],
    components: {
      'datepicker-agenda': DatepickerAgenda
    },
    props: {
      placeholder: { type: String, default: 'Select Date'},
      cellWidth: { type: [Number, String] },
      header: { type: Boolean, default: true },
      classDesign: { type: String, default: '' },
      disablePassedDays: { type: Boolean, default: false },
      availablePeriods: {
        type: Array, default() {
          return []
        }
      },
      disabledDays: {
        type: Array, default() {
          return []
        }
      },
      doubled: { type: Boolean, default: false },
      format: { type: String, default: 'MM/DD/YYYY' },
      id: { type: String, default: 'vue-datepicker' },
      lang: { type: String, default: 'en' },
      name: { type: String, default: 'datepicker' },
      orientation: { type: String, default: 'portrait' },
      firstMonth: { type: Number }
    },
    data() {
      return {
        date: '',
        isVisible: false
      };
    },
    computed: {
      date_formatted() {
        if (this.date) return this.date.format(this.format);
        return '';
      },
      date_raw() {
        if (this.date) return this.date.format('YYYY-MM-DD');
        return '';
      }
    },
    mounted() {
      moment.locale(this.lang);
    },
    methods: {
      selectDate(newDate) {
        this.date = newDate;
        this.$emit('change', this.date_raw);
      },
      showDatepicker() {
        let datepickerContainer = document.getElementsByClassName('datepicker-container')[0];
        if (datepickerContainer.classList.contains('datepicker-open')) {
          datepickerContainer.classList.remove('datepicker-open');
        } else {
          datepickerContainer.classList.add('datepicker-open');
        }
        this.isVisible = !this.isVisible;
      },
      hideDatePicker() {
        let datepickerContainer = document.getElementsByClassName('datepicker-container')[0];
        datepickerContainer.classList.remove('datepicker-open');
        this.isVisible = false;
      },
      cancelDateSelection() {
        this.hideDatePicker();
      }
    }
  };
</script>
