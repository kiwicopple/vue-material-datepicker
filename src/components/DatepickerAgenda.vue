<style lang="scss">
  @import '../assets/scss/variables';
  @import '../assets/scss/transitions';

  .datepicker {
    position: absolute;
    width: 315px;
    top: 100%;
    background-color: #ffffff;
    -webkit-box-shadow: 5px 22px 95px -14px rgba(0, 0, 0, 1);
    -moz-box-shadow: 5px 22px 95px -14px rgba(0, 0, 0, 1);
    box-shadow: 5px 22px 95px -14px rgba(0, 0, 0, 1);
    &
    .double {
      width: 630px;
      &
      .landscape {
        width: 840px;
      }
    }

    &
    .landscape {
      width: 520px;
    }
  }

  .datepicker-header {
    background-color: $primary-color;
    color: #ffffff;
    padding: 20px;
    &
    .landscape {
      height: 337px;
      width: 165px;
      float: left;
    }
  }

  .datepicker-body {
    .landscape {
      float: left;
    }
  }

  .datepicker-year {
    margin-bottom: 10px;
    line-height: 16px;
    position: relative;
    height: 16px;
    opacity: 0.7;
    overflow: hidden;
    cursor: pointer;
  }

  .datepicker-date {
    position: relative;
    font-size: 32px;
    line-height: 32px;
    height: 34px;
    overflow: hidden;
    &
    .landscape {
      line-height: 40px;
      height: 80px;
    }
  }

  .datepicker-week {
    font-size: 12px;
    line-height: 12px;
    color: rgba(0, 0, 0, 0.8);
    padding: 0 14px;
  }

  .datepicker-weekday {
    float: left;
    width: $day-size;
    text-align: center;
  }

  .datepicker-days {
    width: 287px;
    margin: 14px;
    margin-bottom: 0;
    height: $day-size *6;
    position: relative;
    overflow: hidden;
    float: left;
    transition: height 300ms cubic-bezier(0.75, 0.02, 0.27, 0.99);
  }

  .datepicker-day {
    width: $day-size;
    height: $day-size;
    text-align: center;
    float: left;
    line-height: $day-size;
    cursor: pointer;
    position: relative;
    transition: color 450ms ease;
    &
    [disabled] {
      cursor: default;
      color: darken(#ffffff, 20%);
      .datepicker-day-effect {
        background-color: transparent;
      }
      .datepicker-day-text {
        color: darken(#ffffff, 20%);
      }
    }

    &
    :hover {
      color: #ffffff;
      .datepicker-day-effect {
        transform: scale(1);
        opacity: 0.6;
      }
    }

    &
    .selected {
      color: #ffffff;
      .datepicker-day-effect {
        transform: scale(1);
        opacity: 1;
      }
    }
  }

  .datepicker-day-effect {
    position: absolute;
    width: $day-size -4px;
    height: $day-size -4px;
    border-radius: 50%;
    background-color: lighten($primary-color, 5%);
    top: 2px;
    left: 2px;
    transform: scale(0);
    opacity: 0;
    transition: all 450ms ease;
  }

  .datepicker-day-text {
    position: relative;
  }

  .datepicker-controls {
    position: relative;
    z-index: 2;
    width: 315px;
    height: 56px;
    line-height: 56px;
    text-align: center;
    span {
      position: relative;
      background-color: transparent;
      border: none;
      user-select: none;
      outline: none;
      cursor: pointer
    }
    &
    .double {
      width: 630px;
    }
    &
    .landscape {
      float: left;
    }
  }

  .datepicker-next {
    width: 56px;
    height: 56px;
    line-height: 56px;
    float: right;
  }

  .datepicker-prev {
    width: 56px;
    height: 56px;
    line-height: 56px;
    float: left;

  }

  .datepicker-arrow {
    width: 11px;
    height: 11px;
  }

  .datepicker-month {
    width: 315px;
    position: relative;
    padding-top: 56px;
    margin-top: -56px;
    float: left;
    overflow: hidden;
  }

  .datepicker-month-label {
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    width: 150px;
    margin-left: auto;
    margin-right: auto;
    line-height: 16px;
    height: 16px;
    text-align: center;
  }

  .datepicker-actions {
    text-align: right;
    padding: 8px;
    span {
      border: none;
      background-color: transparent;
      display: inline-block;
      cursor: pointer;
      outline: none;
      color: lighten($primary-color, 10%);
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
      min-width: 88px;
      text-align: center;
      -webkit-appearance: none;
      line-height: 36px;
      transition: all 0.3s ease;
      &
      :hover {
        background-color: darken(#ffffff, 5%);
      }
    }
  }

  .datepicker-years {
    width: 315px;
    height: $day-size *6 +56 +16;
    background-color: #ffffff;
    position: absolute;
    z-index: 2;
    margin-top: -56px;

    overflow: scroll;
    .datepicker-years-content {
      .datepicker-year {
        width: 100%;
        text-align: center;
        font-size: 25px;
        line-height: 25px;
        height: 25px;
        margin: 15px 0;

        transition: all 0.3s ease;
        &
        .selected,
        &
        :hover {
          font-size: 30px;
          height: 30px;
          font-weight: 300;
          color: $primary-color;
        }
      }
    }

    &
    .double {
      width: 630px;
    }
    &
    .landscape {
      margin-top: 0;
      margin-left: 205px;
    }
  }

</style>

<template>
  <transition name="datepicker-slide">
    <div class="datepicker"
         :class="[isDoubled, classOrientation]"
         @click.stop
         v-if="show">

      <div class="datepicker-header"
           v-if="header"
           :class="[classOrientation]">
        <div class="datepicker-year" @click="showOrHideYears">
          <transition-group name="slideh">
                        <span v-for="(year, index) in [year]"
                              :class="dayDirection"
                              :key="index">
                            {{ year }}
                        </span>
          </transition-group>
        </div>
        <div class="datepicker-date"
             :class="[classOrientation]">
          <transition-group name="slideh">
                        <span v-for="(dateFormatted, index) in [dateFormatted]"
                              :class="[dayDirection]"
                              :key="index">
                            {{ dateFormatted }}
                        </span>
          </transition-group>
        </div>
      </div>

      <div class="datepicker-body"
           :class="[classOrientation]">
        <div class="datepicker-controls"
             :class="[isDoubled, classOrientation]">
                    <span class="datepicker-next" @click="nextMonth">
                        <svg class="datepicker-arrow" xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                             viewBox="0.5 900.5 30 30" enable-background="new 0.5 900.5 30 30"><path
                          d="M8.779 928.31c-.473.567-.396 1.406.171 1.88.566.474 1.409.396 1.881-.17l11.391-13.664c.208-.247.31-.551.31-.855 0-.304-.103-.607-.31-.855l-11.391-13.666c-.472-.566-1.315-.644-1.881-.17-.565.473-.643 1.313-.171 1.881l10.679 12.809-10.679 12.81z"/></svg>                </span>
          <span class="datepicker-prev" @click="prevMonth">
                        <svg class="datepicker-arrow" xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                             viewBox="0.5 900.5 30 30" enable-background="new 0.5 900.5 30 30"><path
                          d="M22.221 928.31l-10.679-12.81 10.679-12.809c.472-.567.395-1.408-.171-1.881-.565-.474-1.409-.396-1.881.17l-11.39 13.665c-.208.248-.31.552-.31.855 0 .305.103.608.31.855l11.391 13.664c.472.566 1.315.644 1.881.17.566-.473.643-1.312.17-1.879z"/></svg>
                    </span>
        </div>

        <div class="datepicker-month" v-for="month in months">
          <transition-group name="slidev">
            <div class="datepicker-month-label"
                 v-for="(month, index) in [month]"
                 :class="classDirection"
                 :key="index">
              {{ month.getFormatted() }}
            </div>
          </transition-group>

          <div class="datepicker-week">
            <div class="datepicker-weekday"
                 v-for="(day, index) in weekDays"
                 :key="index"
                 track-by="$index">
              {{ day }}
            </div>
          </div>

          <div class="datepicker-days">
            <transition-group name="slidev">
              <div v-for="(month, index) in [month]"
                   :class="classDirection"
                   :key="index">
                <div class="datepicker-day"
                     :style="{ width: startWidth(month) }">
                </div>

                <div class="datepicker-day"
                     :class="{ selected: isSelected(day) }"
                     v-for="day in month.getDays()"
                     @click="selectDate(day)"
                     :disabled="isDisabled(day)">
                  <span class="datepicker-day-effect"></span>
                  <span class="datepicker-day-text">{{ day.format('D') }}</span>
                </div>
              </div>
            </transition-group>
          </div>
        </div>

        <div class="datepicker-years"
             :class="[isDoubled, classOrientation]"
             v-show="yearsVisible"
             transition="fade">
          <div class="datepicker-years-content">
            <div class="datepicker-year"
                 v-for="year in years"
                 :class="classYear(year)"
                 @click="selectYear(year)">
              {{ year.year() }}
            </div>
          </div>
        </div>

        <div class="datepicker-actions">
          <span @click="cancel()">{{ language[1] }}</span>
          <span @click="submitDay()">{{ language[0] }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import moment from 'moment';

  import month from '../modules/month.js';
  // import * as monthClasses from '../modules/month.js';

  export default {
    name: 'DatePickerAgenda',
    props: {
      initialDate: {
        type: Object,
        default() {
          return moment();
        }
      },
      cellWidth: { type: [Number, String], default: 41 },
      header: { type: Boolean, default: true },
      disablePassedDays: { type: Boolean, default: false },
      disabledDays: {
        type: Array, default() {
          return []
        }
      },
      availablePeriods: {
        type: Array, default() {
          return []
        }
      },
      doubled: { type: Boolean, default: false },
      lang: { type: String, default: 'en' },
      orientation: { type: String, default: 'portrait' },
      show: { type: Boolean, required: true },
      firstMonth: { type: Number }
    },
    data() {
      return {
        date: '',
        weekDays: this.getWeekDays(this.lang),
        months: [],
        classDirection: 'off',
        dayDirection: 'off',
        yearsVisible: false,
        years: null
      };
    },
    computed: {
      year() {
        return this.date.format('YYYY');
      },
      dateFormatted() {
        if (this.orientation === 'landscape') {
          if (this.lang === 'en' || this.lang === 'en-us')
            return this.date.format('dddd') + ',<br>' + this.date.format('MMM DD');
          return this.date.format('ddd DD') + ',<br>' + this.date.format('MMMM')
        }
        if (this.doubled) {
          if (this.lang === 'en' || this.lang === 'en-us')
            return this.date.format('dddd') + ', ' + this.date.format('MMMM DD');
          return this.date.format('dddd DD MMMM');
        }

        if (this.lang === 'en' || this.lang === 'en-us')
          return this.date.format('dddd') + ', ' + this.date.format('MMM DD');
        return this.date.format('dddd DD MMM');
      },
      classOrientation() {
        return this.orientation;
      },
      isDoubled() {
        if (this.doubled) return 'double';
        return '';
      },
      language() {
        let tmp = ['ok', 'cancel'];

        if (this.lang == 'da') tmp[1] = 'afbestille';   //Danish
        if (this.lang == 'nl') tmp[1] = 'annuleren';    //Dutch
        if (this.lang == 'de') tmp[1] = 'abbrechen';    //German
        if (this.lang == 'es' || this.lang == 'es-do') tmp[1] = 'cancelar'; //Spanish and spanish (Dominican Republic)
        if (this.lang == 'fi') tmp[1] = 'peruuttaa';    //Finish
        if (this.lang == 'fr' || this.lang == 'fr-ca' || this.lang == 'fr-ch') tmp[1] = 'annuler'; //French(France-Canada-Switzerland)
        if (this.lang == 'hu') tmp[1] = 'megszünteti';  //Hugarian
        if (this.lang == 'it') tmp[1] = 'annullare';    //Italian
        if (this.lang == 'lb') tmp[1] = 'annuléieren';  //Luxembourgish
        if (this.lang == 'nb') tmp[1] = 'avbryte';      //Norwegian
        if (this.lang == 'pl') tmp[1] = 'anulować';     //Polish
        if (this.lang == 'pt' || this.lang == 'pt-br') tmp[1] = 'cancelar'; //Portuguese and Portuguese(Brazil)
        if (this.lang == 'ro') tmp[1] = 'anula'; //Romaninan
        if (this.lang == 'ru') tmp[1] = 'отменить'; //Romaninan
        if (this.lang == 'sk') tmp[1] = 'zrušiť'; //Slovak
        if (this.lang == 'sl') tmp[1] = 'preklic'; //Slovenian
        if (this.lang == 'sv') tmp[1] = 'avboka'; //Swedish
        if (this.lang == 'uk') tmp[1] = 'відмінити'; //Ukrainian

        return tmp;
      }
    },
    watch: {
      show(val, oldval) {
        if (val === false) {
          this.classDirection = 'off';
          this.dayDirection = 'off';
        } else {
          let newDate = moment([this.date.year(), this.date.month(), this.date.date()]);
          this.date = newDate.clone();
        }
      },
      yearsVisible(val, oldval) {
        let scrollOffset = (this.date.year() - this.years[0].year()) * 40 - 130;
        this.scrollToTop('.datepicker-years', scrollOffset)
      },
      firstMonth (val, old) {
        if (val) {
          this.setMonths(val)
        }
      }
    },
    scrollToTop(selector, scrollOffset = 0) {
      let element = document.querySelectorAll(selector)[0]
      if (element) {
        element.scrollTop = scrollOffset
      }
    },
    created() {
      this.date = this.initialDate.clone();
    },
    mounted() {
      this.$nextTick(() => {
        this.setMonths();
        this.years = this.months[0].getYears();
      });
    },
    methods: {
      startWidth(month) {
        return month.getWeekStart() * parseInt(this.cellWidth) + 'px'
      },
      getWeekDays(lang) {
        let days = [];
        moment.locale(lang);
        for (let i = 0; i < 7; i++) days.push(moment().weekday(i).format('dd'));
        return days;
      },
      classYear(year) {
        if (year.year() == this.date.year()) return 'selected';
        else return '';
      },
      parseAndNormalize(time, format) {
        return this.normalize(moment(time, format))
      },
      normalize(m) {
        return m.startOf('day')
      },
      isInRange(day, range){
        let from = this.parseAndNormalize(range.from),
          to = this.parseAndNormalize(range.to);
        return day.isSameOrAfter(from, 'days') && day.isSameOrBefore(to)
      },
      isDisabled(day) {
        let i = 0;
        let isDisabled = false;

        this.normalize(day)
        if (this.disabledDays.length)
          for(i = 0; i < this.disabledDays.length; i++)
            if (this.parseAndNormalize(this.disabledDays[i]).isSame(day)) return true

        if (this.disablePassedDays) {
          isDisabled = day.isBefore(moment().startOf('day')); // check if day has passed
          if (isDisabled) return true
        }

        if (this.availablePeriods.length) {
          isDisabled = !this.availablePeriods.some(p => this.isInRange(day, p))
        }

        return isDisabled
      },
      isSelected(day) {
        return this.date.unix() === day.unix();
      },
      selectDate(newDate) {
        if (!this.isDisabled(newDate)) {
          this.classDirection = 'off';
          this.setClassDirection(newDate);
          this.date = newDate.clone();
        }
      },
      selectYear(date) {
        this.setClassDirection(date);

        let newDate = moment([date.year(), this.date.month(), this.date.date()]);
        this.date = newDate.clone();

        this.setMonths();

        let scrollOffset = (this.date.year() - this.years[0].year()) * 40 - 130;

        this.scrollTo(document.querySelectorAll('.datepicker-years')[0], scrollOffset, 200,
          () => this.showOrHideYears()
        )
        this.$emit('change', this.date);
      },
      scrollTo(element, to, duration = 200, cb) {
        if (!element || duration <= 0) return;
        var difference = to - element.scrollTop;
        var perTick = difference / duration * 10;

        setTimeout(function () {
          element.scrollTop = element.scrollTop + perTick;
          if (element.scrollTop == to) {
            cb && cb()
            return;
          }
          this.scrollTo(element, to, duration - 10, cb);
        }, 10);
      },
      setClassDirection(date) {
        this.dayDirection = 'direction-next';
        if (date.isBefore(this.date)) this.dayDirection = 'direction-prev';
      },
      setMonths(startMonth) {
        let newMonths = [];
        let firstMonth = new month(startMonth || this.date.month(), this.date.year());
        newMonths.push(firstMonth);

        if (this.doubled) {
          let mon = this.date.month() + 1;
          let year = this.date.year();

          if (mon > 11) {
            mon = 0;
            year += 1;
          }

          let secondMonth = new month(mon, year);
          newMonths.push(secondMonth);
        }

        this.months = newMonths;
      },
      nextMonth() {
        let tmpMonths = [];
        let monthsLength = this.months.length - 1;

        for(var i = 0; i < monthsLength; i++) {
          tmpMonths.push(new month(this.months[i + 1].month, this.months[i + 1].year));
        }

        let mon = this.months[monthsLength].month + 1;
        let year = this.months[monthsLength].year;

        if (mon > 11) {
          mon = 0;
          year += 1;
        }

        let tmpMonth = new month(mon, year);
        tmpMonths.push(tmpMonth);

        this.classDirection = 'direction-next';
        this.months = tmpMonths;
      },
      prevMonth() {
        let tmpMonths = [];
        let monthsLength = this.months.length - 1;

        for(var i = monthsLength; i > 0; i--) {
          tmpMonths.push(new month(this.months[i - 1].month, this.months[i - 1].year));
        }

        let mon = this.months[0].month - 1;
        let year = this.months[0].year;

        if (mon < 0) {
          mon = 11;
          year -= 1;
        }

        let tmpMonth = new month(mon, year);
        tmpMonths.unshift(tmpMonth);

        this.classDirection = 'direction-prev';
        this.months = tmpMonths;
      },
      submitDay() {
        this.classDirection = 'off';
        this.dayDirection = 'off';
        this.yearsVisible = false;
        this.$emit('change', this.date);
        this.$emit('hide');
      },
      cancel() {
        this.classDirection = 'off';
        this.dayDirection = 'off';
        this.$emit('cancel');
      },
      showOrHideYears() {
        this.yearsVisible = !this.yearsVisible;
      }
    }
  };
</script>
