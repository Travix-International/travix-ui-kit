# Basic calendar with attributes set:

    <div>
      <Calendar
        initialDates={["2017-05-05"]}
        isDaySelectableFn={dt => ((dt.getDay() > 0) && (dt.getDay() < 6))}
        locale={{
          months: [
            { name: 'Janeiro', short: 'Jan' },
            { name: 'Fevereiro', short: 'Fev' },
            { name: 'Março', short: 'Mar' },
            { name: 'Abril', short: 'Abr' },
            { name: 'Maio', short: 'Mai' },
            { name: 'Junho', short: 'Jun' },
            { name: 'Julho', short: 'Jul' },
            { name: 'Agosto', short: 'Ago' },
            { name: 'Setembro', short: 'Set' },
            { name: 'Outubro', short: 'Out' },
            { name: 'Novembro', short: 'Nov' },
            { name: 'Dezembro', short: 'Dez' },
          ],
          weekDays: [
            { name: 'Domingo', short: 'Dom' },
            { name: 'Segunda', short: 'Seg' },
            { name: 'Terça', short: 'Ter' },
            { name: 'Quarta', short: 'Qua' },
            { name: 'Quinta', short: 'Qui' },
            { name: 'Sexta', short: 'Sex' },
            { name: 'Sábado', short: 'Sáb' },
          ],
        }}
        minDate="2017-04-01"
        maxDate="2017-06-01"
        navButtons={{
          days: {
            next: {
              displayValue: '›'
            },
            previous: {
              displayValue: '‹'
            },
          }
        }}
        onSelectDay={dt => (document.getElementById('output_1').innerText = dt[0].toDateString())}
      />
      <output id="output_1"></output>
    </div>


---

# Range calendar with attributes set:

    <div>
      <Calendar
        initialDates={["2017-05-05", "2017-05-15"]}
        isDaySelectableFn={dt => ((dt.getDay() > 0) && (dt.getDay() < 6))}
        minDate="2017-04-01"
        maxDate="2017-06-01"
        navButtons={{
          days: {
            next: {
              displayValue: '›'
            },
            previous: {
              displayValue: '‹'
            },
          }
        }}
        onSelectDay={dt => {
          document.getElementById('output_2').innerText = dt
            .filter(item => !!item)
            .map(item => item.toDateString())
            .join('-');
        }}
        selectionType="range"
      />
      <output id="output_2"></output>
    </div>
---
