class Shield {

    constructor() {
        this.prt = async (action,data,subAction) => {

            let formData = new FormData()

            for(let param in data) {
                formData.append(param,data[param])
            }

            if(subAction) {
                formData.append('action',subAction)
            } else {
                formData.append('action',action)
            }

            let result = await fetch(this.configuration.remote + '/' + action,{method:'post',body:formData})
            let resultJSON = await result.json()
            return resultJSON
        }
    }

    //Public method
    load(configuration) {
        this.configuration = configuration
        if(configuration == undefined) {
            throw new Error('Configuration is null')
        }
        if(Array.isArray(configuration.actions)) {
            configuration.actions.forEach(action => {
                if(typeof action == 'string') {
                    this[action] = (data) => this.prt(action,data, undefined)
                } else {
                    this[action.name] = {}
                    action.actions.forEach(subAction => {
                        this[action.name][subAction] = (data) => this.prt(action.name,data,subAction)
                    })
                }
            })
        } else {
            throw new Error("No action")
        }
    }

}

const shield = new Shield()
//export default shield

//Shield.crash(data)