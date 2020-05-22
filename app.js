(function(){

    const form = document.querySelector('form')
    const input = document.querySelector('#timetoday')
    const weekAdderButton = document.getElementById('addThisWeek')
    
    const rate = {
        initialRate:  32,
           
        calculateRate: time => {
            return this.initialRate * time
        }
    }
    const time = {
        timeToday: 0,
        
        createTimeElement: (val, selector, withClear = false) => {
            const entriesElement = document.getElementById(selector)
            if(withClear){entriesElement.innerHTML = ''}
            const entryElement = document.createElement('div')
            entryElement.textContent = val
            entriesElement.append(entryElement)
        },

        updateTotals: accumulator => {
            const totals = document.getElementById('totals')
            totals.innerHTML = accumulator
        },

        addTimeToday: () => {
            return function (event){
                event.preventDefault()
                this.createTimeElement(event.target[0].value, 'today')
                this.timeToday += parseInt(event.target[0].value)
                this.updateTotals(this.timeToday)
            }
        },

        addTimeWeek: () => {
            return function(){
                let timeToday = this.timeToday
                this.createTimeElement(timeToday, 'week', true)
            }
        }

    }

    form.addEventListener('submit', time.addTimeToday().bind(time))
    weekAdderButton.addEventListener('click', time.addTimeWeek().bind(time))

})()

