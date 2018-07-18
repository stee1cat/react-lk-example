import { MONTH_LABELS } from './constants';

function makePeriod(year, month) {
  return [
    year,
    month.toString().padStart(2, '0'),
    '01',
  ].join('-');
}

function createEmptyYear(year, unit) {
  let months = (new Array(12)).fill(null);

  return months.map((v, idx) => ({
    value: null,
    period: makePeriod(year, idx + 1),
    type: 'history',
    label: MONTH_LABELS[idx],
    unit,
  }));
}

function filterHistoryPeriods(period) {
  return [
    'history',
    'prev',
  ].indexOf(period.type) > -1;
}

export function createRanges(scales) {
  let result = {};

  scales.forEach(({ scaleValues, unit }, scaleIdx) => {
    if (scaleValues) {
      const values = scaleValues.filter(filterHistoryPeriods);

      values.forEach((item) => {
        let [year, month] = item.period.split('-')
          .map(v => parseInt(v, 10));

        if (!result[year]) {
          result[year] = {
            label: year,
            data: (new Array(scales.length)).fill(null)
              .map(() => createEmptyYear(year, unit)),
          };
        }

        result[year].data[scaleIdx][month - 1] = {
          ...item,
          label: MONTH_LABELS[month - 1],
          unit,
        };
      });
    }
  });

  return Object.keys(result)
    .map(year => result[year]);
}
