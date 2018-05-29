var moment = require('moment');
var momentRange = require('moment-range');

export default function Month (month, year) {
  this.start = moment([year, month]);
  this.end = this.start.clone().endOf('month');
  this.month = month;
  this.year = year;
}

  Month.prototype.getWeekStart = function () {
    return this.start.weekday();
  }

  Month.prototype.getDays = function () {
    return moment.range(this.start, this.end).toArray('days');
  }

  Month.prototype.getFormatted = function () {
    return this.start.format('MMMM YYYY');
  }

  Month.prototype.getWeeks = function () {
    return this.end.week() - this.start.week() + 1;
  }

  Month.prototype.getYears = function () {
    // var start = moment([this.start.year() - 50, 0]);
    // var end = moment([this.start.year() + 50, 0]);

    return moment.range(moment([this.start.year() - 50, 0]), end = moment([this.start.year() + 50, 0])).toArray('years');
  }

export function getWeekDays (lang) {
  this.days = [];

  moment.locale(lang);

  for (var i = 0; i < 7; i++) {
    this.days.push(moment().weekday(i).format('dd'));
  }

  return this.days;
}
