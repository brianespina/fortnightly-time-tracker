(function(){

    const form = document.querySelector('form')
    const input = document.querySelector('#timetoday')
    // const weekAdderButton = document.getElementById('addThisWeek')
    
    const rate = {
        initialRate:  32,
           
        calculateRate: time => {
            return this.initialRate * time
        }
    }

    function handleTime(){

        let timeToday = 0

        const createTimeElement = (val, selector, withClear = false, description = false, time = false) => {
            const entriesElement = document.getElementById(selector)
            if(withClear){entriesElement.innerHTML = ''}
            const entryElement = document.createElement('div')
            entryElement.textContent = val

            if(description){
                const descriptionElement = document.createElement('span')
                descriptionElement.textContent = description
                entryElement.appendChild(descriptionElement)
            }
            if(time){
                const timeElement = document.createElement('small')
                timeElement.textContent = time
                entryElement.appendChild(timeElement)
            }
            entriesElement.append(entryElement)
        }
        // const updateIncome = totals =>{
        //     const rateInput = document.querySelector('#rateInput')
        //     const income = (totals * rateInput.value) * 32
        //     createTimeElement(income, 'rate', true)
        // }
        const updateTotals = accumulator => {
            const totals = document.getElementById('totals')
            totals.innerHTML = accumulator
            // updateIncome(accumulator)
        }
        const dateCreated = () => {
            let dt = new Date();
            let hours = dt.getHours()
            let AmOrPm = hours >= 12 ? 'pm' : 'am'
            hours = (hours % 12) || 12
            let minutes = dt.getMinutes() 
            return (hours + ":" + minutes + " " + AmOrPm)
        }

        const addTimeToday = () => {
            return function (event){
                event.preventDefault()
                const description = document.getElementById('description')
                const descriptVal = description.value
                const time = event.target[0].value
                if(!descriptVal || !time) return
                createTimeElement(time, 'today', false, descriptVal, dateCreated())
                timeToday += validateInput(time)
                updateTotals(timeToday)
                description.value = ''
                input.value = ''
            }
        }
        function validateInput(val){
            const splitVal = val.split(' ')
            const array = splitVal.reduce((accumulator, current) => {
                if(current.includes('h')){
                    let hours = current.split('h').join('')
                    accumulator.push(parseInt(hours))
                }else{
                    let minutes = current.split('m').join('')
                    accumulator.push(parseInt(minutes) / 60)
                }
                return accumulator
            }, [])
            const output = array.reduce((accu, curr) => accu + curr, 0)
            return output
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

    const time = handleTime()
    
    form.addEventListener('submit', time.addTimeToday())
    // weekAdderButton.addEventListener('click', time.addTimeWeek())

})()

