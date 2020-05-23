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

    function time(){

        let timeToday = 0

        const createTimeElement = (val, selector, withClear = false) => {
            const entriesElement = document.getElementById(selector)
            if(withClear){entriesElement.innerHTML = ''}
            const entryElement = document.createElement('div')
            entryElement.textContent = val
            entriesElement.append(entryElement)
        }
        const updateTotals = accumulator => {
            const totals = document.getElementById('totals')
            totals.innerHTML = accumulator
        }

        const addTimeToday = () => {
            return function (event){
                event.preventDefault()
                createTimeElement(event.target[0].value, 'today')
                timeToday += parseInt(event.target[0].value)
                updateTotals(timeToday)
            }
        }

        const addTimeWeek = () => {
            return function(){
                createTimeElement(timeToday, 'week', true)
            }
        }

        return{
            addTimeToday: addTimeToday,
            addTimeWeek: addTimeWeek
        }

    }

    const time = time2()
    
    form.addEventListener('submit', time.addTimeToday())
    weekAdderButton.addEventListener('click', time.addTimeWeek())

})()

